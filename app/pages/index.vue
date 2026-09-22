<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { share } = useShare()

interface Post {
  id: string
  title: string
  slug: string
  subtitle: string | null
  category: string
  category_path: string
  image: string | null
  author: string | null
  date: string | null
  read_time: string | null
  body: any[]
  views: number
  created_at: string
  published_at: string | null
}

const { data, pending: loading } = await useFetch<{ ok: boolean; posts: Post[] }>('/api/posts', {
  key: 'posts:home',
  default: () => ({ ok: true, posts: [] }),
})

const posts = computed(() => data.value?.posts || [])

// Helper: first paragraph as excerpt
const excerptOf = (p: Post) => {
  const firstP = (p.body || []).find((b: any) => b.type === 'p')
  return firstP?.text?.slice(0, 180) || p.subtitle || ''
}

const dateOf = (p: Post) => {
  if (p.date) return p.date
  if (!p.published_at && !p.created_at) return ''
  return new Date(p.published_at || p.created_at).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// ===== Home feed: latest from each category, then fill with the rest =====
const CATEGORIES_ORDER = [
  'TSC',
  'Schools',
  'Workshops',
  'Educational News',
  'KNEC',
  'Leadership',
  'Politics',
  'Social',
]

const homeFeed = computed(() => {
  // Take the newest post from each category first
  const picked = new Map<string, Post>()
  for (const p of posts.value) {
    if (!picked.has(p.category)) picked.set(p.category, p)
  }
  // Order the picks by the standard category order
  const ordered: Post[] = []
  for (const cat of CATEGORIES_ORDER) {
    const p = picked.get(cat)
    if (p) ordered.push(p)
  }
  // Then append the remaining posts (that weren't already picked) sorted by date
  const pickedIds = new Set(ordered.map((p) => p.id))
  const rest = posts.value.filter((p) => !pickedIds.has(p.id))
  return [...ordered, ...rest]
})

const featured = computed(() => homeFeed.value[0] || null)
const rest = computed(() => homeFeed.value.slice(1))

const ITEMS_PER_BATCH = 8
const visibleCount = ref(ITEMS_PER_BATCH)

watch(rest, () => { visibleCount.value = ITEMS_PER_BATCH })

const visibleNews = computed(() => rest.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < rest.value.length)

const handleSeeMore = () => {
  visibleCount.value = Math.min(visibleCount.value + ITEMS_PER_BATCH, rest.value.length)
}
</script>

<template>
  <!-- Breadcrumb -->
  <div class="text-xs text-gray-500 mb-4">
    <span>You are here:</span>
    <span class="font-semibold text-gray-700 ml-1">Home</span>
  </div>

  <!-- Page title -->
  <div class="mb-6">
    <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
      Latest Updates
    </h2>
    <p class="text-sm text-gray-600 mt-1">
      The latest on TSC, schools, KNEC, workshops, leadership, politics and social issues across Kenya
    </p>
  </div>

  <!-- Loading -->
  <div v-if="loading" class="text-center py-12">
    <p class="text-sm text-gray-500">Loading posts…</p>
  </div>

  <!-- No posts yet -->
  <div v-else-if="!featured" class="text-center py-12 border border-dashed border-gray-200 rounded-lg">
    <p class="text-sm text-gray-500">No posts published yet.</p>
  </div>

  <!-- Content -->
  <template v-else>
    <!-- Featured -->
    <div class="rounded-lg overflow-hidden border border-[#e8e8e8] hover:border-[#cc0000] transition-colors mb-6">
      <NuxtLink :to="`/article/${featured.slug}`" class="block">
        <img
          v-if="featured.image"
          :src="featured.image"
          :alt="featured.title"
          class="w-full h-52 md:h-64 object-cover bg-[#f0f0f0]"
        />
        <div v-else class="w-full h-52 md:h-64 bg-[#f0f0f0] flex items-center justify-center text-gray-400 text-sm font-semibold">
          IMAGE
        </div>
      </NuxtLink>

      <div class="p-5 md:p-6">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <NuxtLink
              :to="featured.category_path"
              class="inline-block bg-[#cc0000] text-white text-[0.6rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded"
            >
              {{ featured.category }}
            </NuxtLink>
            <span class="text-[0.65rem] text-gray-500 uppercase tracking-wider">Editor's Pick</span>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="text-[#cc0000] hover:opacity-70"
              title="Share"
              @click="share(featured.title, `/article/${featured.slug}`)"
            >
              <Icon icon="fa6-solid:share-nodes" />
            </button>
            <NuxtLink
              :to="featured.category_path"
              class="text-[0.65rem] font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
            >
              View All →
            </NuxtLink>
          </div>
        </div>

        <NuxtLink :to="`/article/${featured.slug}`" class="block">
          <h3 class="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-snug mb-2 hover:text-[#cc0000] transition-colors">
            {{ featured.title }}
          </h3>
        </NuxtLink>

        <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
          <span>By {{ featured.author }}</span>
          <span>·</span>
          <span>{{ dateOf(featured) }}</span>
          <span>·</span>
          <NuxtLink to="/about" class="font-semibold text-[#cc0000] hover:underline">View Author</NuxtLink>
        </div>

        <p class="text-sm text-gray-600 leading-relaxed mb-4">{{ excerptOf(featured) }}</p>

        <NuxtLink
          :to="`/article/${featured.slug}`"
          class="text-xs font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
        >
          Read More
        </NuxtLink>
      </div>
    </div>

    <!-- News list -->
    <div v-if="visibleNews.length" class="flex flex-col gap-6">
      <div
        v-for="item in visibleNews"
        :key="item.id"
        class="rounded-lg overflow-hidden border border-[#e8e8e8] hover:border-[#cc0000] transition-colors"
      >
        <NuxtLink :to="`/article/${item.slug}`" class="block">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="w-full h-40 object-cover bg-[#f0f0f0]"
          />
          <div v-else class="w-full h-40 bg-[#f0f0f0] flex items-center justify-center text-gray-400 text-xs font-semibold">
            IMAGE
          </div>
        </NuxtLink>

        <div class="p-4 md:p-5">
          <div class="flex items-center justify-between mb-2">
            <NuxtLink
              :to="item.category_path"
              class="inline-block bg-[#cc0000] text-white text-[0.6rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded"
            >
              {{ item.category }}
            </NuxtLink>
            <div class="flex items-center gap-3">
              <button
                class="text-[#cc0000] hover:opacity-70"
                title="Share"
                @click="share(item.title, `/article/${item.slug}`)"
              >
                <Icon icon="fa6-solid:share-nodes" />
              </button>
              <NuxtLink
                :to="item.category_path"
                class="text-[0.6rem] font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
              >
                View All →
              </NuxtLink>
            </div>
          </div>

          <NuxtLink :to="`/article/${item.slug}`" class="block">
            <h3 class="text-lg md:text-xl font-bold text-[#1a1a1a] leading-snug mb-2 hover:text-[#cc0000] transition-colors">
              {{ item.title }}
            </h3>
          </NuxtLink>

          <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
            <span>By {{ item.author }}</span>
            <span>·</span>
            <span>{{ dateOf(item) }}</span>
            <span>·</span>
            <NuxtLink to="/about" class="font-semibold text-[#cc0000] hover:underline">View Author</NuxtLink>
          </div>

          <p class="text-sm text-gray-600 leading-relaxed mb-4">{{ excerptOf(item) }}</p>

          <NuxtLink
            :to="`/article/${item.slug}`"
            class="text-xs font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
          >
            Read More
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- See More -->
    <div class="text-center mt-8">
      <button
        v-if="hasMore"
        class="inline-block border-2 border-[#cc0000] text-[#cc0000] px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#cc0000] hover:text-white transition-colors rounded"
        @click="handleSeeMore"
      >
        See More
      </button>
      <p v-else-if="rest.length" class="text-xs text-gray-500">
        You've reached the end — {{ rest.length }} more stories loaded
      </p>
    </div>
  </template>

  <!-- Get In Touch -->
  <div class="mt-10 p-5 md:p-6 rounded-lg bg-[#f8f8f8] border-l-4 border-[#cc0000] text-center">
    <h3 class="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2">Get In Touch</h3>
    <p class="text-sm text-gray-600 mb-4">
      Have a story, a tip or a question? Reach out to Mwalimu Malata Benson.
    </p>
    <NuxtLink
      to="/about"
      class="inline-block bg-[#cc0000] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#990000] transition-colors rounded"
    >
      Contact / About Author
    </NuxtLink>
  </div>
</template>