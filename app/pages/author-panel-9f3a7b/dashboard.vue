<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({ layout: 'admin' })

// ===== PLACEHOLDER DATA =====
const stats = reactive({
  totalPosts: 24,
  published: 19,
  drafts: 3,
  hidden: 2,
  totalViews: 18432,
  viewsThisWeek: 1284,
  totalComments: 87,
  commentsThisWeek: 14,
  totalRatings: 42,
  averageRating: 4.32,
  contactRequests: 11,
  newContactRequests: 4,
})

// Contact requests (with status)
type RequestStatus = 'new' | 'replied' | 'closed'
interface ContactRequest {
  id: number
  name: string
  phone: string
  interest: string
  date: string
  status: RequestStatus
}

const contactRequests = ref<ContactRequest[]>([
  { id: 1,  name: 'Jane Wanjiku',  phone: '0721 234 567', interest: 'Requesting a mentorship session for 12 Kiswahili teachers in Kakamega.', date: '11 Sep 2026', status: 'new' },
  { id: 2,  name: 'Kevin Otieno',  phone: '0733 987 654', interest: 'Inviting Mwalimu to speak at our school prize-giving day in November.', date: '11 Sep 2026', status: 'new' },
  { id: 3,  name: 'Mary Achieng',  phone: '0711 222 333', interest: 'Interested in the Kiswahili workshop at KCSE level. Please share details.', date: '10 Sep 2026', status: 'new' },
  { id: 4,  name: 'Brian Kimani',   phone: '0744 111 222', interest: 'Looking for consultation on setting up a school mentorship programme.', date: '10 Sep 2026', status: 'new' },
  { id: 5,  name: 'Esther Nduta',  phone: '0702 555 666', interest: 'Question about publishing a Kiswahili revision booklet.', date: '09 Sep 2026', status: 'replied' },
  { id: 6,  name: 'Peter Mwangi',  phone: '0720 888 999', interest: 'Seeking a quote for a two-day Kiswahili workshop in Nyeri.', date: '09 Sep 2026', status: 'replied' },
  { id: 7,  name: 'Grace Achieng', phone: '0745 666 777', interest: 'Request for mentorship on CBC implementation in secondary schools.', date: '08 Sep 2026', status: 'closed' },
  { id: 8,  name: 'Samuel Kip',    phone: '0700 111 333', interest: 'Asking about the price of the KCSE Kiswahili revision booklet.', date: '08 Sep 2026', status: 'replied' },
  { id: 9,  name: 'Lucy Njeri',    phone: '0712 444 555', interest: 'Would like Mwalimu to be the chief guest at our school drama day.', date: '07 Sep 2026', status: 'new' },
  { id: 10, name: 'Daniel Barasa', phone: '0733 555 888', interest: 'Partnership on a mentorship programme for Form 4 candidates.', date: '07 Sep 2026', status: 'replied' },
  { id: 11, name: 'Sarah Wambui',  phone: '0722 999 000', interest: 'General question about Kiswahili KCSE preparation tips.', date: '06 Sep 2026', status: 'closed' },
])

// Views chart
const viewsSeries = [
  { day: 'Mon', views: 172 },
  { day: 'Tue', views: 231 },
  { day: 'Wed', views: 148 },
  { day: 'Thu', views: 196 },
  { day: 'Fri', views: 254 },
  { day: 'Sat', views: 132 },
  { day: 'Sun', views: 151 },
]
const maxViews = computed(() => Math.max(...viewsSeries.map((v) => v.views)))

// Ratings breakdown
const ratingDist = [
  { star: 5, count: 24 },
  { star: 4, count: 12 },
  { star: 3, count: 4 },
  { star: 2, count: 1 },
  { star: 1, count: 1 },
  { star: 0, count: 0 },
]
const maxRating = computed(() => Math.max(...ratingDist.map((r) => r.count)))

// Posts per month
const postsPerMonth = [
  { month: 'Apr', count: 2 },
  { month: 'May', count: 3 },
  { month: 'Jun', count: 1 },
  { month: 'Jul', count: 4 },
  { month: 'Aug', count: 5 },
  { month: 'Sep', count: 9 },
]
const maxPostsMonth = computed(() => Math.max(...postsPerMonth.map((p) => p.count)))

