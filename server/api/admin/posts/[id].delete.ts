import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'
import { clearPublicCache } from '../../../utils/cache'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing post id.' })

  const { data: existing } = await supabaseAdmin
    .from('posts')
    .select('id, title')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle()

  if (!existing) throw createError({ statusCode: 404, statusMessage: 'Post not found.' })

  const { error } = await supabaseAdmin
    .from('posts')
    .update({ deleted_at: new Date().toISOString(), updated_by: user.id })
    .eq('id', id)

  if (error) {
    console.error('[posts.delete] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not delete post.' })
  }

  await writeAudit({
    userId: user.id,
    action: 'delete',
    tableName: 'posts',
    rowId: id,
    description: `Soft-deleted post: ${existing.title}`,
    event,
  })

  await clearPublicCache()

  return { ok: true }
})