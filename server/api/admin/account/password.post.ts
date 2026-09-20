import { supabaseAdmin, supabasePublic } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const body = await readBody(event)

  const current = String(body?.current || '')
  const next = String(body?.next || '')
  const confirm = String(body?.confirm || '')

  if (!current || !next || !confirm) throw createError({ statusCode: 400, statusMessage: 'Fill in all fields.' })
  if (next.length < 8) throw createError({ statusCode: 400, statusMessage: 'Password must be at least 8 characters.' })
  if (next !== confirm) throw createError({ statusCode: 400, statusMessage: 'Passwords do not match.' })
  if (next === current) throw createError({ statusCode: 400, statusMessage: 'New password must differ.' })

  // Verify current password by signing in
  const { error: signErr } = await supabasePublic.auth.signInWithPassword({
    email: user.email || '',
    password: current,
  })
  if (signErr) throw createError({ statusCode: 401, statusMessage: 'Current password is wrong.' })

  const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(user.id, { password: next })
  if (updErr) throw createError({ statusCode: 500, statusMessage: 'Could not update password.' })

  await supabaseAdmin
    .from('profiles')
    .update({ must_change_password: false })
    .eq('id', user.id)

  await writeAudit({ userId: user.id, action: 'password_change', description: 'Password changed', event })
  return { ok: true }
})
