import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const { data } = await supabaseAdmin
    .from('contact_requests')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  return { ok: true, requests: data || [] }
})
