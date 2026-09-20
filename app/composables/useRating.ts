const SESSION_KEY = 'gm-session-id'
const USER_RATING_KEY = 'site-user-rating'

export const useRating = () => {
  const ratings = useState<Record<number, number>>('site-ratings', () => ({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
    0: 0,
  }))

  const totalVotes = useState<number>('site-ratings-total', () => 0)
  const averageScore = useState<number>('site-ratings-avg', () => 0)

  // Persist user's own rating across reloads via localStorage
  const userRating = useState<number | null>('user-rating', () => {
    if (process.client) {
      const saved = localStorage.getItem(USER_RATING_KEY)
      return saved !== null ? Number(saved) : null
    }
    return null
  })

  // Stable session id for this browser
  const getSessionId = (): string => {
    if (!process.client) return ''
    let id = localStorage.getItem(SESSION_KEY)
    if (!id) {
      id = (crypto as any).randomUUID?.() || String(Date.now()) + Math.random().toString(16).slice(2)
      localStorage.setItem(SESSION_KEY, id)
    }
    return id
  }

  // Load aggregate stats from the server
  const load = async () => {
    if (!process.client) return
    try {
      const res = await $fetch<{
        ok: boolean
        counts: Record<number, number>
        total: number
        average: number
      }>('/api/ratings')

      ratings.value = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, ...res.counts }
      totalVotes.value = res.total
      averageScore.value = res.average
    } catch {
      // silent — leave zeros
    }
  }

  // Submit or change the user's rating (upsert on the server)
  const rate = async (value: number) => {
    if (!process.client) return

    // Optimistically update local view
    userRating.value = value
    localStorage.setItem(USER_RATING_KEY, String(value))

    try {
      await $fetch('/api/ratings', {
        method: 'POST',
        body: {
          session_id: getSessionId(),
          stars: value,
          page: window.location.pathname,
        },
      })
      await load()
    } catch {
      // silent
    }
  }

  const hasRated = computed(() => userRating.value !== null)

  return {
    ratings,
    totalVotes,
    averageScore,
    userRating,
    hasRated,
    rate,
    load,
  }
}