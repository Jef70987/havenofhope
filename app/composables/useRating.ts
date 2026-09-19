export const useRating = () => {
  const ratings = useState<Record<number, number>>('site-ratings', () => ({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
    0: 0,
  }))

  // Persist across reloads using localStorage
  const userRating = useState<number | null>('user-rating', () => {
    if (process.client) {
      const saved = localStorage.getItem('site-user-rating')
      return saved !== null ? Number(saved) : null
    }
    return null
  })

  const rate = (value: number) => {
    if (userRating.value !== null) {
      ratings.value[userRating.value] = Math.max(0, ratings.value[userRating.value] - 1)
    }
    ratings.value[value] = (ratings.value[value] || 0) + 1
    userRating.value = value
    if (process.client) localStorage.setItem('site-user-rating', String(value))
  }

  const hasRated = computed(() => userRating.value !== null)

  const totalVotes = computed(() =>
    Object.values(ratings.value).reduce((a, b) => a + b, 0)
  )

  const averageScore = computed(() => {
    const t = totalVotes.value
    if (t === 0) return 0
    const sum = Object.entries(ratings.value).reduce(
      (acc, [star, count]) => acc + Number(star) * count,
      0
    )
    return Number((sum / t).toFixed(2))
  })

  return { ratings, userRating, rate, hasRated, totalVotes, averageScore }
}