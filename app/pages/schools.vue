<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { share } = useShare()

const schoolsNews = [
  {
    title: 'Musingu Boys Posts Best KCSE Results in School History',
    slug: 'musingu-boys-best-kcse-results',
    image: '/images/musingu-results.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '9th September 2026',
    excerpt:
      'Musingu Boys High School has recorded a mean score of 8.95 in the 2025 KCSE examinations, its best performance yet, surpassing its long-time rival Sacred Heart Mukumu Girls in the Kiswahili mean score for the first time in over a decade.',
  },
  {
    title: 'How Boarding Life Shapes Discipline in Kenyan Schools',
    slug: 'boarding-life-shapes-discipline',
    image: '/images/boarding-life.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '4th September 2026',
    excerpt:
      'A deep dive into the role of boarding masters and matrons in shaping discipline, mentorship and academic performance in Kenyan secondary schools.',
  },
  {
    title: 'St. Peter\u2019s Boys Mumias Retains Kiswahili Record at 10.3',
    slug: 'st-peters-mumias-kiswahili-record',
    image: '/images/st-peters-record.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '1st September 2026',
    excerpt:
      'The 2015 KCSE Kiswahili mean score of 10.3 at St. Peter\u2019s Boys High School Mumias remains unbroken a decade later \u2014 a record that continues to define the school\u2019s academic identity.',
  },
  {
    title: 'Bulimbo Girls: Where Kiswahili Became a Brand',
    slug: 'bulimbo-girls-kiswahili-brand',
    image: '/images/bulimbo-girls.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '29th August 2026',
    excerpt:
      'A look back at how Mary Seat of Wisdom Bulimbo Girls, formerly St. James Bulimbo Girls, built a Kiswahili brand that achieved a KCSE mean of 8.4.',
  },
  {
    title: 'Ngozi Girls: Excellence at the Kenya-Tanzania Border',
    slug: 'ngozi-girls-excellence-border',
    image: '/images/ngozi-girls.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '27th August 2026',
    excerpt:
      'How a small girls\u2019 school in Lungalunga rose to become a consistent performer despite its remote location on the Kenya-Tanzania border.',
  },
  {
    title: 'Sheikh Ali Boys Mandera: Rising Against All Odds',
    slug: 'sheikh-ali-boys-mandera',
    image: '/images/sheikh-ali-boys.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '25th August 2026',
    excerpt:
      'A profile of Sheikh Ali Boys High School in Mandera \u2014 its journey, its teachers and its resilience in one of Kenya\u2019s most challenging regions.',
  },
  {
    title: 'Sacred Heart Mukumu Girls: The Long-Standing Kiswahili Powerhouse',
    slug: 'sacred-heart-mukumu-girls-profile',
    image: '/images/mukumu-girls.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '23rd August 2026',
    excerpt:
      'For years, Sacred Heart Mukumu Girls set the standard in Kiswahili at KCSE. This is the story behind their dominance and what 2025 means for them.',
  },
  {
    title: 'How Schools Are Embracing Digital Learning in 2026',
    slug: 'schools-digital-learning-2026',
    image: '/images/digital-learning-schools.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '21st August 2026',
    excerpt:
      'A growing number of Kenyan secondary schools are integrating digital tools into their teaching, changing the way learners engage with the curriculum.',
  },
  {
    title: 'Inside Kenya\u2019s Top Boarding Schools: What Makes Them Work',
    slug: 'inside-kenya-top-boarding-schools',
    image: '/images/boarding-schools-inside.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '18th August 2026',
    excerpt:
      'From discipline to mentorship, a look at what sets Kenya\u2019s most successful boarding schools apart from the rest.',
  },
  {
    title: 'The Role of Principals in Transforming School Performance',
    slug: 'principals-transform-school-performance',
    image: '/images/principals-transformation.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '16th August 2026',
    excerpt:
      'Effective principals are the difference between a struggling school and a thriving one. Here is what strong leadership looks like in practice.',
  },
  {
    title: 'How Schools Can Support Learners with Special Needs',
    slug: 'schools-support-special-needs',
    image: '/images/special-needs.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '14th August 2026',
    excerpt:
      'A practical guide for Kenyan schools on how to create inclusive learning environments for learners with special needs.',
  },
  {
    title: 'KCSE 2025: Full Ranking of Top Performing Schools',
    slug: 'kcse-2025-top-performing-schools',
    image: '/images/kcse-rankings-2025.jpg',
    category: 'Schools',
    author: 'Mwalimu Malata Benson',
    date: '12th August 2026',
    excerpt:
      'A breakdown of the top performing schools in the 2025 KCSE examinations across all subjects and regions of Kenya.',
  },
]

const ITEMS_PER_BATCH = 6
const visibleCount = ref(ITEMS_PER_BATCH)
const visibleNews = computed(() => schoolsNews.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < schoolsNews.length)
const handleSeeMore = () => {
  visibleCount.value = Math.min(visibleCount.value + ITEMS_PER_BATCH, schoolsNews.length)
}
</script>

<template>
  <div>
    <!-- BREADCRUMB -->
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="ml-1 hover:text-[#cc0000]">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">Schools</span>
    </div>

    <!-- PAGE TITLE -->
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
        Schools
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        News, profiles and updates from schools across Kenya
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
        You've reached the end — {{ schoolsNews.length }} stories loaded
      </p>
    </div>
  </div>
</template>
