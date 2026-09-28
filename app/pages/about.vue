<script setup lang="ts">
import { Icon } from '@iconify/vue'

useHead({ title: 'About Us · Haven of Hope' })

const values = [
  { title: 'Peace',          icon: 'fa6-solid:dove',          text: 'A quiet place to rest, away from the noise of the world.' },
  { title: 'Hope',           icon: 'fa6-solid:sun',           text: 'Encouragement for every season, no matter how heavy.' },
  { title: 'Scripture',      icon: 'fa6-solid:book-open',     text: 'God\u2019s Word at the centre of everything we share.' },
  { title: 'Prayer',         icon: 'fa6-solid:hands-praying', text: 'Written prayers to read slowly and pray in your heart.' },
  { title: 'Worship',        icon: 'fa6-solid:music',         text: 'Soft worship to accompany your time here.' },
  { title: 'Community',      icon: 'fa6-solid:heart',         text: 'Anonymous encouragement between visitors. No pressure.' },
]

const sections = [
  { title: 'Words of Hope', slug: 'words-of-hope', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', text: 'Short Scripture-based encouragement for the day ahead.' },
  { title: 'Prayers',       slug: 'prayers',       image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80', text: 'A library of written prayers for every season of life.' },
  { title: 'Worship',       slug: 'worship',       image: 'https://images.unsplash.com/photo-1445445290350-18a1b6f0e0b3?w=1200&q=80', text: 'Quiet worship moments with selected songs and reflections.' },
  { title: 'Community',     slug: 'community',     image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1200&q=80', text: 'Testimonies and anonymous encouragement from visitors.' },
]

const faqs = [
  { q: 'Do I need to sign up?', a: 'No. You can read everything freely. Comments are anonymous \u2014 no name or email required.' },
  { q: 'Is this a church?', a: 'No. Haven of Hope is a peaceful reading and reflection space, not a church or ministry organisation.' },
  { q: 'Can I submit a prayer request?', a: 'There is no prayer request form. You read the prayers already published and pray along privately.' },
  { q: 'Where does the worship music come from?', a: 'Every song is hand-selected and authorised for use on the site.' },
]
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">

    <!-- BREADCRUMB -->
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="hover:text-[#8b5e34] ml-1">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">About Us</span>
    </div>

    <!-- PAGE HEADER -->
    <div class="mb-6 md:mb-8">
      <span class="inline-block bg-[#8b5e34] text-white text-[0.65rem] md:text-xs font-bold px-3 py-1 uppercase tracking-wider mb-2 rounded">
        About Us
      </span>
      <h1 class="text-2xl md:text-4xl font-bold text-[#1f2937] leading-tight">
        A peaceful place to find Him
      </h1>
      <p class="text-sm md:text-base text-gray-600 mt-2 max-w-2xl italic">
        Haven of Hope is a quiet corner of the internet for Scripture, prayer, worship, and encouragement \u2014 where you can come as you are.
      </p>
    </div>

    <!-- HERO -->
    <section class="relative overflow-hidden rounded-xl mb-6 md:mb-10">
      <img
        src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80"
        alt="Peaceful"
        class="w-full h-64 sm:h-72 md:h-96 object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/60 to-transparent"></div>

      <div class="absolute inset-0 flex items-end">
        <div class="p-4 sm:p-6 md:p-10 w-full">
          <div class="flex items-center gap-2 text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-[#d4a24c] mb-3">
            <Icon icon="fa6-solid:dove" />
            Our Mission
          </div>
          <h2 class="text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight mb-3 max-w-3xl">
            Let His word light your way.
          </h2>
          <p class="text-sm md:text-base text-white/85 leading-relaxed italic max-w-2xl">
            Whether you are carrying something heavy today, or simply looking for peace, you are welcome here. Take your time. Breathe. His peace is here for you.
          </p>
        </div>
      </div>
    </section>

    <!-- WHAT WE ARE -->
    <section class="mb-8 md:mb-12 max-w-3xl">
      <div class="flex items-center gap-2 text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-[#8b5e34] mb-2">
        <Icon icon="fa6-solid:heart" />
        What this is
      </div>
      <h2 class="text-xl md:text-3xl font-black text-[#1f2937] mb-3">
        A digital sanctuary, not a social network.
      </h2>
      <p class="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
        Haven of Hope is a Christian reading and reflection platform. We publish Scripture, written prayers, short encouragement, worship moments, and real testimonies.
      </p>
      <p class="text-sm md:text-base text-gray-700 leading-relaxed italic">
        There is nothing to sign up for, nothing to submit, and nothing to prove. Read what speaks to you. Pray quietly. Leave an encouraging word if you wish.
      </p>
    </section>

    <!-- VALUES -->
    <section class="mb-8 md:mb-12">
      <div class="mb-4 md:mb-6">
        <span class="text-[#8b5e34] text-[0.65rem] md:text-xs font-bold uppercase tracking-wider">What we believe in</span>
        <h2 class="text-xl md:text-3xl font-black text-[#1f2937] mt-1">Six things at the centre</h2>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <div
          v-for="v in values"
          :key="v.title"
          class="bg-white border border-[#e8e2d5] rounded-lg p-4 md:p-5"
        >
          <div class="w-10 h-10 md:w-11 md:h-11 rounded bg-[#faf7f2] text-[#8b5e34] flex items-center justify-center mb-3">
            <Icon :icon="v.icon" />
          </div>
          <h3 class="font-bold text-sm md:text-base text-[#1f2937] mb-1">{{ v.title }}</h3>
          <p class="text-xs md:text-sm text-gray-600 leading-relaxed">{{ v.text }}</p>
        </div>
      </div>
    </section>

    <!-- SECTIONS OF THE SITE (post format) -->
    <section class="mb-8 md:mb-12">
      <div class="mb-4 md:mb-6 border-b border-[#e8e2d5] pb-3">
        <span class="text-[#8b5e34] text-[0.65rem] md:text-xs font-bold uppercase tracking-wider">Explore</span>
        <h2 class="text-xl md:text-3xl font-black text-[#1f2937] mt-1">Sections of Haven of Hope</h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <NuxtLink
          v-for="s in sections"
          :key="s.slug"
          :to="`/${s.slug}`"
          class="group bg-white border border-[#e8e2d5] rounded-xl overflow-hidden hover:border-[#8b5e34] hover:shadow-md transition-all flex flex-col"
        >
          <div class="relative">
            <img :src="s.image" :alt="s.title" class="w-full h-40 md:h-44 object-cover" />
            <span class="absolute top-3 left-3 text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#0f172a] text-white">
              {{ s.title }}
            </span>
          </div>
          <div class="p-4 md:p-5 flex flex-col flex-1">
            <h3 class="text-base md:text-lg font-bold text-[#1f2937] leading-snug mb-2 group-hover:text-[#8b5e34] transition-colors">
              {{ s.title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mb-3 flex-1 italic">
              {{ s.text }}
            </p>
            <span class="text-[0.65rem] md:text-xs font-bold uppercase tracking-wider text-[#8b5e34]">
              Visit →
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-8 md:mb-12">
      <div class="mb-4 md:mb-6">
        <span class="text-[#8b5e34] text-[0.65rem] md:text-xs font-bold uppercase tracking-wider">Questions</span>
        <h2 class="text-xl md:text-3xl font-black text-[#1f2937] mt-1">A few things you may wonder</h2>
      </div>

      <div class="space-y-2 md:space-y-3 max-w-3xl">
        <div
          v-for="f in faqs"
          :key="f.q"
          class="bg-[#faf7f2] border border-[#e8e2d5] rounded-lg p-4 md:p-5"
        >
          <h3 class="font-bold text-sm md:text-base text-[#1f2937] mb-1 flex items-start gap-2">
            <Icon icon="fa6-solid:circle-question" class="text-[#8b5e34] mt-0.5 shrink-0" />
            {{ f.q }}
          </h3>
          <p class="text-sm text-gray-600 leading-relaxed pl-6">{{ f.a }}</p>
        </div>
      </div>
    </section>

    <!-- CLOSING -->
    <section class="rounded-xl bg-[#0f172a] text-white px-5 md:px-6 py-8 md:py-12 text-center">
      <Icon icon="fa6-solid:dove" class="text-3xl md:text-4xl text-[#d4a24c] mb-3 md:mb-4" />

      <h2 class="text-xl sm:text-2xl md:text-4xl font-black leading-tight mb-2 md:mb-3">
        You are welcome here.
      </h2>

      <p class="text-sm md:text-base text-white/75 max-w-2xl mx-auto italic mb-5 md:mb-6">
        Come as you are. Stay as long as you need.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-2">
        <NuxtLink
          to="/words-of-hope"
          class="bg-[#8b5e34] text-white px-5 md:px-6 py-2.5 md:py-3 rounded font-bold text-xs md:text-sm hover:bg-[#6f4a29] transition-colors"
        >
          Read Words of Hope
        </NuxtLink>
        <NuxtLink
          to="/prayers"
          class="border border-white/30 text-white px-5 md:px-6 py-2.5 md:py-3 rounded font-bold text-xs md:text-sm hover:bg-white hover:text-[#0f172a] transition-colors"
        >
          Pray With Us
        </NuxtLink>
      </div>
    </section>

  </div>
</template>
