import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('id, title, slug, subtitle, category, category_path, date, status, image, body, views, created_at, updated_at')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[posts.list] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not load posts.' })
  }

  return { ok: true, posts: data || [] }
})
