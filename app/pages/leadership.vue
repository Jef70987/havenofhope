<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { share } = useShare()

const news = [
  {
    title: 'Ministry of Education Rolls Out New Leadership Training for Principals',
    slug: 'ministry-rolls-out-leadership-training',
    image: '/images/leadership-training.jpg',
    category: 'Leadership',
    author: 'Mwalimu Malata Benson',
    date: '8th September 2026',
    excerpt:
      'The Ministry of Education has launched a nationwide leadership development programme targeting school principals and deputy principals in public secondary schools.',
  },
  {
    title: 'From Teacher to Mentor: The Journey of Mwalimu Malata Benson',
    slug: 'from-teacher-to-mentor-journey',
    image: '/images/teacher-mentor.jpg',
    category: 'Leadership',
    author: 'Mwalimu Malata Benson',
    date: '5th September 2026',
    excerpt:
      'Two decades of sacrifice, service and results. A look at the personal journey of one of Kenya\u2019s most recognised educators and what it means to serve the child.',
  },
  {
    title: 'The Role of Mentorship in Building the Next Generation of Teachers',
    slug: 'role-of-mentorship-next-generation-teachers',
    image: '/images/mentorship.jpg',
    category: 'Leadership',
    author: 'Mwalimu Malata Benson',
    date: '3rd September 2026',
    excerpt:
      'Why mentorship — not just training — is what transforms a teacher into a leader, and how schools across Kenya are embracing structured mentorship programmes.',
  },
  {
    title: 'What Makes an Effective Deputy Principal?',
    slug: 'what-makes-effective-deputy-principal',
    image: '/images/deputy-principal.jpg',
    category: 'Leadership',
    author: 'Mwalimu Malata Benson',
    date: '30th August 2026',
    excerpt:
      'A practical look at the qualities that distinguish a strong deputy principal — from discipline management to team coordination.',
  },
  {
    title: 'How School Principals Can Build a Culture of Accountability',
    slug: 'principals-culture-accountability',
    image: '/images/accountability-culture.jpg',
    category: 'Leadership',
    author: 'Mwalimu Malata Benson',
    date: '26th August 2026',
    excerpt:
      'Accountability starts at the top. This piece explores how effective principals build trust and discipline through consistent leadership.',
  },
  {
    title: 'Leadership Lessons from Kenya\u2019s Top Performing Schools',
    slug: 'leadership-lessons-top-schools',
    image: '/images/leadership-lessons.jpg',
    category: 'Leadership',
    author: 'Mwalimu Malata Benson',
    date: '22nd August 2026',
    excerpt:
      'What can other schools learn from Kenya\u2019s top performers? A breakdown of the leadership habits that drive academic success.',
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
      <span class="font-semibold text-gray-700">Leadership</span>
    </div>

    <!-- PAGE TITLE -->
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
        Leadership
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        Insight on school leadership, mentorship and management
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
