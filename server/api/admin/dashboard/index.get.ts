import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  // Posts stats
  const { data: posts } = await supabaseAdmin
    .from('posts')
    .select('id, title, slug, status, views, created_at, published_at')
    .is('deleted_at', null)

  const allPosts = posts || []
  const totalPosts = allPosts.length
  const published = allPosts.filter((p) => p.status === 'published').length
  const drafts = allPosts.filter((p) => p.status === 'draft').length
  const hidden = allPosts.filter((p) => p.status === 'hidden').length
  const totalViews = allPosts.reduce((a, p) => a + (p.views || 0), 0)

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const viewsThisWeek = allPosts
    .filter((p) => new Date(p.published_at || p.created_at).getTime() >= weekAgo)
    .reduce((a, p) => a + (p.views || 0), 0)

  // Comments stats
  const { count: totalComments } = await supabaseAdmin
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null)

  const { count: commentsThisWeek } = await supabaseAdmin
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null)
    .gte('created_at', new Date(weekAgo).toISOString())

  // Ratings stats
  const { data: ratings } = await supabaseAdmin
    .from('ratings')
    .select('stars')

  const rows = ratings || []
  const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let sum = 0
  for (const r of rows) {
    counts[r.stars] = (counts[r.stars] || 0) + 1
    sum += r.stars
  }
  const totalRatings = rows.length
  const averageRating = totalRatings ? Number((sum / totalRatings).toFixed(2)) : 0

  // Contact requests
  const { data: requests } = await supabaseAdmin
    .from('contact_requests')
    .select('id, name, phone, interest, status, created_at')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  const allRequests = requests || []
  const newContactRequests = allRequests.filter((r) => r.status === 'new').length

  // Views last 7 days (approximate — based on posts created in each day)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const now = new Date()
  const viewsSeries = Array.from({ length: 7 }).map((_, i) => {
    const dayStart = new Date(now)
    dayStart.setDate(now.getDate() - (6 - i))
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayStart.getDate() + 1)
    const dayViews = allPosts
      .filter((p) => {
        const d = new Date(p.published_at || p.created_at)
        return d >= dayStart && d < dayEnd
      })
      .reduce((a, p) => a + (p.views || 0), 0)
    return { day: days[dayStart.getDay()], views: dayViews }
  })

  // Posts per month (last 6 months)
  const months: { month: string; count: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const next = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
    const count = allPosts.filter((p) => {
      const cd = new Date(p.published_at || p.created_at)
      return cd >= d && cd < next && p.status === 'published'
    }).length
    months.push({ month: d.toLocaleString('en', { month: 'short' }), count })
  }

  // Recent posts
  const recentPosts = allPosts
    .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
    .slice(0, 20)
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      status: p.status,
      views: p.views || 0,
      date: new Date(p.published_at || p.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }),
    }))

  return {
    ok: true,
    stats: {
      totalPosts, published, drafts, hidden,
      totalViews, viewsThisWeek,
      totalComments: totalComments || 0,
      commentsThisWeek: commentsThisWeek || 0,
      totalRatings, averageRating,
      contactRequests: allRequests.length,
      newContactRequests,
    },
    viewsSeries,
    ratingDist: [5, 4, 3, 2, 1, 0].map((star) => ({ star, count: counts[star] || 0 })),
    postsPerMonth: months,
    recentPosts,
    contactRequests: allRequests,
  }
})
