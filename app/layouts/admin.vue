<script setup lang="ts">
import { Icon } from '@iconify/vue'

const links = [
  { label: 'Dashboard',       to: '/author-panel-9f3a7b/dashboard', icon: 'fa6-solid:chart-line' },
  { label: 'Create Post',     to: '/author-panel-9f3a7b/create',    icon: 'fa6-solid:plus' },
  { label: 'Manage Posts',    to: '/author-panel-9f3a7b/posts',     icon: 'fa6-solid:list' },
  { label: 'Manage Comments', to: '/author-panel-9f3a7b/comments',  icon: 'fa6-solid:comments' },
  { label: 'Account',         to: '/author-panel-9f3a7b/account',   icon: 'fa6-solid:user-gear' },
]

const { isOpen, open, close } = useSidebar()

const loggingOut = ref(false)
const logout = async () => {
  if (loggingOut.value) return
  loggingOut.value = true
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
  } catch {
    // ignore — cookies are cleared server-side anyway
  }
  await navigateTo('/author-panel-9f3a7b')
}
</script>

<template>
  <div class="h-screen w-full bg-gray-100 font-['Arial',sans-serif] text-[#1a1a1a] flex flex-col md:flex-row overflow-hidden">
    <!-- ===== MOBILE HEADER ===== -->
    <header class="md:hidden shrink-0 bg-white border-b-4 border-[#cc0000] px-4 py-3 flex items-center justify-between z-30">
      <div class="flex items-center gap-3">
        <button class="text-2xl text-[#1a1a1a]" @click="open">
          <Icon icon="fa6-solid:bars" />
        </button>
        <div>
          <h1 class="text-sm font-bold">
            <span class="text-[#cc0000]">FT</span> Kickoffs
          </h1>
          <p class="text-[0.6rem] text-gray-500 uppercase tracking-wider">Author Panel</p>
        </div>
      </div>
      <button
        class="text-xs font-bold text-[#cc0000] uppercase tracking-wider hover:underline disabled:opacity-60"
        :disabled="loggingOut"
        @click="logout"
      >
        {{ loggingOut ? 'Signing out…' : 'Logout' }}
      </button>
    </header>

    <!-- ===== MOBILE DRAWER ===== -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-[90] md:hidden"
      @click="close"
    ></div>

    <aside
      class="fixed top-0 left-0 h-full w-64 bg-black text-white z-[100] transform transition-transform duration-300 ease-in-out md:hidden"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex justify-end p-3 border-b border-gray-800">
        <button class="text-white text-xl" @click="close">
          <Icon icon="fa6-solid:xmark" />
        </button>
      </div>

      <div class="px-4 py-4 border-b border-gray-800">
        <h2 class="text-sm font-bold">
          <span class="text-[#cc0000]">FT</span> Kickoffs
        </h2>
        <p class="text-[0.6rem] text-gray-400 uppercase tracking-wider mt-0.5">Author Panel</p>
      </div>

      <nav class="flex flex-col py-2">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-[#cc0000] hover:text-white transition-colors"
          @click="close"
        >
          <Icon :icon="l.icon" />
          <span>{{ l.label }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- ===== DESKTOP LAYOUT ===== -->
    <aside class="hidden md:flex md:flex-col w-56 bg-white border-r border-[#e8e8e8] shrink-0 h-screen overflow-y-auto">
      <div class="px-4 py-4 border-b border-[#e8e8e8]">
        <h1 class="text-sm font-bold">
          <span class="text-[#cc0000]">FT</span> Kickoffs
        </h1>
        <p class="text-[0.6rem] text-gray-500 uppercase tracking-wider mt-0.5">Author Panel</p>
      </div>

      <nav class="flex flex-col py-3">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:bg-[#f8f8f8] hover:text-[#cc0000] transition-colors"
        >
          <Icon :icon="l.icon" />
          {{ l.label }}
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main area (scrolls) -->
    <div class="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
      <!-- Top bar (fixed) -->
      <header class="hidden md:flex shrink-0 bg-white border-b border-[#e8e8e8] px-6 py-3 items-center justify-between">
        <p class="text-xs text-gray-500">
          Signed in as <strong class="text-[#1a1a1a]">Author</strong>
        </p>
        <button
          class="text-xs font-bold text-[#cc0000] uppercase tracking-wider hover:underline disabled:opacity-60"
          :disabled="loggingOut"
          @click="logout"
        >
          {{ loggingOut ? 'Signing out…' : 'Logout' }}
        </button>
      </header>

      <!-- Scrollable content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>