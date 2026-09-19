<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { share } = useShare()

const workshopsNews = [
  {
    title: 'Kiswahili Teachers Attend National Workshop in Nakuru',
    slug: 'kiswahili-teachers-workshop-nakuru',
    image: '/images/kiswahili-workshop.jpg',
    category: 'Workshops',
    author: 'Mwalimu Malata Benson',
    date: '9th September 2026',
    excerpt:
      'Over 400 Kiswahili teachers from across the country converged in Nakuru for a three-day workshop focused on improving performance in the subject at KCSE level.',
  },
  {
    title: 'Regional STEM Workshop Draws Teachers from Five Counties',
    slug: 'regional-stem-workshop',
    image: '/images/stem-workshop.jpg',
    category: 'Workshops',
    author: 'Mwalimu Malata Benson',
    date: '1st September 2026',
    excerpt:
      'Teachers from five counties attended a regional workshop focused on strengthening STEM teaching in junior secondary schools.',
  },
  {
    title: 'National Leadership Workshop for Principals Held in Nairobi',
    slug: 'national-leadership-workshop-principals',
    image: '/images/principals-workshop.jpg',
    category: 'Workshops',
    author: 'Mwalimu Malata Benson',
    date: '28th August 2026',
    excerpt:
      'Principals from across Kenya attended a two-day leadership workshop in Nairobi focused on school management and academic performance.',
  },
  {
    title: 'Teachers Trained on CBC Assessment in Mombasa Workshop',
    slug: 'cbc-assessment-workshop-mombasa',
    image: '/images/cbc-workshop.jpg',
    category: 'Workshops',
    author: 'Mwalimu Malata Benson',
    date: '24th August 2026',
    excerpt:
      'A three-day workshop in Mombasa trained teachers on competency-based assessment techniques and learner evaluation methods.',
  },
  {
    title: 'Guidance and Counselling Workshop Held for School Chaplains',
    slug: 'guidance-counselling-workshop-chaplains',
    image: '/images/counselling-workshop.jpg',
    category: 'Workshops',
    author: 'Mwalimu Malata Benson',
    date: '20th August 2026',
    excerpt:
      'School chaplains and counselling teachers attended a workshop focused on mental health support and student wellness in secondary schools.',
  },
  {
    title: 'ICT Integration Workshop for Teachers in Kisumu',
    slug: 'ict-integration-workshop-kisumu',
    image: '/images/ict-workshop.jpg',
    category: 'Workshops',
    author: 'Mwalimu Malata Benson',
    date: '16th August 2026',
    excerpt:
      'Teachers in Kisumu attended a digital literacy workshop aimed at integrating ICT tools into classroom teaching.',
  },
]

const ITEMS_PER_BATCH = 6
const visibleCount = ref(ITEMS_PER_BATCH)
const visibleNews = computed(() => workshopsNews.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < workshopsNews.length)
const handleSeeMore = () => {
  visibleCount.value = Math.min(visibleCount.value + ITEMS_PER_BATCH, workshopsNews.length)
}
</script>

<template>
  <div>
    <!-- BREADCRUMB -->
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="ml-1 hover:text-[#cc0000]">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">Workshops</span>
    </div>

    <!-- PAGE TITLE -->
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
        Workshops
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        Training, seminars and workshops for teachers across Kenya
      </p>
    </div>

    <!-- NEWS LIST -->
    <div class="flex flex-col gap-6">
      <div
        v-for="item in visibleNews"
        :key="item.slug"
        class="rounded-lg overflow-hidden border border-[#e8e8e8] hover:border-[#cc0000] transition-colors"
      >
        <NuxtLink :to="`/article/${item.slug}`" class="block">
          <img :src="item.image" :alt="item.title" class="w-full h-40 object-cover bg-[#f0f0f0]" />
        </NuxtLink>

        <div class="p-4 md:p-5">
          <div class="flex items-center justify-between mb-2">
            <span class="inline-block bg-[#cc0000] text-white text-[0.6rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded">
              {{ item.category }}
            </span>
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
            <span>{{ item.date }}</span>
            <span>·</span>
            <NuxtLink to="/about" class="font-semibold text-[#cc0000] hover:underline">
              View Author
            </NuxtLink>
          </div>

          <p class="text-sm text-gray-600 leading-relaxed mb-4">{{ item.excerpt }}</p>

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
    <div class="text-center mt-8">
      <button
        v-if="hasMore"
        class="inline-block border-2 border-[#cc0000] text-[#cc0000] px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#cc0000] hover:text-white transition-colors rounded"
        @click="handleSeeMore"
      >
        See More
      </button>
      <p v-else class="text-xs text-gray-500">
        You've reached the end — {{ workshopsNews.length }} stories loaded
      </p>
    </div>
  </div>
</template>
