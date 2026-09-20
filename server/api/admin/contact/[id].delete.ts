import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing id.' })

  const { error } = await supabaseAdmin
    .from('contact_requests')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw createError({ statusCode: 500, statusMessage: 'Could not delete.' })

  await writeAudit({
    userId: user.id,
    action: 'delete',
    tableName: 'contact_requests',
    rowId: id,
    event,
  })

  return { ok: true }
})
