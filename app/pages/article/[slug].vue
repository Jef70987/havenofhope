<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { articles } from '~/data/articles'

const route = useRoute()
const slug = route.params.slug as string
const article = articles[slug]

const { share } = useShare()
</script>

<template>
  <!-- Coming soon fallback -->
  <div v-if="!article">
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="ml-1 hover:text-[#cc0000]">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">Article</span>
    </div>

    <div class="rounded-lg border border-[#e8e8e8] bg-white p-8 md:p-16 text-center">
      <div class="bg-[#f0f0f0] flex items-center justify-center h-52 md:h-64 text-gray-400 text-sm font-semibold rounded mb-6">
        IMAGE
      </div>
      <span class="inline-block bg-[#cc0000] text-white text-[0.6rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded mb-3">
        Article
      </span>
      <h1 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">Coming Soon</h1>
      <p class="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto mb-2">
        This article is being prepared and will be published here shortly.
      </p>
      <p class="text-xs text-gray-400 mb-6">
        Reference: <span class="font-mono">{{ slug }}</span>
      </p>
      <NuxtLink
        to="/"
        class="inline-block bg-[#cc0000] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#990000] transition-colors rounded"
      >
        Back to Home
      </NuxtLink>
    </div>
  </div>

  <!-- Full article -->
  <article v-else>
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="mx-1 hover:text-[#cc0000]">Home</NuxtLink>
      <span>›</span>
      <NuxtLink :to="article.categoryPath" class="mx-1 hover:text-[#cc0000]">{{ article.category }}</NuxtLink>
      <span>›</span>
      <span class="font-semibold text-gray-700 ml-1">Article</span>
    </div>

    <NuxtLink
      :to="article.categoryPath"
      class="inline-block bg-[#cc0000] text-white text-[0.6rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded mb-3"
    >
      {{ article.category }}
    </NuxtLink>

    <h1 class="text-2xl md:text-4xl font-bold text-[#1a1a1a] leading-tight mb-3">
      {{ article.title }}
    </h1>

    <!-- Share (right after title) -->
    <div class="flex items-center gap-3 mb-3">
      <button
        class="flex items-center gap-2 text-xs font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
        @click="share(article.title, `/article/${article.slug}`)"
      >
        <Icon icon="fa6-solid:share-nodes" />
        Share
      </button>
    </div>

    <p v-if="article.subtitle" class="text-sm md:text-base italic text-gray-600 mb-4">
      {{ article.subtitle }}
    </p>

    <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 border-b border-[#f0f0f0] pb-4 mb-6">
      <span>By {{ article.author }}</span>
      <span>·</span>
      <span>{{ article.date }}</span>
      <template v-if="article.readTime">
        <span>·</span>
        <span>{{ article.readTime }}</span>
      </template>
      <span>·</span>
      <NuxtLink to="/about" class="font-semibold text-[#cc0000] hover:underline">View Author</NuxtLink>
    </div>

    <img
      :src="article.image"
      :alt="article.title"
      class="w-full h-52 md:h-80 object-cover bg-[#f0f0f0] rounded-lg mb-6"
    />

    <div class="max-w-3xl">
      <template v-for="(block, i) in article.body" :key="i">
        <h2 v-if="block.type === 'heading'" class="text-xl md:text-2xl font-bold text-[#1a1a1a] mt-8 mb-3">
          {{ block.text }}
        </h2>

        <div v-else-if="block.type === 'highlight'" class="bg-[#f8f8f8] border-l-4 border-[#cc0000] px-4 py-4 my-5">
          <p class="text-sm md:text-base font-bold text-[#1a1a1a] leading-relaxed">{{ block.text }}</p>
        </div>

        <ul v-else-if="block.type === 'list'" class="my-4 space-y-1 pl-4">
          <li
            v-for="(item, j) in block.items"
            :key="j"
            class="text-sm md:text-base leading-relaxed text-gray-700 flex items-start gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold before:mt-0.5"
          >
            <span>{{ item }}</span>
          </li>
        </ul>

        <p v-else-if="block.type === 'signature'" class="text-sm md:text-base text-gray-700 mt-8">
          {{ block.text }}
        </p>
        <p v-else-if="block.type === 'signatureName'" class="text-base md:text-lg font-bold text-[#1a1a1a] mt-3">
          {{ block.text }}
        </p>
        <p v-else-if="block.type === 'signatureRole'" class="text-xs md:text-sm text-gray-500 mb-1">
          {{ block.text }}
        </p>
        <p v-else-if="block.type === 'signatureContact'" class="text-xs md:text-sm text-[#cc0000] font-semibold">
          {{ block.text }}
        </p>

        <p v-else class="text-sm md:text-base leading-relaxed text-gray-700 mb-4">
          {{ block.text }}
        </p>
      </template>
    </div>

    <div class="mt-10 p-5 md:p-6 rounded-lg bg-[#f8f8f8] border-l-4 border-[#cc0000] text-center">
      <p class="text-sm text-gray-600 mb-4">
        Found this useful? Share it with a teacher, parent or KCSE candidate.
      </p>
      <NuxtLink
        :to="article.categoryPath"
        class="inline-block bg-[#cc0000] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#990000] transition-colors rounded"
      >
        More from {{ article.category }}
      </NuxtLink>
    </div>
  </article>
</template>