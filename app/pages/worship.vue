<script setup lang="ts">
import { Icon } from '@iconify/vue'

useHead({ title: 'Worship · Haven of Hope' })

interface WorshipPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  author: string
  date: string
  duration: string
  song: string
}

const posts: WorshipPost[] = [
  { id: '1', title: 'Worship Moment · Still', slug: 'worship-moment-still', excerpt: 'A quiet moment to sit with. Close your eyes and let these words wash over your soul.', image: 'https://images.unsplash.com/photo-1445445290350-18a1b6f0e0b3?w=1200&q=80', author: 'Haven of Hope', date: '5 days ago', duration: '5 min listen', song: 'Still — Hillsong' },
  { id: '2', title: 'Worship Moment · Way Maker', slug: 'worship-moment-way-maker', excerpt: 'A song of trust for the road ahead. He is working, even now.', image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1200&q=80', author: 'Haven of Hope', date: '1 week ago', duration: '6 min listen', song: 'Way Maker — Sinach' },
  { id: '3', title: 'Worship Moment · Goodness of God', slug: 'worship-moment-goodness', excerpt: 'All my life You have been faithful. A song of gratitude.', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80', author: 'Haven of Hope', date: '2 weeks ago', duration: '4 min listen', song: 'Goodness of God — Bethel' },
  { id: '4', title: 'Worship Moment · Gratitude', slug: 'worship-moment-gratitude', excerpt: 'So many reasons to give thanks. Let this be your moment.', image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80', author: 'Haven of Hope', date: '3 weeks ago', duration: '5 min listen', song: 'Gratitude — Brandon Lake' },
  { id: '5', title: 'Worship Moment · Peace Be Still', slug: 'worship-moment-peace-be-still', excerpt: 'For the anxious heart. A song that speaks to the storm.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80', author: 'Haven of Hope', date: '1 month ago', duration: '6 min listen', song: 'Peace Be Still — Hope Darst' },
  { id: '6', title: 'Worship Moment · Great Are You Lord', slug: 'worship-moment-great-are-you', excerpt: 'A song of praise for the greatness of God.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', author: 'Haven of Hope', date: '1 month ago', duration: '5 min listen', song: 'Great Are You Lord — All Sons' },
]
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">

    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="hover:text-[#8b5e34] ml-1">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">Worship</span>
    </div>

    <!-- NOW PLAYING STRIP -->
    <div class="rounded-xl bg-gradient-to-br from-[#8b5e34] to-[#6f4a29] text-white p-4 md:p-6 mb-6 md:mb-8 flex items-center gap-4">
      <div class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
        <Icon icon="fa6-solid:music" class="text-xl md:text-2xl text-[#f5e6c8]" />
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-[#f5e6c8] mb-0.5">
          Now Playing
        </p>
        <p class="font-bold text-sm md:text-base truncate">Pray for Me — Zendaya Scott</p>
      </div>
      <Icon icon="fa6-solid:volume-high" class="text-xl md:text-2xl text-white/70" />
    </div>

    <div class="mb-6 md:mb-8">
      <span class="inline-block bg-[#6f4a29] text-white text-[0.65rem] md:text-xs font-bold px-3 py-1 uppercase tracking-wider mb-2 rounded">
        Worship
      </span>
      <h1 class="text-2xl md:text-4xl font-bold text-[#1f2937] leading-tight">
        Quiet moments of worship
      </h1>
      <p class="text-sm md:text-base text-gray-600 mt-2 max-w-2xl italic">
        Selected worship songs paired with Scripture and short reflections. Listen, rest, and let your heart be still.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <NuxtLink
        v-for="p in posts"
        :key="p.id"
        :to="`/article/${p.slug}`"
        class="group bg-white border border-[#e8e2d5] rounded-xl overflow-hidden hover:border-[#8b5e34] hover:shadow-md transition-all flex flex-col"
      >
        <div class="relative">
          <img :src="p.image" :alt="p.title" class="w-full h-44 md:h-48 object-cover" />
          <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="w-12 h-12 rounded-full bg-[#8b5e34] flex items-center justify-center">
              <Icon icon="fa6-solid:play" class="text-white ml-0.5" />
            </div>
          </div>
          <span class="absolute bottom-3 right-3 text-[0.6rem] md:text-[0.65rem] font-bold px-2 py-1 rounded bg-black/80 text-white">
            {{ p.duration }}
          </span>
        </div>
        <div class="p-4 md:p-5 flex flex-col flex-1">
          <h3 class="text-base md:text-lg font-bold text-[#1f2937] leading-snug mb-2 group-hover:text-[#8b5e34] transition-colors">
            {{ p.title }}
          </h3>
          <p class="text-sm text-gray-600 leading-relaxed mb-3 flex-1 italic">
            {{ p.excerpt }}
          </p>
          <div class="flex items-center gap-2 text-[0.7rem] md:text-xs text-gray-500 pt-3 border-t border-[#f0e9dc]">
            <Icon icon="fa6-solid:music" class="text-[#8b5e34]" />
            <span class="font-semibold text-[#1f2937] truncate">{{ p.song }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>

  </div>
</template>
