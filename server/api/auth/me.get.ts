import { supabaseAdmin } from '../../utils/supabase'
import { writeAudit } from '../../utils/audit'

const ACCESS_TOKEN_HOURS = 8
const REFRESH_TOKEN_DAYS = 30

export default defineEventHandler(async (event) => {
  const sessionToken = getCookie(event, 'auth_token')
  const refreshToken = getCookie(event, 'refresh_token')

  // No tokens at all → not logged in
  if (!sessionToken && !refreshToken) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated.' })
  }

  const now = new Date()

  // ===== 1. Try the access token first =====
  if (sessionToken) {
    const { data: session } = await supabaseAdmin
      .from('admin_sessions')
      .select('id, user_id, expires_at, refresh_expires_at, revoked_at')
      .eq('session_token', sessionToken)
      .maybeSingle()

    if (session && !session.revoked_at && new Date(session.expires_at) > now) {
      // Still valid — fetch user + profile
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(session.user_id)
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('display_name, role, public_email, phone, tagline')
        .eq('id', session.user_id)
        .maybeSingle()

      // Update last-used timestamp
      await supabaseAdmin
        .from('admin_sessions')
        .update({ last_used_at: now.toISOString() })
        .eq('id', session.id)

      return {
        ok: true,
        user: {
          id: session.user_id,
          email: userData?.user?.email || null,
          name: profile?.display_name || userData?.user?.email || null,
          role: profile?.role || 'author',
          publicEmail: profile?.public_email || null,
          phone: profile?.phone || null,
          tagline: profile?.tagline || null,
        },
      }
    }
  }

  // ===== 2. Access expired → try refresh =====
  if (!refreshToken) {
    throw createError({ statusCode: 401, statusMessage: 'Session expired.' })
  }

  const { data: refreshSession } = await supabaseAdmin
    .from('admin_sessions')
    .select('id, user_id, refresh_expires_at, revoked_at')
    .eq('refresh_token', refreshToken)
    .maybeSingle()

  if (
    !refreshSession ||
    refreshSession.revoked_at ||
    new Date(refreshSession.refresh_expires_at) <= now
  ) {
    // Refresh also gone → force re-login
    deleteCookie(event, 'auth_token', { path: '/' })
    deleteCookie(event, 'refresh_token', { path: '/' })
    throw createError({ statusCode: 401, statusMessage: 'Session expired. Please log in again.' })
  }

  // Rotate: revoke old session, issue new tokens
  await supabaseAdmin
    .from('admin_sessions')
    .update({ revoked_at: now.toISOString() })
    .eq('id', refreshSession.id)

  const crypto = await import('node:crypto')
  const newSessionToken = crypto.randomBytes(32).toString('hex')
  const newRefreshToken = crypto.randomBytes(48).toString('hex')
  const accessExpiresAt = new Date(now.getTime() + ACCESS_TOKEN_HOURS * 60 * 60 * 1000)
  const refreshExpiresAt = new Date(now.getTime() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000)

  await supabaseAdmin.from('admin_sessions').insert({
    user_id: refreshSession.user_id,
    session_token: newSessionToken,
    refresh_token: newRefreshToken,
    expires_at: accessExpiresAt.toISOString(),
    refresh_expires_at: refreshExpiresAt.toISOString(),
  })

  const isProd = process.env.NODE_ENV === 'production'
  setCookie(event, 'auth_token', newSessionToken, {
    httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', expires: accessExpiresAt,
  })
  setCookie(event, 'refresh_token', newRefreshToken, {
    httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', expires: refreshExpiresAt,
  })

  // Fetch user + profile for the response
  const { data: userData } = await supabaseAdmin.auth.admin.getUserById(refreshSession.user_id)
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('display_name, role, public_email, phone, tagline')
    .eq('id', refreshSession.user_id)
    .maybeSingle()

  await writeAudit({
    userId: refreshSession.user_id,
    action: 'update',
    tableName: 'admin_sessions',
    description: 'Session rotated via refresh token',
    event,
  })

  return {
    ok: true,
    refreshed: true,
    user: {
      id: refreshSession.user_id,
      email: userData?.user?.email || null,
      name: profile?.display_name || userData?.user?.email || null,
      role: profile?.role || 'author',
      publicEmail: profile?.public_email || null,
      phone: profile?.phone || null,
      tagline: profile?.tagline || null,
    },
  }
})
