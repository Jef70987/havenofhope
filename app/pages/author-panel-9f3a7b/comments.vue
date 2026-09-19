<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({ layout: 'admin' })

interface Reply {
  id: number
  name: string
  text: string
  date: string
  isAdmin: boolean
}

interface Comment {
  id: number
  postId: number
  postTitle: string
  postSlug: string
  name: string
  text: string
  date: string
  replies: Reply[]
}

// Placeholder data — replace with DB later
const comments = ref<Comment[]>([
  {
    id: 1, postId: 1,
    postTitle: 'Mathematics Can Change the Destiny of a KCSE Candidate: 53 Days to Turn Fear into Marks',
    postSlug: 'mathematics-can-change-destiny-kcse-candidate',
    name: 'Jane Wanjiku',
    text: 'This is very helpful. My son is in Form 4 and we will use the 20 sums approach.',
    date: '11 Sep 2026, 14:22',
    replies: [
      { id: 101, name: 'Mwalimu Malata Benson', text: 'Thank you Jane. Consistency is key — 20 sums every day.', date: '11 Sep 2026, 15:10', isAdmin: true },
    ],
  },
  {
    id: 2, postId: 1,
    postTitle: 'Mathematics Can Change the Destiny of a KCSE Candidate: 53 Days to Turn Fear into Marks',
    postSlug: 'mathematics-can-change-destiny-kcse-candidate',
    name: 'Kevin Otieno',
    text: 'What about learners who struggle with basics? Any advice?',
    date: '11 Sep 2026, 18:05',
    replies: [],
  },
  {
    id: 3, postId: 2,
    postTitle: 'Musingu Boys Posts Best KCSE Results in School History',
    postSlug: 'musingu-boys-best-kcse-results',
    name: 'Anonymous',
    text: 'This post is fake news. The results are not real.',
    date: '10 Sep 2026, 09:14',
    replies: [],
  },
  {
    id: 4, postId: 3,
    postTitle: 'TSC Re-Advertises 1,631 Promotion Jobs for Teachers',
    postSlug: 'tsc-re-advertises-1631-promotion-jobs',
    name: 'Mary Achieng',
    text: 'When is the deadline? The article doesn\'t say.',
    date: '09 Sep 2026, 11:40',
    replies: [],
  },
])

const searchQuery = ref('')
const filterPost = ref('')
const onlyWithReplies = ref(false)

const uniquePosts = computed(() =>
  Array.from(new Map(comments.value.map((c) => [c.postSlug, c])).values())
)

