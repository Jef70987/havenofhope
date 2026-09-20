import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing comment id.' })

  const body = await readBody(event)

  const { data: existing } = await supabaseAdmin
    .from('comments')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle()

  if (!existing) throw createError({ statusCode: 404, statusMessage: 'Comment not found.' })

  const update: any = { updated_at: new Date().toISOString() }
  if (typeof body?.is_visible === 'boolean') update.is_visible = body.is_visible
  if (typeof body?.text === 'string') update.text = body.text.trim()

  const { data: comment, error } = await supabaseAdmin
    .from('comments')
    .update(update)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('[comments.update] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not update comment.' })
  }

  await writeAudit({
    userId: user.id,
    action: 'update',
    tableName: 'comments',
    rowId: comment.id,
    description: `Updated comment by ${comment.name}`,
    beforeData: existing,
    afterData: comment,
    event,
  })

  return { ok: true, comment }
})