// Recent posts
const recentPosts = [
  { title: 'Mathematics Can Change the Destiny of a KCSE Candidate', slug: 'mathematics-can-change-destiny-kcse-candidate', status: 'published', views: 412, date: '11 Sep 2026' },
  { title: 'Musingu Boys Posts Best KCSE Results in School History', slug: 'musingu-boys-best-kcse-results', status: 'published', views: 318, date: '9 Sep 2026' },
  { title: 'TSC Re-Advertises 1,631 Promotion Jobs for Teachers', slug: 'tsc-re-advertises-1631-promotion-jobs', status: 'published', views: 289, date: '9 Sep 2026' },
  { title: 'KUPPET Threatens Countywide Strike Over TSC Principal', slug: 'kuppet-threatens-countywide-strike', status: 'draft', views: 0, date: '9 Sep 2026' },
  { title: 'Kiswahili Teachers Attend National Workshop in Nakuru', slug: 'kiswahili-teachers-workshop-nakuru', status: 'hidden', views: 22, date: '9 Sep 2026' },
  { title: 'KNEC Releases 2026 KCSE Examination Timetable', slug: 'knec-releases-2026-kcse-timetable', status: 'published', views: 305, date: '8 Sep 2026' },
]

// Filters + pagination for contact requests
const filterStatus = ref<'' | RequestStatus>('')
const page = ref(1)
const perPage = 5

const filteredRequests = computed(() => {
  if (!filterStatus.value) return contactRequests.value
  return contactRequests.value.filter((r) => r.status === filterStatus.value)
})
const paginatedRequests = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredRequests.value.slice(start, start + perPage)
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredRequests.value.length / perPage)))

watch(filterStatus, () => { page.value = 1 })
watch(totalPages, (v) => { if (page.value > v) page.value = v })

// Recent posts pagination
const postsPage = ref(1)
const postsPerPage = 5
const paginatedPosts = computed(() => {
  const start = (postsPage.value - 1) * postsPerPage
  return recentPosts.slice(start, start + postsPerPage)
})
const postsTotalPages = computed(() => Math.max(1, Math.ceil(recentPosts.length / postsPerPage)))

const { show: showToast } = useToast()

const setStatus = (r: ContactRequest, s: RequestStatus) => {
  r.status = s
  showToast(`Marked as ${s}`)
}
const deleteRequest = (r: ContactRequest) => {
  const i = contactRequests.value.findIndex((x) => x.id === r.id)
  if (i !== -1) contactRequests.value.splice(i, 1)
  showToast('Request deleted')
}

const statusBadgeClass = (s: RequestStatus) => {
  if (s === 'new') return 'bg-[#cc0000] text-white'
  if (s === 'replied') return 'bg-green-100 text-green-700'
  return 'bg-gray-200 text-gray-600'
}
const statusLabel = (s: RequestStatus) => {
  if (s === 'new') return 'New'
  if (s === 'replied') return 'Replied'
  return 'Closed'
}

const postStatusBadge = (s: string) => {
  if (s === 'published') return 'bg-green-100 text-green-700'
  if (s === 'draft') return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-200 text-gray-600'
}
</script>

