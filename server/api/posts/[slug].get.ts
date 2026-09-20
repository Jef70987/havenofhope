import { supabaseAdmin } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Missing slug.' })

  const { data: post, error } = await supabaseAdmin
    .from('posts')
    .select('id, title, slug, subtitle, category, category_path, image, author, date, read_time, body, views, created_at, published_at')
    .eq('slug', slug)
    .eq('status', 'published')
    .is('deleted_at', null)
    .maybeSingle()

  if (error || !post) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found.' })
  }

  // Increment view counter (fire and forget — non-blocking)
  supabaseAdmin
    .from('posts')
    .update({ views: (post.views || 0) + 1 })
    .eq('id', post.id)
    .then(() => {})

  return { ok: true, post }
})
