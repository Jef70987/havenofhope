import { supabaseAdmin, supabasePublic } from '../../utils/supabase'
import { writeAudit } from '../../utils/audit'
import crypto from 'node:crypto'

// ===== CONFIG =====
const IP_WINDOW_MINUTES = 15          // window for IP-based rate limit
const IP_MAX_ATTEMPTS = 5             // max attempts per IP per window
const ACCOUNT_WINDOW_MINUTES = 30     // window for per-account lockout
const ACCOUNT_MAX_ATTEMPTS = 5        // failed attempts before lockout
const ACCESS_TOKEN_HOURS = 8
const REFRESH_TOKEN_DAYS = 30

// Strict email validation
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const usernameRaw = String(body?.username || '').trim().toLowerCase()
  const password = String(body?.password || '')

  const ip =
    event.node?.req?.headers?.['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    event.node?.req?.socket?.remoteAddress ||
    null

  // ===== 1. BASIC VALIDATION =====
  if (!usernameRaw || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Please fill in all fields.' })
  }
  if (usernameRaw.length > 254 || !EMAIL_REGEX.test(usernameRaw)) {
    await writeAudit({
      action: 'login_failed',
      description: `Rejected malformed username attempt (${usernameRaw.slice(0, 60)})`,
      event,
    })
    // Generic message so attackers can't tell format vs wrong-cred
    throw createError({ statusCode: 401, statusMessage: 'Invalid username or password.' })
  }

  const now = new Date()
  const ipSince = new Date(now.getTime() - IP_WINDOW_MINUTES * 60 * 1000).toISOString()
  const acctSince = new Date(now.getTime() - ACCOUNT_WINDOW_MINUTES * 60 * 1000).toISOString()

  // ===== 2. IP RATE LIMIT =====
  if (ip) {
    const { count: ipFails } = await supabaseAdmin
      .from('login_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .eq('success', false)
      .gte('attempted_at', ipSince)

    if ((ipFails || 0) >= IP_MAX_ATTEMPTS) {
      await writeAudit({
        action: 'login_failed',
        description: `IP rate limit hit (${ip})`,
        event,
      })
      throw createError({
        statusCode: 429,
        statusMessage: `Too many attempts from this device. Please try again in ${IP_WINDOW_MINUTES} minutes.`,
      })
    }
  }

  // ===== 3. PER-ACCOUNT LOCKOUT =====
  const { count: accountFails } = await supabaseAdmin
    .from('login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('username', usernameRaw)
    .eq('success', false)
    .gte('attempted_at', acctSince)

  if ((accountFails || 0) >= ACCOUNT_MAX_ATTEMPTS) {
    await writeAudit({
      action: 'login_failed',
      description: `Account lockout for ${usernameRaw}`,
      event,
    })
    throw createError({
      statusCode: 429,
      statusMessage: `Account locked after too many failed attempts. Try again in ${ACCOUNT_WINDOW_MINUTES} minutes.`,
    })
  }

  // ===== 4. ATTEMPT LOGIN =====
  const { data, error } = await supabasePublic.auth.signInWithPassword({
    email: usernameRaw,
    password,
  })

  if (error || !data?.user) {
    // Record the failed attempt
    await supabaseAdmin.from('login_attempts').insert({
      username: usernameRaw,
      ip_address: ip,
      success: false,
    })
    await writeAudit({
      action: 'login_failed',
      description: `Failed login for ${usernameRaw}`,
      event,
    })

    const remaining = Math.max(0, ACCOUNT_MAX_ATTEMPTS - (accountFails || 0) - 1)
    const msg = remaining > 0
      ? `Invalid username or password. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
      : `Account locked for ${ACCOUNT_WINDOW_MINUTES} minutes after too many failed attempts.`

    throw createError({ statusCode: 401, statusMessage: msg })
  }

  const user = data.user

  // ===== 5. VERIFY ROLE =====
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id, role, display_name')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || !['author', 'editor', 'admin'].includes(profile.role)) {
    await supabaseAdmin.from('login_attempts').insert({
      username: usernameRaw,
      ip_address: ip,
      success: false,
    })
    await writeAudit({
      userId: user.id,
      action: 'login_failed',
      description: 'User has no author role',
      event,
    })
    throw createError({ statusCode: 403, statusMessage: 'Account is not authorised.' })
  }

  // ===== 6. ISSUE SESSION =====
  const sessionToken = crypto.randomBytes(32).toString('hex')
  const refreshToken = crypto.randomBytes(48).toString('hex')

  const accessExpiresAt = new Date(now.getTime() + ACCESS_TOKEN_HOURS * 60 * 60 * 1000)
  const refreshExpiresAt = new Date(now.getTime() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000)
  const userAgent = event.node?.req?.headers?.['user-agent']?.toString() || null

  const { error: sessionErr } = await supabaseAdmin.from('admin_sessions').insert({
    user_id: user.id,
    session_token: sessionToken,
    refresh_token: refreshToken,
    ip_address: ip,
    user_agent: userAgent,
    expires_at: accessExpiresAt.toISOString(),
    refresh_expires_at: refreshExpiresAt.toISOString(),
  })

  if (sessionErr) {
    console.error('[login] session insert error:', sessionErr)
    throw createError({ statusCode: 500, statusMessage: 'Could not create session.' })
  }

  // ===== 7. RECORD SUCCESS =====
  await supabaseAdmin.from('login_attempts').insert({
    username: usernameRaw,
    ip_address: ip,
    success: true,
  })

  // ===== 8. SET COOKIES =====
  const isProd = process.env.NODE_ENV === 'production'

  setCookie(event, 'auth_token', sessionToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    expires: accessExpiresAt,
  })

  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    expires: refreshExpiresAt,
  })

  await writeAudit({
    userId: user.id,
    action: 'login',
    tableName: 'admin_sessions',
    description: `Login success for ${usernameRaw}`,
    event,
  })

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: profile.display_name || user.email,
      role: profile.role,
    },
  }
})
