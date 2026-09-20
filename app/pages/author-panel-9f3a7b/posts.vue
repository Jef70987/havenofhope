<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({ layout: 'admin' })

interface Post {
  id: string
  title: string
  slug: string
  subtitle: string | null
  category: string
  category_path: string
  date: string | null
  status: 'published' | 'draft' | 'hidden'
  image: string | null
  body: any[]
  views: number
  created_at: string
  updated_at: string
}

const { show: showToast } = useToast()

const loading = ref(false)
const posts = ref<Post[]>([])

const load = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ ok: boolean; posts: Post[] }>('/api/admin/posts')
    posts.value = res.posts || []
  } catch (err: any) {
    showToast(err?.data?.statusMessage || 'Could not load posts.')
  } finally {
    loading.value = false
  }
}

onMounted(load)

// Filters
const searchQuery = ref('')
const filterCategory = ref('')
const filterDateFrom = ref('')
const filterDateTo = ref('')
const filterStatus = ref<'' | 'published' | 'draft' | 'hidden'>('')

const categories = [
  { label: 'TSC', path: '/tsc' },
  { label: 'Schools', path: '/schools' },
  { label: 'Workshops', path: '/workshops' },
  { label: 'Educational News', path: '/educational-news' },
  { label: 'KNEC', path: '/knec' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Politics', path: '/politics' },
  { label: 'Social', path: '/social' },
]

const filtered = computed(() => {
  return posts.value.filter((p) => {
    const q = searchQuery.value.toLowerCase().trim()
    if (q && !p.title.toLowerCase().includes(q) && !p.slug.toLowerCase().includes(q)) return false
    if (filterCategory.value && p.category !== filterCategory.value) return false
    if (filterStatus.value && p.status !== filterStatus.value) return false
    if (filterDateFrom.value && (p.created_at || '').slice(0, 10) < filterDateFrom.value) return false
    if (filterDateTo.value && (p.created_at || '').slice(0, 10) > filterDateTo.value) return false
    return true
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  filterCategory.value = ''
  filterDateFrom.value = ''
  filterDateTo.value = ''
  filterStatus.value = ''
}

const excerptOf = (p: Post) => {
  const firstP = (p.body || []).find((b) => b.type === 'p')
  return firstP?.text?.slice(0, 120) || ''
}

const formattedDate = (p: Post) => {
  if (p.date) return p.date
  if (!p.created_at) return ''
  return new Date(p.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Actions
const editPost = (p: Post) => {
  navigateTo(`/author-panel-9f3a7b/create?slug=${p.slug}`)
}

const updatingId = ref<string | null>(null)

const setStatus = async (p: Post, status: Post['status']) => {
  updatingId.value = p.id
  try {
    await $fetch(`/api/admin/posts/${p.id}`, {
      method: 'PATCH',
      body: { status },
    })
    p.status = status
    showToast(
      status === 'published' ? 'Post published'
      : status === 'draft' ? 'Post moved to drafts'
      : 'Post hidden from public'
    )
  } catch (err: any) {
    showToast(err?.data?.statusMessage || 'Could not update post.')
  } finally {
    updatingId.value = null
  }
}

const togglePublish = (p: Post) => setStatus(p, p.status === 'published' ? 'draft' : 'published')
const toggleHidden = (p: Post) => setStatus(p, p.status === 'hidden' ? 'published' : 'hidden')

// Delete
const deleteTarget = ref<Post | null>(null)
const askDelete = (p: Post) => { deleteTarget.value = p }
const cancelDelete = () => { deleteTarget.value = null }
const confirmDelete = async () => {
  if (!deleteTarget.value) return
  const target = deleteTarget.value
  deleteTarget.value = null
  try {
    await $fetch(`/api/admin/posts/${target.id}`, { method: 'DELETE' })
    posts.value = posts.value.filter((x) => x.id !== target.id)
    showToast('Post deleted')
  } catch (err: any) {
    showToast(err?.data?.statusMessage || 'Could not delete post.')
  }
}

const statusBadge = (s: Post['status']) => {
  if (s === 'published') return 'bg-green-100 text-green-700'
  if (s === 'draft') return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-200 text-gray-600'
}
</script>

<template>
  <div class="space-y-4 md:space-y-6 w-full max-w-full overflow-hidden">
    <!-- FILTERS -->
    <section class="bg-white rounded-lg shadow border border-[#e8e8e8] p-4 w-full">
      <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-3 border-l-4 border-[#cc0000] pl-2">
        Filters
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 w-full">
        <div class="sm:col-span-2 lg:col-span-2 min-w-0">
          <label class="block text-xs font-semibold mb-1">Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by title or slug"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>

        <div class="min-w-0">
          <label class="block text-xs font-semibold mb-1">Category</label>
          <select
            v-model="filterCategory"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#1a1a1a]"
          >
            <option value="">All</option>
            <option v-for="c in categories" :key="c.label" :value="c.label">{{ c.label }}</option>
          </select>
        </div>

        <div class="min-w-0">
          <label class="block text-xs font-semibold mb-1">From</label>
          <input
            v-model="filterDateFrom"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>

        <div class="min-w-0">
          <label class="block text-xs font-semibold mb-1">To</label>
          <input
            v-model="filterDateTo"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
          />
        </div>

        <div class="min-w-0">
          <label class="block text-xs font-semibold mb-1">Status</label>
          <select
            v-model="filterStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#1a1a1a]"
          >
            <option value="">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="hidden">Hidden</option>
          </select>
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

    <!-- POSTS LIST -->
    <section class="bg-white rounded-lg shadow border border-[#e8e8e8] p-4 w-full">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] border-l-4 border-[#cc0000] pl-2">
          Posts · {{ filtered.length }}
        </h2>
        <div class="flex items-center gap-3">
          <p class="text-xs text-gray-500">{{ posts.length }} total</p>
          <NuxtLink
            to="/author-panel-9f3a7b/create"
            class="text-xs font-bold text-white bg-[#cc0000] uppercase tracking-wider px-3 py-1.5 rounded hover:bg-[#990000]"
          >
            + New Post
          </NuxtLink>
        </div>
      </div>

      <div v-if="loading" class="text-center py-8">
        <p class="text-xs text-gray-500">Loading posts…</p>
      </div>

      <div v-else-if="filtered.length" class="space-y-3">
        <div
          v-for="p in filtered"
          :key="p.id"
          class="border border-[#e8e8e8] rounded-lg p-3 flex flex-col gap-3 hover:border-gray-300 transition-colors w-full"
        >
          <div class="flex gap-3 min-w-0">
            <div class="w-20 h-16 bg-[#f0f0f0] rounded overflow-hidden shrink-0">
              <img v-if="p.image" :src="p.image" :alt="p.title" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-[0.55rem] text-gray-400">
                No image
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="inline-block bg-[#cc0000] text-white text-[0.55rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded">
                  {{ p.category }}
                </span>
                <span class="text-[0.55rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded" :class="statusBadge(p.status)">
                  {{ p.status }}
                </span>
                <span class="text-[0.6rem] text-gray-500">· {{ formattedDate(p) }}</span>
                <span class="text-[0.6rem] text-gray-400">· {{ p.views }} views</span>
              </div>
              <h3 class="text-sm font-bold text-[#1a1a1a] leading-snug mb-1 break-words">{{ p.title }}</h3>
              <p class="text-xs text-gray-500 line-clamp-2 break-words">{{ excerptOf(p) }}</p>
              <p class="text-[0.6rem] text-gray-400 mt-1 font-mono break-all">/article/{{ p.slug }}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            <button
              class="text-[0.65rem] font-bold text-[#cc0000] hover:underline uppercase tracking-wider px-2 py-1"
              @click="editPost(p)"
            >Edit</button>
            <button
              class="text-[0.65rem] font-bold text-gray-700 hover:underline uppercase tracking-wider px-2 py-1 disabled:opacity-50"
              :disabled="updatingId === p.id"
              @click="togglePublish(p)"
            >{{ p.status === 'published' ? 'Unpublish' : 'Publish' }}</button>
            <button
              class="text-[0.65rem] font-bold text-gray-700 hover:underline uppercase tracking-wider px-2 py-1 disabled:opacity-50"
              :disabled="updatingId === p.id"
              @click="toggleHidden(p)"
            >{{ p.status === 'hidden' ? 'Show' : 'Hide' }}</button>
            <button
              class="text-[0.65rem] font-bold text-[#cc0000] hover:underline uppercase tracking-wider px-2 py-1"
              @click="askDelete(p)"
            >Delete</button>
          </div>
        </div>
      </div>

      <p v-else class="text-xs text-gray-400 italic py-6 text-center">
        {{ posts.length === 0 ? 'No posts yet. Create your first one.' : 'No posts match your filters.' }}
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
          <h3 class="text-base font-bold text-[#1a1a1a] mb-2">Delete post?</h3>
          <p class="text-sm text-gray-600 mb-5 break-words">
            "{{ deleteTarget.title }}" will be removed. This cannot be undone.
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