<template>
  <div class="space-y-4 md:space-y-6 w-full max-w-full">
    <!-- HEADER -->
    <div>
      <h1 class="text-lg md:text-xl font-bold text-[#1a1a1a]">Dashboard</h1>
      <p class="text-xs md:text-sm text-gray-500">Overview of your blog at a glance</p>
    </div>

    <!-- TOP STAT CARDS -->
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <div class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[0.65rem] font-bold uppercase tracking-wider text-gray-500">Posts</span>
          <Icon icon="fa6-solid:newspaper" class="text-[#cc0000]" />
        </div>
        <p class="text-2xl font-bold text-[#1a1a1a]">{{ stats.totalPosts }}</p>
        <p class="text-[0.65rem] text-gray-500 mt-1">
          {{ stats.published }} published · {{ stats.drafts }} draft · {{ stats.hidden }} hidden
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[0.65rem] font-bold uppercase tracking-wider text-gray-500">Views</span>
          <Icon icon="fa6-solid:eye" class="text-[#cc0000]" />
        </div>
        <p class="text-2xl font-bold text-[#1a1a1a]">{{ stats.totalViews.toLocaleString() }}</p>
        <p class="text-[0.65rem] text-gray-500 mt-1">
          +{{ stats.viewsThisWeek.toLocaleString() }} this week
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[0.65rem] font-bold uppercase tracking-wider text-gray-500">Comments</span>
          <Icon icon="fa6-solid:comments" class="text-[#cc0000]" />
        </div>
        <p class="text-2xl font-bold text-[#1a1a1a]">{{ stats.totalComments }}</p>
        <p class="text-[0.65rem] text-gray-500 mt-1">
          +{{ stats.commentsThisWeek }} this week
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[0.65rem] font-bold uppercase tracking-wider text-gray-500">Avg Rating</span>
          <Icon icon="fa6-solid:star" class="text-[#f5b301]" />
        </div>
        <p class="text-2xl font-bold text-[#1a1a1a]">{{ stats.averageRating.toFixed(2) }}</p>
        <p class="text-[0.65rem] text-gray-500 mt-1">
          {{ stats.totalRatings }} ratings
        </p>
      </div>
    </section>

    <!-- ===== CONTACT REQUESTS (business priority) ===== -->
    <section class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 w-full">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] border-l-4 border-[#cc0000] pl-2">
            Contact Requests
          </h2>
          <p class="text-[0.65rem] text-gray-500 mt-1 ml-2">
            {{ stats.contactRequests }} total ·
            <span class="text-[#cc0000] font-bold">{{ stats.newContactRequests }} new</span>
          </p>
        </div>

        <div class="flex items-center gap-2">
          <label class="text-xs text-gray-600 font-semibold">Status</label>
          <select
            v-model="filterStatus"
            class="px-3 py-1.5 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-[#1a1a1a]"
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="replied">Replied</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div v-if="paginatedRequests.length" class="space-y-2">
        <div
          v-for="r in paginatedRequests"
          :key="r.id"
          class="border rounded-lg p-3"
          :class="r.status === 'new' ? 'border-[#cc0000]/30 bg-[#cc0000]/5' : 'border-[#e8e8e8] bg-white'"
        >
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm font-bold text-[#1a1a1a]">{{ r.name }}</span>
              <span class="text-[0.55rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" :class="statusBadgeClass(r.status)">
                {{ statusLabel(r.status) }}
              </span>
            </div>
            <span class="text-[0.65rem] text-gray-500">{{ r.date }}</span>
          </div>

          <div class="text-xs text-gray-600 mb-2 flex items-center gap-2">
            <Icon icon="fa6-solid:phone" class="text-[0.65rem] text-gray-400" />
            <a :href="`tel:${r.phone.replace(/\s/g, '')}`" class="font-mono hover:text-[#cc0000]">{{ r.phone }}</a>
          </div>

          <p class="text-sm text-gray-700 leading-relaxed mb-3 break-words">{{ r.interest }}</p>

          <div class="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            <a
              :href="`tel:${r.phone.replace(/\s/g, '')}`"
              class="text-[0.65rem] font-bold text-gray-700 uppercase tracking-wider hover:underline px-2 py-1"
            >Call</a>
            <button
              v-if="r.status !== 'replied'"
              class="text-[0.65rem] font-bold text-[#cc0000] uppercase tracking-wider hover:underline px-2 py-1"
              @click="setStatus(r, 'replied')"
            >Mark Replied</button>
            <button
              v-if="r.status !== 'closed'"
              class="text-[0.65rem] font-bold text-gray-700 uppercase tracking-wider hover:underline px-2 py-1"
              @click="setStatus(r, 'closed')"
            >Close</button>
            <button
              v-if="r.status !== 'new'"
              class="text-[0.65rem] font-bold text-gray-700 uppercase tracking-wider hover:underline px-2 py-1"
              @click="setStatus(r, 'new')"
            >Reopen</button>
            <button
              class="text-[0.65rem] font-bold text-[#cc0000] uppercase tracking-wider hover:underline px-2 py-1"
              @click="deleteRequest(r)"
            >Delete</button>
          </div>
        </div>
      </div>
      <p v-else class="text-xs text-gray-400 italic py-6 text-center">
        No requests match the filter.
      </p>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-gray-100">
        <button
          class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          :disabled="page === 1"
          @click="page--"
        >Prev</button>
        <span class="text-xs text-gray-600">Page {{ page }} of {{ totalPages }}</span>
        <button
          class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          :disabled="page === totalPages"
          @click="page++"
        >Next</button>
      </div>
    </section>

    <!-- SECOND ROW: views chart + rating breakdown -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 w-full">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-4 border-l-4 border-[#cc0000] pl-2">
          Views · Last 7 days
        </h2>
        <div class="flex items-end gap-2 h-40">
          <div v-for="v in viewsSeries" :key="v.day" class="flex-1 flex flex-col items-center gap-1">
            <span class="text-[0.6rem] font-bold text-[#1a1a1a]">{{ v.views }}</span>
            <div class="w-full bg-[#cc0000] rounded-t" :style="{ height: `${(v.views / maxViews) * 100}%` }"></div>
            <span class="text-[0.6rem] text-gray-500">{{ v.day }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 w-full">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-4 border-l-4 border-[#cc0000] pl-2">
          Ratings Breakdown
        </h2>
        <div class="space-y-2">
          <div v-for="r in ratingDist" :key="r.star" class="flex items-center gap-3">
            <span class="text-xs font-bold text-[#1a1a1a] w-10 flex items-center gap-1">
              <Icon icon="fa6-solid:star" class="text-[#f5b301] text-xs" />
              {{ r.star }}
            </span>
            <div class="flex-1 bg-[#f8f8f8] rounded h-4 overflow-hidden">
              <div class="bg-[#cc0000] h-full" :style="{ width: `${(r.count / maxRating) * 100}%` }"></div>
            </div>
            <span class="text-xs font-bold text-gray-600 w-8 text-right">{{ r.count }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- THIRD ROW: posts per month + status -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 lg:col-span-2 w-full">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-4 border-l-4 border-[#cc0000] pl-2">
          Posts Published · Last 6 months
        </h2>
        <div class="flex items-end gap-3 h-40">
          <div v-for="p in postsPerMonth" :key="p.month" class="flex-1 flex flex-col items-center gap-1">
            <span class="text-[0.6rem] font-bold text-[#1a1a1a]">{{ p.count }}</span>
            <div class="w-full bg-[#1a1a1a] rounded-t" :style="{ height: `${(p.count / maxPostsMonth) * 100}%` }"></div>
            <span class="text-[0.6rem] text-gray-500">{{ p.month }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 w-full">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-4 border-l-4 border-[#cc0000] pl-2">
          Post Status
        </h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-600">Published</span>
            <span class="text-sm font-bold text-green-700">{{ stats.published }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-600">Drafts</span>
            <span class="text-sm font-bold text-yellow-700">{{ stats.drafts }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-600">Hidden</span>
            <span class="text-sm font-bold text-gray-600">{{ stats.hidden }}</span>
          </div>
        </div>

        <NuxtLink
          to="/author-panel-9f3a7b/posts"
          class="mt-5 block text-center bg-[#e8e8e8] text-[#1a1a1a] py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#d0d0d0]"
        >
          Manage Posts
        </NuxtLink>
      </div>
    </section>

    <!-- ===== RECENT POSTS ===== -->
    <section class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 w-full">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] border-l-4 border-[#cc0000] pl-2">
          Recent Posts
        </h2>
        <NuxtLink
          to="/author-panel-9f3a7b/posts"
          class="text-xs font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
        >
          View All →
        </NuxtLink>
      </div>

      <div class="space-y-2">
        <div
          v-for="p in paginatedPosts"
          :key="p.slug"
          class="flex flex-wrap items-center gap-2 py-2 border-b border-gray-100 last:border-0"
        >
          <div class="flex-1 min-w-0">
            <NuxtLink
              :to="`/article/${p.slug}`"
              target="_blank"
              class="text-sm font-bold text-[#1a1a1a] hover:text-[#cc0000] break-words"
            >
              {{ p.title }}
            </NuxtLink>
            <div class="flex items-center gap-2 mt-0.5 text-[0.65rem] text-gray-500 flex-wrap">
              <span :class="postStatusBadge(p.status)" class="font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">{{ p.status }}</span>
              <span>·</span>
              <span>{{ p.date }}</span>
            </div>
          </div>
          <div class="flex items-center gap-1 text-xs text-gray-500 shrink-0">
            <Icon icon="fa6-solid:eye" class="text-[0.65rem]" />
            {{ p.views }}
          </div>
        </div>
      </div>

      <div v-if="postsTotalPages > 1" class="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-gray-100">
        <button
          class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          :disabled="postsPage === 1"
          @click="postsPage--"
        >Prev</button>
        <span class="text-xs text-gray-600">Page {{ postsPage }} of {{ postsTotalPages }}</span>
        <button
          class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          :disabled="postsPage === postsTotalPages"
          @click="postsPage++"
        >Next</button>
      </div>
    </section>
  </div>
</template>