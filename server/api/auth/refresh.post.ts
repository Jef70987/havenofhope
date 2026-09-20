import { supabaseAdmin } from '../../utils/supabase'
import { writeAudit } from '../../utils/audit'
import crypto from 'node:crypto'

const ACCESS_TOKEN_HOURS = 8
const REFRESH_TOKEN_DAYS = 30

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token')

  if (!refreshToken) {
    throw createError({ statusCode: 401, statusMessage: 'No refresh token.' })
  }

  const now = new Date()

  const { data: session } = await supabaseAdmin
    .from('admin_sessions')
    .select('id, user_id, refresh_expires_at, revoked_at')
    .eq('refresh_token', refreshToken)
    .maybeSingle()

  if (
    !session ||
    session.revoked_at ||
    new Date(session.refresh_expires_at) <= now
  ) {
    deleteCookie(event, 'auth_token', { path: '/' })
    deleteCookie(event, 'refresh_token', { path: '/' })
    throw createError({ statusCode: 401, statusMessage: 'Refresh token invalid or expired.' })
  }

  // Revoke the current session
  await supabaseAdmin
    .from('admin_sessions')
    .update({ revoked_at: now.toISOString() })
    .eq('id', session.id)

  // Issue new tokens
  const newSessionToken = crypto.randomBytes(32).toString('hex')
  const newRefreshToken = crypto.randomBytes(48).toString('hex')
  const accessExpiresAt = new Date(now.getTime() + ACCESS_TOKEN_HOURS * 60 * 60 * 1000)
  const refreshExpiresAt = new Date(now.getTime() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000)

  const ip =
    event.node?.req?.headers?.['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    event.node?.req?.socket?.remoteAddress ||
    null
  const userAgent = event.node?.req?.headers?.['user-agent']?.toString() || null

  const { error: insertErr } = await supabaseAdmin.from('admin_sessions').insert({
    user_id: session.user_id,
    session_token: newSessionToken,
    refresh_token: newRefreshToken,
    ip_address: ip,
    user_agent: userAgent,
    expires_at: accessExpiresAt.toISOString(),
    refresh_expires_at: refreshExpiresAt.toISOString(),
  })

  if (insertErr) {
    console.error('[refresh] insert error:', insertErr)
    throw createError({ statusCode: 500, statusMessage: 'Could not refresh session.' })
  }

  const isProd = process.env.NODE_ENV === 'production'
  setCookie(event, 'auth_token', newSessionToken, {
    httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', expires: accessExpiresAt,
  })
  setCookie(event, 'refresh_token', newRefreshToken, {
    httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', expires: refreshExpiresAt,
  })

  await writeAudit({
    userId: session.user_id,
    action: 'update',
    tableName: 'admin_sessions',
    description: 'Session refreshed explicitly',
    event,
  })

  return { ok: true }
})
