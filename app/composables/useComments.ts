export interface Comment {
  id: number
  name: string
  text: string
  date: string
  replies: Comment[]
}

const store = reactive<Record<string, Comment[]>>({})

export const useComments = (slug: string) => {
  if (!store[slug]) store[slug] = []

  const comments = computed(() => store[slug])

  const addComment = (name: string, text: string, parentId?: number) => {
    if (!name.trim() || !text.trim()) return false
    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      replies: [],
    }
    if (parentId) {
      const parent = findComment(store[slug], parentId)
      if (parent) parent.replies.push(newComment)
    } else {
      store[slug].push(newComment)
    }
    return true
  }

  const findComment = (list: Comment[], id: number): Comment | null => {
    for (const c of list) {
      if (c.id === id) return c
      const found = findComment(c.replies, id)
      if (found) return found
    }
    return null
  }

  return { comments, addComment }
}