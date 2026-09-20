import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const body = await readBody(event)

  const update: any = {}
  if (typeof body?.displayName === 'string') update.display_name = body.displayName.trim()
  if (typeof body?.username === 'string') update.username = body.username.trim().toLowerCase()
  if (typeof body?.phone === 'string') update.phone = body.phone.trim()
  if (typeof body?.publicEmail === 'string') update.public_email = body.publicEmail.trim()
  if (typeof body?.tagline === 'string') update.tagline = body.tagline.trim()

  const { error } = await supabaseAdmin
    .from('profiles')
    .update(update)
    .eq('id', user.id)

  if (error) throw createError({ statusCode: 500, statusMessage: 'Could not save profile.' })

  await writeAudit({ userId: user.id, action: 'update', tableName: 'profiles', description: 'Profile updated', event })
  return { ok: true }
})
