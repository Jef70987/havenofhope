<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  categoryLabel: string     // e.g. 'TSC'
  pageTitle: string         // e.g. 'TSC Updates'
  pageSubtitle: string      // e.g. 'Latest news, guidelines and updates…'
  itemsPerBatch?: number
}>()

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
  body: any[]
  created_at: string
  published_at: string | null
}

const loading = ref(true)
const posts = ref<Post[]>([])

onMounted(async () => {
  try {
    const res = await $fetch<{ ok: boolean; posts: Post[] }>('/api/posts', {
      query: { category: props.categoryLabel },
    })
    posts.value = res.posts || []
  } catch {
    posts.value = []
  } finally {
    loading.value = false
  }
})

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

const perBatch = props.itemsPerBatch || 6
const visibleCount = ref(perBatch)

watch(posts, () => { visibleCount.value = perBatch })

const visibleNews = computed(() => posts.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < posts.value.length)

const handleSeeMore = () => {
  visibleCount.value = Math.min(visibleCount.value + perBatch, posts.value.length)
}
</script>

<template>
  <div>
    <!-- BREADCRUMB -->
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="ml-1 hover:text-[#cc0000]">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">{{ categoryLabel }}</span>
    </div>

    <!-- PAGE TITLE -->
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
        {{ pageTitle }}
      </h2>
      <p class="text-sm text-gray-600 mt-1">{{ pageSubtitle }}</p>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-sm text-gray-500">Loading posts…</p>
    </div>

    <!-- EMPTY -->
    <div v-else-if="!posts.length" class="text-center py-12 border border-dashed border-gray-200 rounded-lg">
      <p class="text-sm text-gray-500">No {{ categoryLabel }} posts yet.</p>
    </div>

    <!-- NEWS LIST -->
    <div v-else class="flex flex-col gap-6">
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
            <button
              class="text-[#cc0000] hover:opacity-70"
              title="Share"
              @click="share(item.title, `/article/${item.slug}`)"
            >
              <Icon icon="fa6-solid:share-nodes" />
            </button>
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

    <!-- SEE MORE -->
    <div v-if="!loading && posts.length" class="text-center mt-8">
      <button
        v-if="hasMore"
        class="inline-block border-2 border-[#cc0000] text-[#cc0000] px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#cc0000] hover:text-white transition-colors rounded"
        @click="handleSeeMore"
      >
        See More
      </button>
      <p v-else class="text-xs text-gray-500">
        You've reached the end — {{ posts.length }} stories loaded
      </p>
    </div>
  </div>
</template>