const filtered = computed(() => {
  return comments.value.filter((c) => {
    const q = searchQuery.value.toLowerCase().trim()
    if (q && !c.text.toLowerCase().includes(q) && !c.name.toLowerCase().includes(q)) return false
    if (filterPost.value && c.postSlug !== filterPost.value) return false
    if (onlyWithReplies.value && c.replies.length === 0) return false
    return true
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  filterPost.value = ''
  onlyWithReplies.value = false
}

const { show: showToast } = useToast()

// Delete a comment
const deleteTarget = ref<Comment | null>(null)
const askDelete = (c: Comment) => { deleteTarget.value = c }
const cancelDelete = () => { deleteTarget.value = null }
const confirmDelete = () => {
  if (!deleteTarget.value) return
  comments.value = comments.value.filter((x) => x.id !== deleteTarget.value!.id)
  showToast('Comment deleted')
  deleteTarget.value = null
}

// Delete a reply
const deleteReply = (commentId: number, replyId: number) => {
  const c = comments.value.find((x) => x.id === commentId)
  if (!c) return
  c.replies = c.replies.filter((r) => r.id !== replyId)
  showToast('Reply deleted')
}

// Reply as admin
const replyToId = ref<number | null>(null)
const replyText = ref('')

const startReply = (id: number) => {
  replyToId.value = id
  replyText.value = ''
}
const cancelReply = () => {
  replyToId.value = null
  replyText.value = ''
}
const submitReply = () => {
  if (!replyToId.value) return
  const c = comments.value.find((x) => x.id === replyToId.value)
  if (!c) return
  if (!replyText.value.trim()) return showToast('Please write a reply.')
  c.replies.push({
    id: Date.now(),
    name: 'Mwalimu Malata Benson',
    text: replyText.value.trim(),
    date: new Date().toLocaleString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    isAdmin: true,
  })
  showToast('Reply posted')
  cancelReply()
}
</script>

<template>
  <div class="space-y-4 md:space-y-6 w-full max-w-full overflow-hidden">
    <!-- ===== FILTERS ===== -->
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
            <option v-for="p in uniquePosts" :key="p.postSlug" :value="p.postSlug">
              {{ p.postTitle }}
            </option>
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

    <!-- ===== COMMENTS ===== -->
    <section class="bg-white rounded-lg shadow border border-[#e8e8e8] p-4 w-full">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] border-l-4 border-[#cc0000] pl-2">
          Comments · {{ filtered.length }}
        </h2>
        <p class="text-xs text-gray-500">{{ comments.length }} total</p>
      </div>

      <div v-if="filtered.length" class="space-y-3">
        <div
          v-for="c in filtered"
          :key="c.id"
          class="border border-[#e8e8e8] rounded-lg p-3 w-full"
        >
          <!-- Post link -->
          <div class="flex items-center gap-2 mb-2">
            <Icon icon="fa6-solid:newspaper" class="text-[#cc0000] text-xs shrink-0" />
            <NuxtLink
              :to="`/article/${c.postSlug}`"
              target="_blank"
              class="text-[0.7rem] font-semibold text-[#cc0000] hover:underline break-words"
            >
              {{ c.postTitle }}
            </NuxtLink>
          </div>

          <!-- Comment body -->
          <div class="bg-[#f8f8f8] border-l-4 border-[#cc0000] px-3 py-2 rounded">
            <div class="flex items-center justify-between gap-2 mb-1 flex-wrap">
              <span class="text-xs font-bold text-[#1a1a1a]">{{ c.name }}</span>
              <span class="text-[0.6rem] text-gray-500">{{ c.date }}</span>
            </div>
            <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">{{ c.text }}</p>
          </div>

          <!-- Replies -->
          <div v-if="c.replies.length" class="mt-2 ml-4 space-y-2 border-l-2 border-[#e8e8e8] pl-3">
            <div
              v-for="r in c.replies"
              :key="r.id"
              class="bg-white border border-[#f0f0f0] px-3 py-2 rounded"
            >
              <div class="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold" :class="r.isAdmin ? 'text-[#cc0000]' : 'text-[#1a1a1a]'">
                    {{ r.name }}
                  </span>
                  <span v-if="r.isAdmin" class="text-[0.55rem] font-bold uppercase tracking-wider bg-[#cc0000] text-white px-1.5 py-0.5 rounded">
                    Author
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[0.6rem] text-gray-500">{{ r.date }}</span>
                  <button
                    class="text-[0.6rem] font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
                    @click="deleteReply(c.id, r.id)"
                  >Delete</button>
                </div>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">{{ r.text }}</p>
            </div>
          </div>

          <!-- Actions -->
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

          <!-- Reply form (admin) -->
          <form
            v-if="replyToId === c.id"
            class="mt-3 space-y-2 border-l-4 border-[#cc0000] pl-3"
            @submit.prevent="submitReply"
          >
            <textarea
              v-model="replyText"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
              placeholder="Write your reply as the author…"
            ></textarea>
            <div class="flex gap-2">
              <button
                type="submit"
                class="bg-[#cc0000] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000]"
              >
                Post Reply
              </button>
              <button
                type="button"
                class="bg-[#e8e8e8] text-[#1a1a1a] px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#d0d0d0]"
                @click="cancelReply"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <p v-else class="text-xs text-gray-400 italic py-6 text-center">
        No comments match your filters.
      </p>
    </section>

    <!-- DELETE CONFIRMATION -->
    <Transition name="fade">
      <div
        v-if="deleteTarget"
        class="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4"
        @click.self="cancelDelete"
      >
        <div class="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
          <h3 class="text-base font-bold text-[#1a1a1a] mb-2">Delete comment?</h3>
          <p class="text-sm text-gray-600 mb-5 break-words">
            This comment by <strong>{{ deleteTarget.name }}</strong> will be permanently removed.
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
