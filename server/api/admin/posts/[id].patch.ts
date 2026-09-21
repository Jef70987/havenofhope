import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'
import { clearPublicCache } from '../../../utils/cache'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing post id.' })

  const { data: existing } = await supabaseAdmin
    .from('posts')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle()

  if (!existing) throw createError({ statusCode: 404, statusMessage: 'Post not found.' })

  const update: any = { updated_by: user.id }

  if (typeof body?.status === 'string' && ['published', 'draft', 'hidden'].includes(body.status)) {
    update.status = body.status
    update.published_at = body.status === 'published'
      ? (existing.published_at || new Date().toISOString())
      : null
  }
  if (typeof body?.title === 'string') update.title = body.title.trim()
  if (typeof body?.subtitle === 'string') update.subtitle = body.subtitle.trim() || null
  if (typeof body?.slug === 'string') update.slug = body.slug.trim()
  if (typeof body?.category === 'string') update.category = body.category
  if (typeof body?.categoryPath === 'string') update.category_path = body.categoryPath
  if (typeof body?.image === 'string') update.image = body.image
  if (typeof body?.date === 'string') update.date = body.date
  if (typeof body?.readTime === 'string') update.read_time = body.readTime
  if (Array.isArray(body?.body)) update.body = body.body

  const { data: post, error } = await supabaseAdmin
    .from('posts')
    .update(update)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('[posts.update] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not update post.' })
  }

  await writeAudit({
    userId: user.id,
    action: 'update',
    tableName: 'posts',
    rowId: post.id,
    description: `Updated post: ${post.title}`,
    beforeData: existing,
    afterData: post,
    event,
  })

  await clearPublicCache()

  return { ok: true, post }
})