import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'
import { clearPublicCache } from '../../../utils/cache'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const body = await readBody(event)

  const parentId = String(body?.parent_id || '')
  const text = String(body?.text || '').trim()

  if (!parentId) throw createError({ statusCode: 400, statusMessage: 'Missing parent comment.' })
  if (!text || text.length > 2000) throw createError({ statusCode: 400, statusMessage: 'Reply is required.' })

  const { data: parent } = await supabaseAdmin
    .from('comments')
    .select('id, post_id')
    .eq('id', parentId)
    .is('deleted_at', null)
    .maybeSingle()

  if (!parent) throw createError({ statusCode: 404, statusMessage: 'Comment not found.' })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .maybeSingle()

  const { data: reply, error } = await supabaseAdmin
    .from('comments')
    .insert({
      post_id: parent.post_id,
      parent_id: parentId,
      name: profile?.display_name || 'Author',
      text,
      is_admin: true,
      is_visible: true,
    })
    .select()
    .single()

  if (error) {
    console.error('[comments.admin.reply] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not post reply.' })
  }

  await writeAudit({
    userId: user.id,
    action: 'create',
    tableName: 'comments',
    rowId: reply.id,
    description: `Admin reply on comment ${parentId}`,
    event,
  })

  await clearPublicCache()

  return { ok: true, reply }
})