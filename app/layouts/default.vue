<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { sidebarItems } from '~/utils/sidebar'

const { open, isOpen } = useSidebar()
const year = new Date().getFullYear()
const { message: toastMessage, visible: toastVisible } = useToast()

const socialLinks = [
  { icon: 'fa6-brands:facebook-f', url: 'https://facebook.com',  label: 'Facebook',  color: 'bg-[#1877f2]' },
  { icon: 'fa6-brands:whatsapp',   url: 'https://wa.me/',        label: 'WhatsApp',  color: 'bg-[#25d366]' },
  { icon: 'fa6-brands:instagram',  url: 'https://instagram.com', label: 'Instagram', color: 'bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]' },
  { icon: 'fa6-brands:x-twitter',  url: 'https://x.com',         label: 'X',         color: 'bg-black' },
  { icon: 'fa6-brands:youtube',    url: 'https://youtube.com',   label: 'YouTube',   color: 'bg-[#ff0000]' },
  { icon: 'fa6-brands:tiktok',     url: 'https://tiktok.com',    label: 'TikTok',    color: 'bg-black' },
]

// Desktop scroll behavior
const showHeader = ref(true)
const showFooter = ref(false)
const isDesktop = ref(false)
let lastY = 0

const checkViewport = () => {
  isDesktop.value = window.innerWidth >= 768
}

const onScroll = () => {
  if (!isDesktop.value) return
  const y = window.scrollY
  const goingDown = y > lastY
  const nearTop = y < 60

  if (nearTop) {
    showHeader.value = true
    showFooter.value = false
  } else if (goingDown) {
    showHeader.value = true
    showFooter.value = false
  } else {
    showHeader.value = false
    showFooter.value = true
  }
  lastY = y
}

onMounted(() => {
  checkViewport()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', checkViewport)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', checkViewport)
})
</script>

<template>
  <div class="bg-gray-100 font-['Arial',sans-serif] text-[#1a1a1a] min-h-screen">
    <AppSidebar />

    <!-- Site rating widget (left side, all devices) -->
    <SiteRating />

    <!-- Floating social icons (right side, all devices, brand colors) -->
    <div class="flex fixed right-2 md:right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-1.5 md:gap-2">
      <a
        v-for="s in socialLinks"
        :key="s.label"
        :href="s.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="s.label"
        :title="s.label"
        class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-white text-xs md:text-base shadow-lg transition-transform hover:scale-110"
        :class="s.color"
      >
        <Icon :icon="s.icon" />
      </a>
    </div>

    <!-- ===== MOBILE HEADER (hidden when sidebar open) ===== -->
    <header
      v-show="!isOpen"
      class="md:hidden sticky top-0 z-50 w-full bg-white border-b-4 border-[#cc0000]"
    >
      <div class="px-4 py-3 flex items-center justify-between w-full">
        <div class="flex items-center gap-3">
          <button class="text-2xl text-[#1a1a1a]" @click="open">
            <Icon icon="fa6-solid:bars" />
          </button>
          <div>
            <h1 class="text-base font-bold text-[#1a1a1a]">
              <span class="text-[#cc0000]">Global</span> Mentorship Branding
            </h1>
            <p class="text-[0.65rem] text-gray-600">Mentorship that transforms</p>
          </div>
        </div>
      </div>
    </header>

    <!-- ===== DESKTOP HEADER (sticky, hide on scroll-up) ===== -->
    <header
      class="hidden md:block fixed top-0 left-0 right-0 z-50 w-full bg-white border-b-4 border-[#cc0000] transition-transform duration-300"
      :class="showHeader ? 'translate-y-0' : '-translate-y-full'"
    >
      <div class="px-4 md:px-8 py-3 flex items-center justify-between w-full">
        <div class="flex items-center gap-3">
          <div>
            <h1 class="text-lg md:text-2xl font-bold text-[#1a1a1a]">
              <span class="text-[#cc0000]">Global</span> Mentorship Branding
            </h1>
            <p class="text-[0.7rem] md:text-xs text-gray-600">Mentorship that transforms</p>
          </div>
        </div>
        <div class="text-xs text-gray-500">
          {{ new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </div>
      </div>

      <nav class="flex items-center gap-4 px-8 py-2 bg-[#1a1a1a] text-white text-xs font-medium tracking-wide w-full">
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

    <!-- Desktop spacer -->
    <div class="hidden md:block h-[124px]"></div>

    <!-- Main content -->
    <main class="max-w-5xl mx-auto px-4 md:px-8 py-5 md:py-6 bg-white shadow-lg min-h-[60vh]">
      <slot />
    </main>

    <!-- ===== MOBILE FOOTER (static) ===== -->
    <footer class="md:hidden w-full bg-[#f8f8f8] px-4 py-4 border-t-2 border-[#e8e8e8]">
      <nav class="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-3 text-[0.65rem] text-[#1a1a1a] font-semibold uppercase tracking-wider">
        <NuxtLink
          v-for="item in sidebarItems"
          :key="item.link"
          :to="item.link"
          class="hover:text-[#cc0000] transition-colors"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>

      <div class="text-center text-[0.65rem] text-[#666]">
        <strong class="text-[#cc0000]">Global Mentorship Branding</strong> · Mentorship that transforms
        <br />
        <span>© {{ year }} · Empowering Teachers Across Kenya</span>
      </div>
    </footer>

    <!-- ===== DESKTOP FOOTER (fixed, hide on scroll-down) ===== -->
    <footer
      class="hidden md:block fixed bottom-0 left-0 right-0 z-50 w-full bg-[#f8f8f8] px-4 md:px-8 py-3 border-t-2 border-[#e8e8e8] transition-transform duration-300"
      :class="showFooter ? 'translate-y-0' : 'translate-y-full'"
    >
      <nav class="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-1 mb-2 text-[0.65rem] md:text-xs text-[#1a1a1a] font-semibold uppercase tracking-wider">
        <NuxtLink
          v-for="item in sidebarItems"
          :key="item.link"
          :to="item.link"
          class="hover:text-[#cc0000] transition-colors"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>

      <div class="text-center text-[0.65rem] md:text-xs text-[#666]">
        <strong class="text-[#cc0000]">Global Mentorship Branding</strong> · Mentorship that transforms
        <br />
        <span>© {{ year }} · Empowering Teachers Across Kenya</span>
      </div>
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

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>