<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({ layout: 'admin' })

interface CommentRow {
  id: string
  post_id: string
  parent_id: string | null
  name: string
  text: string
  is_admin: boolean
  is_visible: boolean
  created_at: string
  post: { id: string; title: string; slug: string } | null
  replies: CommentRow[]
}

const { show: showToast } = useToast()

const loading = ref(true)
const comments = ref<CommentRow[]>([])

const load = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ ok: boolean; comments: CommentRow[] }>('/api/admin/comments')
    comments.value = res.comments || []
  } catch (err: any) {
    showToast(err?.data?.statusMessage || 'Could not load comments.')
  } finally {
    loading.value = false
  }
}
onMounted(load)

const searchQuery = ref('')
const filterPost = ref('')
const onlyWithReplies = ref(false)

const uniquePosts = computed(() =>
  Array.from(
    new Map(comments.value.filter((c) => c.post).map((c) => [c.post!.slug, c.post!])).values()
  )
)

const filtered = computed(() =>
  comments.value.filter((c) => {
    const q = searchQuery.value.toLowerCase().trim()
    if (q && !c.text.toLowerCase().includes(q) && !c.name.toLowerCase().includes(q)) return false
    if (filterPost.value && c.post?.slug !== filterPost.value) return false
    if (onlyWithReplies.value && c.replies.length === 0) return false
    return true
  })
)

const resetFilters = () => {
  searchQuery.value = ''
  filterPost.value = ''
  onlyWithReplies.value = false
}

const formattedDate = (s: string) =>
  new Date(s).toLocaleString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const deleteTarget = ref<CommentRow | null>(null)
const askDelete = (c: CommentRow) => { deleteTarget.value = c }
const cancelDelete = () => { deleteTarget.value = null }
const confirmDelete = async () => {
  if (!deleteTarget.value) return
  const target = deleteTarget.value
  deleteTarget.value = null
  try {
    await $fetch(`/api/admin/comments/${target.id}`, { method: 'DELETE' })
    comments.value = comments.value.filter((x) => x.id !== target.id)
    showToast('Comment deleted')
  } catch (err: any) {
    showToast(err?.data?.statusMessage || 'Could not delete.')
  }
}

const deleteReply = async (commentId: string, replyId: string) => {
  try {
    await $fetch(`/api/admin/comments/${replyId}`, { method: 'DELETE' })
    const c = comments.value.find((x) => x.id === commentId)
    if (c) c.replies = c.replies.filter((r) => r.id !== replyId)
    showToast('Reply deleted')
  } catch (err: any) {
    showToast(err?.data?.statusMessage || 'Could not delete.')
  }
}

const replyToId = ref<string | null>(null)
const replyText = ref('')
const postingReply = ref(false)

const startReply = (id: string) => { replyToId.value = id; replyText.value = '' }
const cancelReply = () => { replyToId.value = null; replyText.value = '' }

const submitReply = async () => {
  if (!replyToId.value || postingReply.value) return
  const text = replyText.value.trim()
  if (!text) return showToast('Please write a reply.')
  postingReply.value = true
  try {
    await $fetch('/api/admin/comments/reply', {
      method: 'POST',
      body: { parent_id: replyToId.value, text },
    })
    cancelReply()
    await load()
    showToast('Reply posted')
  } catch (err: any) {
    showToast(err?.data?.statusMessage || 'Could not post reply.')
  } finally {
    postingReply.value = false
  }
}
</script>

