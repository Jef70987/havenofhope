<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { share } = useShare()

const news = [
  {
    title: 'Mwalimu Comprehensive Medical Cover: What Teachers Get Under SHA',
    slug: 'mwalimu-comprehensive-medical-cover',
    image: '/images/mwalimu-medical.jpg',
    category: 'Educational News',
    author: 'Mwalimu Malata Benson',
    date: '7th September 2026',
    excerpt:
      'Every TSC-employed teacher in Kenya is now covered under the Mwalimu Comprehensive Medical Cover, run by the Social Health Authority through POMSF.',
  },
  {
    title: 'TVET Tutors Issue 21-Day Ultimatum, Threaten Strike',
    slug: 'tvet-tutors-21-day-ultimatum',
    image: '/images/tvet-tutors.jpg',
    category: 'Educational News',
    author: 'Mwalimu Malata Benson',
    date: '6th September 2026',
    excerpt:
      'Technical and Vocational Education and Training tutors have issued the Ministry of Education a 21-day ultimatum over curriculum changes, assessments, medical cover and transfers.',
  },
  {
    title: 'The Future of CBC in Kenyan Secondary Schools',
    slug: 'future-of-cbc-kenyan-secondary-schools',
    image: '/images/cbc-future.jpg',
    category: 'Educational News',
    author: 'Mwalimu Malata Benson',
    date: '1st September 2026',
    excerpt:
      'As the Competency-Based Curriculum continues to roll out across Kenya, stakeholders weigh in on the opportunities, challenges and what the future holds for learners.',
  },
  {
    title: 'Education Ministry Announces New School Calendar for 2027',
    slug: 'education-ministry-2027-calendar',
    image: '/images/school-calendar.jpg',
    category: 'Educational News',
    author: 'Mwalimu Malata Benson',
    date: '30th August 2026',
    excerpt:
      'The Ministry of Education has released the school calendar for 2027, outlining term dates, holidays and national examination periods.',
  },
  {
    title: 'Government to Roll Out Free Wi-Fi in Public Schools',
    slug: 'free-wifi-public-schools',
    image: '/images/wifi-schools.jpg',
    category: 'Educational News',
    author: 'Mwalimu Malata Benson',
    date: '26th August 2026',
    excerpt:
      'A government initiative to provide free Wi-Fi in public secondary schools has kicked off, starting with 500 schools in urban areas.',
  },
  {
    title: 'New Education Reforms Target Improved Learning Outcomes',
    slug: 'new-education-reforms-target',
    image: '/images/education-reforms.jpg',
    category: 'Educational News',
    author: 'Mwalimu Malata Benson',
    date: '22nd August 2026',
    excerpt:
      'The Ministry of Education has unveiled a fresh round of reforms aimed at improving literacy, numeracy and critical thinking in Kenyan schools.',
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
      <span class="font-semibold text-gray-700">Educational News</span>
    </div>

    <!-- PAGE TITLE -->
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
        Educational News
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        Policy, reforms and general news from the education sector
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
