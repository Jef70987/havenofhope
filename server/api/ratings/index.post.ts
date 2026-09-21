import { supabaseAdmin } from '../../utils/supabase'
import { clearPublicCache } from '../../utils/cache'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const sessionId = String(body?.session_id || '').trim()
  const stars = Number(body?.stars)
  const page = String(body?.page || '').trim() || null

  if (!sessionId || sessionId.length > 100) throw createError({ statusCode: 400, statusMessage: 'Missing session.' })
  if (!Number.isInteger(stars) || stars < 0 || stars > 5) throw createError({ statusCode: 400, statusMessage: 'Rating must be 0–5.' })

  const ip =
    event.node?.req?.headers?.['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    event.node?.req?.socket?.remoteAddress ||
    null

  const { error } = await supabaseAdmin
    .from('ratings')
    .upsert(
      { session_id: sessionId, stars, page, ip_address: ip },
      { onConflict: 'session_id' }
    )

  if (error) {
    console.error('[ratings.upsert] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not save rating.' })
  }

  await clearPublicCache()

  return { ok: true }
})