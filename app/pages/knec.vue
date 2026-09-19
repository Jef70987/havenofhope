<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { share } = useShare()

const news = [
  {
    title: 'KNEC Releases 2026 KCSE Examination Timetable',
    slug: 'knec-releases-2026-kcse-timetable',
    image: '/images/knec-timetable.jpg',
    category: 'KNEC',
    author: 'Mwalimu Malata Benson',
    date: '8th September 2026',
    excerpt:
      'The Kenya National Examinations Council has released the official timetable for the 2026 KCSE examinations, with candidates expected to sit for their papers beginning November.',
  },
  {
    title: 'KNEC Announces New Guidelines for KCSE Registration',
    slug: 'knec-new-kcse-registration-guidelines',
    image: '/images/knec-registration.jpg',
    category: 'KNEC',
    author: 'Mwalimu Malata Benson',
    date: '2nd September 2026',
    excerpt:
      'New registration guidelines for the 2026 KCSE cohort have been released, tightening rules on late entries and index number issuance.',
  },
  {
    title: 'KNEC Opens Portal for 2026 KCSE Candidate Registration',
    slug: 'knec-opens-2026-kcse-portal',
    image: '/images/knec-portal.jpg',
    category: 'KNEC',
    author: 'Mwalimu Malata Benson',
    date: '28th August 2026',
    excerpt:
      'The Council has officially opened its online portal for 2026 KCSE candidate registration. Schools have until the end of October to submit entries.',
  },
  {
    title: 'KNEC to Digitise Marking of KCSE Examinations in 2027',
    slug: 'knec-digitise-kcse-marking',
    image: '/images/knec-digitisation.jpg',
    category: 'KNEC',
    author: 'Mwalimu Malata Benson',
    date: '24th August 2026',
    excerpt:
      'The Kenya National Examinations Council plans to digitise KCSE marking in 2027, moving away from manual scripts to electronic marking.',
  },
  {
    title: 'KCSE 2025 Results Analysis: Subject Performance Breakdown',
    slug: 'kcse-2025-results-analysis',
    image: '/images/kcse-analysis.jpg',
    category: 'KNEC',
    author: 'Mwalimu Malata Benson',
    date: '20th August 2026',
    excerpt:
      'A detailed breakdown of how candidates performed in each subject in the 2025 KCSE examinations, according to KNEC\u2019s official report.',
  },
  {
    title: 'KNEC Warns Against Examination Malpractice Ahead of 2026 Exams',
    slug: 'knec-warns-exam-malpractice',
    image: '/images/knec-malpractice-warning.jpg',
    category: 'KNEC',
    author: 'Mwalimu Malata Benson',
    date: '16th August 2026',
    excerpt:
      'The Council has issued a stern warning against examination malpractice, outlining new measures to curb cheating in the 2026 KCSE exams.',
  },
]

const ITEMS_PER_BATCH = 6
const visibleCount = ref(ITEMS_PER_BATCH)
const visibleNews = computed(() => news.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < news.length)
const handleSeeMore = () => {
  visibleCount.value = Math.min(visibleCount.value + ITEMS_PER_BATCH, news.length)
}
</script>

<template>
  <div>
    <!-- BREADCRUMB -->
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="ml-1 hover:text-[#cc0000]">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">KNEC</span>
    </div>

    <!-- PAGE TITLE -->
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
        KNEC Updates
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        Latest from the Kenya National Examinations Council
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
        You've reached the end — {{ news.length }} stories loaded
      </p>
    </div>
  </div>
</template>
