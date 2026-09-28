<script setup lang="ts">
import { Icon } from '@iconify/vue'

useHead({ title: 'Community · Haven of Hope' })

interface Testimony {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
}

const testimonies: Testimony[] = [
  { id: '1', title: 'I Was Addicted for 7 Years. Then God Stepped In.', slug: 'addicted-seven-years-testimony', excerpt: 'I do not share this for sympathy. I share it because someone reading this needs to know that no darkness is too deep for His light.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80', author: 'Anonymous', date: '2 days ago', readTime: '6 min read' },
  { id: '2', title: 'The Prayer That Changed My Life', slug: 'prayer-changed-my-life', excerpt: 'I had prayed the same prayer for years with no answer. Then one night I prayed differently — and everything shifted.', image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80', author: 'Anonymous', date: '6 days ago', readTime: '5 min read' },
  { id: '3', title: 'He Found Me in the Darkest Room of My Life', slug: 'he-found-me-darkest-room', excerpt: 'I was not looking for God. I was just trying to survive the night. But He was already there.', image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1200&q=80', author: 'Anonymous', date: '1 week ago', readTime: '5 min read' },
  { id: '4', title: 'I Forgave the Person Who Hurt Me Most', slug: 'i-finally-forgave', excerpt: 'Forgiveness did not mean what they did was okay. It meant I was no longer going to let it hold me captive.', image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80', author: 'Anonymous', date: '2 weeks ago', readTime: '6 min read' },
  { id: '5', title: 'I Lost Everything. Then I Found Him.', slug: 'lost-everything-found-him', excerpt: 'I lost my job, my marriage, and my hope. And in that emptiness, God met me.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', author: 'Anonymous', date: '3 weeks ago', readTime: '7 min read' },
  { id: '6', title: 'From Depression to a New Morning', slug: 'from-depression-new-morning', excerpt: 'I did not believe I would see a better day. But God is patient with the broken.', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80', author: 'Anonymous', date: '1 month ago', readTime: '6 min read' },
]

const comments = [
  { name: 'Hopeful Soul', text: 'This prayer brought me to tears. I needed this today.', post: 'A Prayer for Peace in a Restless Heart' },
  { name: 'Child of God', text: 'Reading this scripture every morning has changed the way I start my day.', post: 'His Mercy Is New Every Morning' },
  { name: 'Faithful Heart', text: 'I felt alone for weeks. This reminded me I am never truly alone.', post: 'When You Feel Like Giving Up' },
  { name: 'Redeemed', text: 'I read this testimony three times. Thank you for being brave enough to share.', post: 'I Was Addicted for 7 Years' },
]
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">

    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="hover:text-[#8b5e34] ml-1">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">Community</span>
    </div>

    <div class="mb-6 md:mb-8">
      <span class="inline-block bg-[#d4a24c] text-[#0f172a] text-[0.65rem] md:text-xs font-bold px-3 py-1 uppercase tracking-wider mb-2 rounded">
        Community
      </span>
      <h1 class="text-2xl md:text-4xl font-bold text-[#1f2937] leading-tight">
        Testimonies &amp; voices of hope
      </h1>
      <p class="text-sm md:text-base text-gray-600 mt-2 max-w-2xl italic">
        Real stories shared anonymously. Encouraging words left by others on the posts you read.
      </p>
    </div>

    <!-- TESTIMONIES GRID -->
    <section class="mb-10 md:mb-14">
      <div class="flex items-end justify-between mb-4 md:mb-6 border-b border-[#e8e2d5] pb-3">
        <div>
          <span class="text-[#8b5e34] text-[0.65rem] md:text-xs font-bold uppercase tracking-wider">Testimonies</span>
          <h2 class="text-xl md:text-3xl font-black text-[#1f2937] mt-1">Stories from the community</h2>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <NuxtLink
          v-for="t in testimonies"
          :key="t.id"
          :to="`/article/${t.slug}`"
          class="group bg-white border border-[#e8e2d5] rounded-xl overflow-hidden hover:border-[#8b5e34] hover:shadow-md transition-all flex flex-col"
        >
          <div class="relative">
            <img :src="t.image" :alt="t.title" class="w-full h-44 md:h-48 object-cover" />
            <span class="absolute top-3 left-3 text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#d4a24c] text-[#0f172a]">
              Testimony
            </span>
          </div>
          <div class="p-4 md:p-5 flex flex-col flex-1">
            <h3 class="text-base md:text-lg font-bold text-[#1f2937] leading-snug mb-2 group-hover:text-[#8b5e34] transition-colors">
              {{ t.title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mb-3 flex-1 italic">
              {{ t.excerpt }}
            </p>
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] md:text-xs text-gray-500 pt-3 border-t border-[#f0e9dc]">
              <Icon icon="fa6-solid:user-secret" class="text-[#8b5e34]" />
              <span class="font-semibold text-[#1f2937]">{{ t.author }}</span>
              <span>·</span>
              <span>{{ t.date }}</span>
              <span>·</span>
              <span>{{ t.readTime }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- RECENT COMMENTS -->
    <section class="mb-8">
      <div class="flex items-end justify-between mb-4 md:mb-6 border-b border-[#e8e2d5] pb-3">
        <div>
          <span class="text-[#8b5e34] text-[0.65rem] md:text-xs font-bold uppercase tracking-wider">Encouragement</span>
          <h2 class="text-xl md:text-3xl font-black text-[#1f2937] mt-1">Recent voices</h2>
          <p class="text-xs md:text-sm text-gray-500 mt-1 italic">
            Anonymous comments left on published posts.
          </p>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
        <div
          v-for="(c, i) in comments"
          :key="i"
          class="bg-[#faf7f2] border border-[#e8e2d5] rounded-lg p-4 md:p-5"
        >
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#8b5e34] text-white flex items-center justify-center text-xs md:text-sm font-bold">
              {{ c.name.charAt(0) }}
            </div>
            <span class="font-bold text-xs md:text-sm text-[#1f2937]">{{ c.name }}</span>
          </div>
          <p class="text-sm text-gray-700 leading-relaxed italic mb-3">
            "{{ c.text }}"
          </p>
          <p class="text-[0.65rem] md:text-xs text-gray-500 uppercase tracking-wider">
            On <span class="text-[#8b5e34] font-bold">{{ c.post }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="rounded-xl bg-[#0f172a] text-white px-5 md:px-6 py-8 md:py-12 text-center">
      <Icon icon="fa6-solid:heart" class="text-3xl md:text-4xl text-[#d4a24c] mb-3" />
      <h2 class="text-xl md:text-3xl font-black leading-tight mb-2 md:mb-3">
        You are welcome here. Always.
      </h2>
      <p class="text-sm md:text-base text-white/75 max-w-2xl mx-auto italic mb-5">
        Read. Reflect. Leave a word of encouragement for someone else.
      </p>
      <NuxtLink
        to="/"
        class="inline-block bg-[#8b5e34] text-white px-5 md:px-6 py-2.5 md:py-3 rounded font-bold text-xs md:text-sm hover:bg-[#6f4a29] transition-colors"
      >
        Back Home
      </NuxtLink>
    </section>

  </div>
</template>
