<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { share } = useShare()

const news = [
  {
    title: 'Teachers Urged to Embrace Digital Literacy in the Classroom',
    slug: 'teachers-embrace-digital-literacy',
    image: '/images/digital-literacy.jpg',
    category: 'Social',
    author: 'Mwalimu Malata Benson',
    date: '8th September 2026',
    excerpt:
      'Education stakeholders have called on teachers to embrace digital literacy and integrate technology into their teaching to improve learning outcomes.',
  },
  {
    title: 'Careers Related to Social Studies in Kenya: A Practical Guide',
    slug: 'careers-related-to-social-studies-kenya',
    image: '/images/social-studies-careers.jpg',
    category: 'Social',
    author: 'Mwalimu Malata Benson',
    date: '6th September 2026',
    excerpt:
      'Social studies opens the door to some of Kenya\u2019s most stable and in-demand professions, from teaching and law to human resources, policy research and journalism.',
  },
  {
    title: 'Mental Health Awareness Among Kenyan Teachers',
    slug: 'mental-health-awareness-kenyan-teachers',
    image: '/images/mental-health.jpg',
    category: 'Social',
    author: 'Mwalimu Malata Benson',
    date: '1st September 2026',
    excerpt:
      'Teachers face unique pressures — workload, transfers, financial strain. This piece explores why mental health support for educators is now more urgent than ever.',
  },
  {
    title: 'The Impact of Social Media on Kenyan Students',
    slug: 'social-media-impact-students',
    image: '/images/social-media-students.jpg',
    category: 'Social',
    author: 'Mwalimu Malata Benson',
    date: '28th August 2026',
    excerpt:
      'A balanced look at how social media is shaping the behaviour, learning and mental health of Kenyan students in secondary schools.',
  },
  {
    title: 'Parental Involvement: A Key to Student Success',
    slug: 'parental-involvement-student-success',
    image: '/images/parental-involvement.jpg',
    category: 'Social',
    author: 'Mwalimu Malata Benson',
    date: '24th August 2026',
    excerpt:
      'Research shows that parental involvement is one of the strongest predictors of student success. Here is how Kenyan parents can do more.',
  },
  {
    title: 'Combating Drug Abuse in Kenyan Schools',
    slug: 'combating-drug-abuse-schools',
    image: '/images/drug-abuse.jpg',
    category: 'Social',
    author: 'Mwalimu Malata Benson',
    date: '20th August 2026',
    excerpt:
      'Schools across Kenya are stepping up efforts to combat drug and substance abuse among learners through awareness and counselling programmes.',
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
      <span class="font-semibold text-gray-700">Social</span>
    </div>

    <!-- PAGE TITLE -->
    <div class="mb-6">
      <h2 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] border-l-4 border-[#cc0000] pl-3">
        Social
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        Social issues affecting learners, teachers and schools in Kenya
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
