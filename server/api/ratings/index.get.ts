import { supabaseAdmin } from '../../utils/supabase'

export default defineEventHandler(async () => {
  const { data } = await supabaseAdmin
    .from('ratings')
    .select('stars')

  const rows = data || []
  const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let total = 0
  let sum = 0
  for (const r of rows) {
    counts[r.stars] = (counts[r.stars] || 0) + 1
    total++
    sum += r.stars
  }
  const average = total ? Number((sum / total).toFixed(2)) : 0

  return { ok: true, counts, total, average }
})
