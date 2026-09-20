import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing id.' })
  const status = String(body?.status || '')
  if (!['new', 'replied', 'closed'].includes(status)) throw createError({ statusCode: 400, statusMessage: 'Invalid status.' })

  const { data: row, error } = await supabaseAdmin
    .from('contact_requests')
    .update({ status, handled_by: user.id })
    .eq('id', id)
    .select()
    .single()

  if (error) throw createError({ statusCode: 500, statusMessage: 'Could not update.' })

  await writeAudit({
    userId: user.id,
    action: 'update',
    tableName: 'contact_requests',
    rowId: id,
    description: `Contact request marked ${status}`,
    afterData: row,
    event,
  })

  return { ok: true, request: row }
})
