import { supabaseAdmin } from '../../../utils/supabase'

export default defineCachedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Missing slug.' })

  const { data: post } = await supabaseAdmin
    .from('posts')
    .select('id')
    .eq('slug', slug)
    .eq('status', 'published')
    .is('deleted_at', null)
    .maybeSingle()

  if (!post) return { ok: true, comments: [] }

  const { data: comments } = await supabaseAdmin
    .from('comments')
    .select('id, post_id, parent_id, name, text, is_admin, created_at')
    .eq('post_id', post.id)
    .eq('is_visible', true)
    .is('deleted_at', null)
    .order('created_at', { ascending: true })

  const all = comments || []
  const top = all.filter((c) => !c.parent_id)
  const byParent = all.reduce((acc: Record<string, any[]>, c) => {
    if (c.parent_id) (acc[c.parent_id] ||= []).push(c)
    return acc
  }, {})

  const result = top.map((c) => ({ ...c, replies: byParent[c.id] || [] }))

  return { ok: true, comments: result }
}, {
  maxAge: 30,
  swr: true,
  staleMaxAge: 60,
  getKey: (event) => `comments:${getRouterParam(event, 'slug')}`,
})