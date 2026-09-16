<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { sidebarItems } from '~/utils/sidebar'

const { open } = useSidebar()
const year = new Date().getFullYear()
const { message: toastMessage, visible: toastVisible } = useToast()

const socialLinks = [
  { icon: 'fa6-brands:facebook-f', url: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-[#1877f2]' },
  { icon: 'fa6-brands:whatsapp',   url: 'https://wa.me/',       label: 'WhatsApp', color: 'hover:bg-[#25d366]' },
  { icon: 'fa6-brands:instagram',  url: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-[#e1306c]' },
  { icon: 'fa6-brands:x-twitter',  url: 'https://x.com',         label: 'X',        color: 'hover:bg-black' },
  { icon: 'fa6-brands:youtube',    url: 'https://youtube.com',   label: 'YouTube',  color: 'hover:bg-[#ff0000]' },
  { icon: 'fa6-brands:tiktok',     url: 'https://tiktok.com',    label: 'TikTok',   color: 'hover:bg-black' },
]
</script>

<template>
  <div class="bg-gray-100 font-['Arial',sans-serif] text-[#1a1a1a] min-h-screen">
    <AppSidebar />

    <!-- Floating social icons -->
    <div class="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
      <a
        v-for="s in socialLinks"
        :key="s.label"
        :href="s.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="s.label"
        :title="s.label"
        class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#1a1a1a] text-white text-sm md:text-base shadow-lg transition-all hover:scale-110"
        :class="s.color"
      >
        <Icon :icon="s.icon" />
      </a>
    </div>

    <!-- Header -->
    <header class="w-full bg-white border-b-4 border-[#cc0000]">
      <div class="px-4 md:px-8 py-3 flex items-center justify-between w-full">
        <div class="flex items-center gap-3">
          <button class="md:hidden text-2xl text-[#1a1a1a]" @click="open">
            <Icon icon="fa6-solid:bars" />
          </button>
          <div>
            <h1 class="text-lg md:text-2xl font-bold text-[#1a1a1a]">
              <span class="text-[#cc0000]">Global</span> Mentorship Branding
            </h1>
            <p class="text-[0.7rem] md:text-xs text-gray-600">Mentorship that transforms</p>
          </div>
        </div>
        <div class="hidden md:block text-xs text-gray-500">
          {{ new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </div>
      </div>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-4 px-8 py-2 bg-[#1a1a1a] text-white text-xs font-medium tracking-wide w-full">
        <NuxtLink
          v-for="item in sidebarItems"
          :key="item.link"
          :to="item.link"
          class="hover:text-[#cc0000] transition-colors"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>
    </header>

    <main class="max-w-5xl mx-auto px-4 md:px-8 py-5 md:py-6 bg-white shadow-lg min-h-[60vh]">
      <slot />
    </main>

    <footer class="w-full bg-[#f8f8f8] px-4 md:px-8 py-3 text-center text-xs text-[#666] border-t-2 border-[#e8e8e8]">
      <strong class="text-[#cc0000]">Global Mentorship Branding</strong> · Mentorship that transforms
      <br />
      <span>© {{ year }} · Empowering Teachers Across Kenya</span>
    </footer>

        <!-- Toast -->
    <Transition name="fade">
      <div
        v-if="toastVisible"
        class="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] bg-[#1a1a1a] text-white text-sm px-4 py-2 rounded shadow-lg"
      >
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>