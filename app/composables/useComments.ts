export interface Reply {
  id: string
  name: string
  text: string
  created_at: string
  is_admin: boolean
}

export interface Comment {
  id: string
  parent_id: string | null
  name: string
  text: string
  is_admin: boolean
  created_at: string
  replies: Reply[]
}

const store = useState<Record<string, Comment[]>>('comments-store', () => ({}))

export const useComments = (slug: string) => {
  // Ensure the slot exists and is always an array
  if (!store.value[slug]) store.value[slug] = []

  const comments = computed<Comment[]>(() => store.value[slug] ?? [])

  const loading = ref(false)

  const load = async () => {
    loading.value = true
    try {
      const res = await $fetch<{ ok: boolean; comments: Comment[] }>(`/api/posts/${slug}/comments`)
      store.value[slug] = res.comments ?? []
    } catch {
      store.value[slug] = []
    } finally {
      loading.value = false
    }
  }

  return { comments, loading, load }
}