<template>
  <div class="space-y-4 md:space-y-6 w-full max-w-full overflow-hidden">
    <!-- FILTERS -->
    <section class="bg-white rounded-lg shadow border border-[#e8e8e8] p-4 w-full">
      <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-3 border-l-4 border-[#cc0000] pl-2">
        Filters
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        <div class="lg:col-span-2 min-w-0">
          <label class="block text-xs font-semibold mb-1">Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search comment text or name"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>

        <div class="min-w-0">
          <label class="block text-xs font-semibold mb-1">Post</label>
          <select
            v-model="filterPost"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#1a1a1a]"
          >
            <option value="">All posts</option>
            <option v-for="p in uniquePosts" :key="p.slug" :value="p.slug">{{ p.title }}</option>
          </select>
        </div>

        <div class="flex items-end">
          <label class="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <input v-model="onlyWithReplies" type="checkbox" class="rounded" />
            Only with replies
          </label>
        </div>
      </div>

      <div class="mt-3 flex justify-end">
        <button
          class="bg-[#e8e8e8] text-[#1a1a1a] py-2 px-4 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#d0d0d0]"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>
    </section>

    <!-- COMMENTS -->
    <section class="bg-white rounded-lg shadow border border-[#e8e8e8] p-4 w-full">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] border-l-4 border-[#cc0000] pl-2">
          Comments · {{ filtered.length }}
        </h2>
        <p class="text-xs text-gray-500">{{ comments.length }} total</p>
      </div>

      <div v-if="loading" class="text-center py-8">
        <p class="text-xs text-gray-500">Loading comments…</p>
      </div>

      <div v-else-if="filtered.length" class="space-y-3">
        <div
          v-for="c in filtered"
          :key="c.id"
          class="border border-[#e8e8e8] rounded-lg p-3 w-full"
        >
          <div v-if="c.post" class="flex items-center gap-2 mb-2">
            <Icon icon="fa6-solid:newspaper" class="text-[#cc0000] text-xs shrink-0" />
            <NuxtLink
              :to="`/article/${c.post.slug}`"
              target="_blank"
              class="text-[0.7rem] font-semibold text-[#cc0000] hover:underline break-words"
            >
              {{ c.post.title }}
            </NuxtLink>
          </div>

          <div class="bg-[#f8f8f8] border-l-4 border-[#cc0000] px-3 py-2 rounded">
            <div class="flex items-center justify-between gap-2 mb-1 flex-wrap">
              <span class="text-xs font-bold text-[#1a1a1a]">{{ c.name }}</span>
              <span class="text-[0.6rem] text-gray-500">{{ formattedDate(c.created_at) }}</span>
            </div>
            <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">{{ c.text }}</p>
          </div>

          <div v-if="c.replies.length" class="mt-2 ml-4 space-y-2 border-l-2 border-[#e8e8e8] pl-3">
            <div
              v-for="r in c.replies"
              :key="r.id"
              class="bg-white border border-[#f0f0f0] px-3 py-2 rounded"
            >
              <div class="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold" :class="r.is_admin ? 'text-[#cc0000]' : 'text-[#1a1a1a]'">
                    {{ r.name }}
                  </span>
                  <span v-if="r.is_admin" class="text-[0.55rem] font-bold uppercase tracking-wider bg-[#cc0000] text-white px-1.5 py-0.5 rounded">
                    Author
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[0.6rem] text-gray-500">{{ formattedDate(r.created_at) }}</span>
                  <button
                    class="text-[0.6rem] font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
                    @click="deleteReply(c.id, r.id)"
                  >Delete</button>
                </div>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">{{ r.text }}</p>
            </div>
          </div>

          <div class="mt-3 pt-2 border-t border-gray-100 flex flex-wrap gap-2 items-center">
            <button
              v-if="replyToId !== c.id"
              class="text-[0.65rem] font-bold text-[#cc0000] uppercase tracking-wider hover:underline px-2 py-1"
              @click="startReply(c.id)"
            >
              Reply as Author
            </button>
            <button
              class="text-[0.65rem] font-bold text-[#cc0000] uppercase tracking-wider hover:underline px-2 py-1"
              @click="askDelete(c)"
            >
              Delete Comment
            </button>
          </div>

          <form
            v-if="replyToId === c.id"
            class="mt-3 space-y-2 border-l-4 border-[#cc0000] pl-3"
            @submit.prevent="submitReply"
          >
            <textarea
              v-model="replyText"
              rows="3"
              maxlength="2000"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
              placeholder="Write your reply as the author…"
              :disabled="postingReply"
            ></textarea>
            <div class="flex gap-2">
              <button
                type="submit"
                class="bg-[#cc0000] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000] disabled:opacity-60"
                :disabled="postingReply"
              >{{ postingReply ? 'Posting…' : 'Post Reply' }}</button>
              <button
                type="button"
                class="bg-[#e8e8e8] text-[#1a1a1a] px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#d0d0d0]"
                :disabled="postingReply"
                @click="cancelReply"
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <p v-else class="text-xs text-gray-400 italic py-6 text-center">
        {{ comments.length === 0 ? 'No comments yet.' : 'No comments match your filters.' }}
      </p>
    </section>

    <Transition name="fade">
      <div
        v-if="deleteTarget"
        class="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4"
        @click.self="cancelDelete"
      >
        <div class="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
          <h3 class="text-base font-bold text-[#1a1a1a] mb-2">Delete comment?</h3>
          <p class="text-sm text-gray-600 mb-5 break-words">
            This comment by <strong>{{ deleteTarget.name }}</strong> and all its replies will be removed.
          </p>
          <div class="flex gap-2">
            <button
              class="flex-1 bg-white border border-gray-200 text-gray-700 py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-gray-100"
              @click="cancelDelete"
            >Cancel</button>
            <button
              class="flex-1 bg-[#cc0000] text-white py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000]"
              @click="confirmDelete"
            >Delete</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>