import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const { data: rows } = await supabaseAdmin
    .from('comments')
    .select('id, post_id, parent_id, name, text, is_admin, is_visible, created_at')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  const all = rows || []
  const postIds = Array.from(new Set(all.map((c) => c.post_id)))

  const { data: posts } = postIds.length
    ? await supabaseAdmin.from('posts').select('id, title, slug').in('id', postIds)
    : { data: [] }

  const postMap = Object.fromEntries((posts || []).map((p: any) => [p.id, p]))

  const top = all.filter((c) => !c.parent_id)
  const byParent = all.reduce((acc: Record<string, any[]>, c) => {
    if (c.parent_id) (acc[c.parent_id] ||= []).push(c)
    return acc
  }, {})

  const comments = top.map((c) => ({
    ...c,
    post: postMap[c.post_id] || null,
    replies: byParent[c.id] || [],
  }))

  return { ok: true, comments }
})
