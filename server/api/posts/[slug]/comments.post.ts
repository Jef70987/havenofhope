import { supabaseAdmin } from '../../../utils/supabase'
import { writeAudit } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Missing slug.' })

  const body = await readBody(event)
  const name = String(body?.name || '').trim()
  const text = String(body?.text || '').trim()
  const parentId = body?.parent_id ? String(body.parent_id) : null

  if (!name || name.length > 80) throw createError({ statusCode: 400, statusMessage: 'Name is required (max 80 chars).' })
  if (!text || text.length > 2000) throw createError({ statusCode: 400, statusMessage: 'Comment is required (max 2000 chars).' })

  const ip =
    event.node?.req?.headers?.['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    event.node?.req?.socket?.remoteAddress ||
    null

  const { data: post } = await supabaseAdmin
    .from('posts')
    .select('id')
    .eq('slug', slug)
    .eq('status', 'published')
    .is('deleted_at', null)
    .maybeSingle()

  if (!post) throw createError({ statusCode: 404, statusMessage: 'Post not found.' })

  if (parentId) {
    const { data: parent } = await supabaseAdmin
      .from('comments')
      .select('id')
      .eq('id', parentId)
      .eq('post_id', post.id)
      .maybeSingle()
    if (!parent) throw createError({ statusCode: 400, statusMessage: 'Parent comment not found.' })
  }

  const { data: comment, error } = await supabaseAdmin
    .from('comments')
    .insert({
      post_id: post.id,
      parent_id: parentId,
      name,
      text,
      is_admin: false,
      is_visible: true,
      ip_address: ip,
    })
    .select()
    .single()

  if (error) {
    console.error('[comments.create] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not post comment.' })
  }

  await writeAudit({
    action: 'create',
    tableName: 'comments',
    rowId: comment.id,
    description: `Comment on ${slug} by ${name}`,
    event,
  })

  return { ok: true, comment }
})
