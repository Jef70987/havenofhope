import { supabaseAdmin } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = typeof query.category === 'string' ? query.category : null

  let q = supabaseAdmin
    .from('posts')
    .select('id, title, slug, subtitle, category, category_path, image, author, date, read_time, body, views, created_at, published_at')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (category) q = q.eq('category', category)

  const { data, error } = await q

  if (error) {
    console.error('[posts.public] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not load posts.' })
  }

  return { ok: true, posts: data || [] }
})