<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { share } = useShare()

const tscNews = [
  {
    title: 'TSC Re-Advertises 1,631 Promotion Jobs for Teachers',
    slug: 'tsc-re-advertises-1631-promotion-jobs',
    image: '/images/tsc-promotion-jobs.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '9th September 2026',
    excerpt:
      'The Teachers Service Commission has re-advertised 1,631 promotional vacancies for serving teachers seeking appointment to school administrative positions in public primary and secondary schools.',
  },
  {
    title: 'TSC Inducts 136 Newly Recruited Secretariat Staff',
    slug: 'tsc-inducts-136-new-staff',
    image: '/images/tsc-induction.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '7th September 2026',
    excerpt:
      'The Teachers Service Commission has commenced a week-long induction programme for 136 newly recruited secretariat staff in collaboration with the Kenya School of Government.',
  },
  {
    title: 'TSC Profile Update Online: Requirements and Steps',
    slug: 'tsc-profile-update-online-guide',
    image: '/images/tsc-profile-update.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '4th September 2026',
    excerpt:
      'If you are a registered teacher and need to correct or refresh your details with the Teachers Service Commission, you can now do it entirely online without visiting a TSC office.',
  },
  {
    title: 'TSC Payslip Registration: How to Activate and Use T-Pay in 2026',
    slug: 'tsc-payslip-registration-guide',
    image: '/images/tsc-payslip.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '3rd September 2026',
    excerpt:
      'Getting a TSC number and getting access to your online payslip are two different processes. This guide covers how to activate your T-Pay account and download your payslip.',
  },
  {
    title: 'How to Apply for TSC Sick Leave: HRMIS Process and Requirements',
    slug: 'tsc-sick-leave-application-process',
    image: '/images/tsc-sick-leave.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '2nd September 2026',
    excerpt:
      'A teacher who falls ill and cannot report to duty must formally apply for sick leave with the Teachers Service Commission through the HRMIS Leave Module.',
  },
  {
    title: 'TSC Announces New Transfer Guidelines for Teachers',
    slug: 'tsc-new-transfer-guidelines',
    image: '/images/tsc-transfer.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '2nd September 2026',
    excerpt:
      'The Teachers Service Commission has released updated transfer guidelines for teachers, outlining the minimum tenure requirements and application procedure.',
  },
  {
    title: 'TSC Opens Portal for 2026 Intern Teacher Recruitment',
    slug: 'tsc-2026-intern-teacher-recruitment',
    image: '/images/tsc-intern-recruitment.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '1st September 2026',
    excerpt:
      'The Commission has opened its online portal for the 2026 intern teacher recruitment exercise, targeting thousands of trained teachers across the country.',
  },
  {
    title: 'TSC Issues New Directive on Teacher Performance Appraisal',
    slug: 'tsc-new-tpad-directive',
    image: '/images/tsc-tpad.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '30th August 2026',
    excerpt:
      'The Teachers Service Commission has issued updated guidelines on the Teacher Performance Appraisal and Development (TPAD) tool for the current academic year.',
  },
  {
    title: 'TSC Confirms December 2026 Salaries Will Reflect New CBA',
    slug: 'tsc-december-2026-cba-salaries',
    image: '/images/tsc-cba.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '28th August 2026',
    excerpt:
      'The Commission has confirmed that December 2026 salaries will reflect the second phase of the 2025-2029 Collective Bargaining Agreement for all teachers.',
  },
  {
    title: 'TSC Announces Dates for 2026 Teacher Registration Exams',
    slug: 'tsc-2026-registration-exams',
    image: '/images/tsc-exams.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '25th August 2026',
    excerpt:
      'The Commission has released the official dates for the 2026 teacher registration examinations, with candidates required to confirm their details on the portal.',
  },
  {
    title: 'TSC Responds to Concerns Over Delayed Promotions',
    slug: 'tsc-responds-delayed-promotions',
    image: '/images/tsc-promotions-response.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '22nd August 2026',
    excerpt:
      'The Teachers Service Commission has responded to concerns raised by teachers over delayed promotions, citing budget constraints and ongoing reforms.',
  },
  {
    title: 'TSC Directs All Schools to Submit Updated Staff Returns',
    slug: 'tsc-updated-staff-returns',
    image: '/images/tsc-staff-returns.jpg',
    category: 'TSC',
    author: 'Mwalimu Malata Benson',
    date: '20th August 2026',
    excerpt:
      'The Commission has directed all public schools to submit updated staff returns through the TMIS portal by the end of the month.',
  },
]

const ITEMS_PER_BATCH = 6
const visibleCount = ref(ITEMS_PER_BATCH)
const visibleNews = computed(() => tscNews.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < tscNews.length)
const handleSeeMore = () => {
  visibleCount.value = Math.min(visibleCount.value + ITEMS_PER_BATCH, tscNews.length)
}
</script>

<template>
  <div>
    <!-- BREADCRUMB -->
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="ml-1 hover:text-[#cc0000]">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">TSC</span>
    </div>

    <!-- PAGE TITLE -->
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
        TSC Updates
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        Latest news, guidelines and updates from the Teachers Service Commission
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
        You've reached the end — {{ tscNews.length }} stories loaded
      </p>
    </div>
  </div>
</template>
