<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { share } = useShare()

const news = [
  {
    title: 'KUPPET Threatens Countywide Strike Over TSC Principal Intimidation',
    slug: 'kuppet-threatens-countywide-strike',
    image: '/images/kuppet-strike.jpg',
    category: 'Politics',
    author: 'Mwalimu Malata Benson',
    date: '9th September 2026',
    excerpt:
      'KUPPET Nyamira County branch has accused a section of Catholic clergy and the BOM of intimidating a newly deployed principal at St. Peter\u2019s Nyakemincha Senior School.',
  },
  {
    title: 'Government Increases Funding for Teacher Promotions to Sh2 Billion',
    slug: 'government-increases-promotion-funding',
    image: '/images/promotion-funding.jpg',
    category: 'Politics',
    author: 'Mwalimu Malata Benson',
    date: '5th September 2026',
    excerpt:
      'President William Ruto has announced an increase in the annual allocation for teacher promotions from Sh1 billion to Sh2 billion to facilitate career progression.',
  },
  {
    title: 'Parliament Committee Summons TSC Over Teacher Promotion Backlog',
    slug: 'parliament-summons-tsc-promotion-backlog',
    image: '/images/parliament-tsc.jpg',
    category: 'Politics',
    author: 'Mwalimu Malata Benson',
    date: '1st September 2026',
    excerpt:
      'A Parliamentary committee has summoned the Teachers Service Commission to explain the persistent backlog in teacher promotions affecting over 170,000 educators.',
  },
  {
    title: 'KNUT Calls for Review of Teacher Medical Cover Amid Complaints',
    slug: 'knut-review-medical-cover',
    image: '/images/knut-medical.jpg',
    category: 'Politics',
    author: 'Mwalimu Malata Benson',
    date: '28th August 2026',
    excerpt:
      'The Kenya National Union of Teachers has called for a review of the current teacher medical cover following rising complaints from members.',
  },
  {
    title: 'Education CS Announces KSh 5 Billion Boost for School Infrastructure',
    slug: 'education-cs-infrastructure-boost',
    image: '/images/infrastructure-boost.jpg',
    category: 'Politics',
    author: 'Mwalimu Malata Benson',
    date: '24th August 2026',
    excerpt:
      'The Cabinet Secretary for Education has announced a KSh 5 billion boost aimed at upgrading infrastructure in public schools across the country.',
  },
  {
    title: 'County Governments Urged to Invest More in ECDE Teachers',
    slug: 'counties-invest-ecde-teachers',
    image: '/images/ecde-investment.jpg',
    category: 'Politics',
    author: 'Mwalimu Malata Benson',
    date: '20th August 2026',
    excerpt:
      'Education stakeholders are urging county governments to increase investment in ECDE teachers, citing poor pay and working conditions.',
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
      <span class="font-semibold text-gray-700">Politics</span>
    </div>

    <!-- PAGE TITLE -->
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
        Politics
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        Political developments affecting teachers and education in Kenya
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
