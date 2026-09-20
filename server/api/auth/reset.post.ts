import { supabasePublic, supabaseAdmin } from '../../utils/supabase'
import { writeAudit } from '../../utils/audit'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const accessToken = String(body?.access_token || '').trim()
  const newPassword = String(body?.new_password || '')
  const confirmPassword = String(body?.confirm_password || '')

  if (!accessToken) {
    throw createError({ statusCode: 400, statusMessage: 'Missing reset token.' })
  }
  if (!newPassword || newPassword.length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 8 characters.' })
  }
  if (newPassword !== confirmPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Passwords do not match.' })
  }

  // Verify the token is a valid Supabase session and get the user
  const { data: userData, error: userErr } = await supabasePublic.auth.getUser(accessToken)

  if (userErr || !userData?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Reset link is invalid or expired.' })
  }

  const user = userData.user

  // Update the password with the admin client
  const { error: updateErr } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    password: newPassword,
  })

  if (updateErr) {
    console.error('[reset] password update error:', updateErr)
    throw createError({ statusCode: 500, statusMessage: 'Could not update password.' })
  }

  // Force-change flag cleared
  await supabaseAdmin
    .from('profiles')
    .update({ must_change_password: false })
    .eq('id', user.id)

  // Revoke all existing sessions so nobody stays logged in with the old password
  await supabaseAdmin
    .from('admin_sessions')
    .update({ revoked_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .is('revoked_at', null)

  await writeAudit({
    userId: user.id,
    action: 'password_reset',
    description: 'Password reset successfully',
    event,
  })

  return { ok: true, message: 'Password updated. Please log in.' }
})
