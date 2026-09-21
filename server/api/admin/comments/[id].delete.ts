import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'
import { clearPublicCache } from '../../../utils/cache'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing comment id.' })

  const { data: existing } = await supabaseAdmin
    .from('comments')
    .select('id, name')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle()

  if (!existing) throw createError({ statusCode: 404, statusMessage: 'Comment not found.' })

  await supabaseAdmin
    .from('comments')
    .update({ deleted_at: new Date().toISOString() })
    .eq('parent_id', id)
    .is('deleted_at', null)

  const { error } = await supabaseAdmin
    .from('comments')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('[comments.delete] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not delete comment.' })
  }

  await writeAudit({
    userId: user.id,
    action: 'delete',
    tableName: 'comments',
    rowId: id,
    description: `Deleted comment by ${existing.name}`,
    event,
  })

  await clearPublicCache()

  return { ok: true }
})