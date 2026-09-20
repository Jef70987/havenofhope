import { supabasePublic, supabaseAdmin } from '../../utils/supabase'
import { writeAudit } from '../../utils/audit'

const EMAIL_WINDOW_MINUTES = 60
const EMAIL_MAX_PER_WINDOW = 3
const IP_WINDOW_MINUTES = 60
const IP_MAX_PER_WINDOW = 5

export default defineEventHandler(async (event) => {
  const ip =
    event.node?.req?.headers?.['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    event.node?.req?.socket?.remoteAddress ||
    null

  const genericResponse = {
    ok: true,
    message: 'If the registered author account exists, a reset link has been sent.',
  }

  // Look up the single author account from profiles
  const { data: author } = await supabaseAdmin
    .from('profiles')
    .select('id, email, role')
    .in('role', ['author', 'editor', 'admin'])
    .not('email', 'is', null)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (!author?.email) {
    await writeAudit({
      action: 'password_reset_request',
      description: 'Reset requested but no author account exists',
      event,
    })
    return genericResponse
  }

  const email = author.email.toLowerCase()
  const now = new Date()
  const emailSince = new Date(now.getTime() - EMAIL_WINDOW_MINUTES * 60 * 1000).toISOString()
  const ipSince = new Date(now.getTime() - IP_WINDOW_MINUTES * 60 * 1000).toISOString()

  // Rate limit — per email
  const { count: emailCount } = await supabaseAdmin
    .from('password_reset_requests')
    .select('*', { count: 'exact', head: true })
    .eq('email', email)
    .gte('requested_at', emailSince)

  if ((emailCount || 0) >= EMAIL_MAX_PER_WINDOW) {
    await writeAudit({
      action: 'password_reset_request',
      description: `Email rate limit hit for ${email}`,
      event,
    })
    return genericResponse
  }

  // Rate limit — per IP
  if (ip) {
    const { count: ipCount } = await supabaseAdmin
      .from('password_reset_requests')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .gte('requested_at', ipSince)

    if ((ipCount || 0) >= IP_MAX_PER_WINDOW) {
      await writeAudit({
        action: 'password_reset_request',
        description: `IP rate limit hit for forgot-password (${ip})`,
        event,
      })
      return genericResponse
    }
  }

  // Log the attempt
  await supabaseAdmin.from('password_reset_requests').insert({
    email,
    ip_address: ip,
  })

  // Send the reset email
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
  const redirectTo = `${siteUrl}/author-panel-9f3a7b/reset`

  const { error } = await supabasePublic.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  await writeAudit({
    userId: author.id,
    action: 'password_reset_request',
    description: `Reset email sent to ${email}${error ? ' (delivery error)' : ''}`,
    event,
  })

  return genericResponse
})