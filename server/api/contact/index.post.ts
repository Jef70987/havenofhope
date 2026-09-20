import { supabaseAdmin } from '../../utils/supabase'
import { writeAudit } from '../../utils/audit'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = String(body?.name || '').trim()
  const phone = String(body?.phone || '').trim()
  const interest = String(body?.interest || '').trim()

  if (!name || name.length > 120) throw createError({ statusCode: 400, statusMessage: 'Name is required.' })
  if (!phone || phone.length > 30) throw createError({ statusCode: 400, statusMessage: 'Phone is required.' })
  if (!interest || interest.length > 1000) throw createError({ statusCode: 400, statusMessage: 'Description is required.' })

  const ip =
    event.node?.req?.headers?.['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    event.node?.req?.socket?.remoteAddress ||
    null

  const { data: row, error } = await supabaseAdmin
    .from('contact_requests')
    .insert({ name, phone, interest, ip_address: ip, status: 'new' })
    .select()
    .single()

  if (error) {
    console.error('[contact.create] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Could not send message.' })
  }

  await writeAudit({
    action: 'create',
    tableName: 'contact_requests',
    rowId: row.id,
    description: `Contact request from ${name}`,
    event,
  })

  return { ok: true }
})
