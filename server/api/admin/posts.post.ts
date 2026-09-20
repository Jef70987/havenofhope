import { supabaseAdmin } from '../../utils/supabase'
import { requireAuth } from '../../utils/requireAuth'
import { writeAudit } from '../../utils/audit'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const body = await readBody(event)

  // ---- validate ----
  const title = String(body?.title || '').trim()
  const slug = String(body?.slug || '').trim()
  const category = String(body?.category || '').trim()
  const categoryPath = String(body?.categoryPath || '').trim()
  const status = ['published', 'draft', 'hidden'].includes(body?.status) ? body.status : 'draft'
  const blocks = Array.isArray(body?.body) ? body.body : []

  if (!title) throw createError({ statusCode: 400, statusMessage: 'Title is required.' })
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Slug is required.' })
  if (!category) throw createError({ statusCode: 400, statusMessage: 'Category is required.' })
  if (!blocks.length) throw createError({ statusCode: 400, statusMessage: 'Add at least one content block.' })

  // Check the slug isn't taken
  const { data: existing } = await supabaseAdmin
    .from('posts')
    .select('id')
    .eq('slug', slug)
    .is('deleted_at', null)
    .maybeSingle()

  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Slug already exists. Choose a different title or edit the slug.' })
  }

  const publishedAt = status === 'published' ? new Date().toISOString() : null

  const { data: post, error } = await supabaseAdmin
    .from('posts')
    .insert({
      title,
      slug,
      subtitle: body?.subtitle || null,
      category,
      category_path: categoryPath,
      image: body?.image || null,
      author: body?.author || 'Mwalimu Malata Benson',
      date: body?.date || null,
      read_time: body?.readTime || null,
      status,
      body: blocks,
      created_by: user.id,
      updated_by: user.id,
      published_at: publishedAt,
    })
    .select()
    .single()

  if (error) {
    console.error('[posts.create] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not create post.' })
  }

  await writeAudit({
    userId: user.id,
    action: 'create',
    tableName: 'posts',
    rowId: post.id,
    description: `Created post: ${title}`,
    afterData: post,
    event,
  })

  return { ok: true, post }
})
