<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { enableSound } = useWorshipAudio()

const SESSION_KEY = 'haven-entered'
const visible = ref(false)
const fading = ref(false)

onMounted(() => {
  const entered = sessionStorage.getItem(SESSION_KEY)
  if (!entered) {
    visible.value = true
    // Lock scroll while splash is up
    document.body.style.overflow = 'hidden'
  }
})

async function enter() {
  // Start the audio — user gesture allows sound
  try {
    await enableSound()
  } catch {}

  fading.value = true

  setTimeout(() => {
    visible.value = false
    document.body.style.overflow = ''
    sessionStorage.setItem(SESSION_KEY, '1')
  }, 400)
}
</script>

<template>
  <Transition name="splash-fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-[200] flex items-center justify-center px-5 transition-opacity duration-400"
      :class="fading ? 'opacity-0' : 'opacity-100'"
      style="background: linear-gradient(180deg, #0f172a 0%, #1a2740 50%, #0f172a 100%);"
    >
      <!-- Soft vignette overlay -->
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.55) 100%);"></div>

      <!-- Content -->
      <div class="relative text-center max-w-2xl">

        <!-- Dove icon -->
        <div class="mb-6 flex justify-center">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Icon icon="fa6-solid:dove" class="text-4xl md:text-5xl text-[#cc0000]" />
          </div>
        </div>

        <!-- Site name -->
        <h1 class="text-3xl md:text-5xl font-black tracking-tight text-white leading-none mb-3">
          <span class="text-[#cc0000]">HAVEN</span> OF HOPE
        </h1>

        <p class="text-sm md:text-base italic text-white/70 mb-8">
          Let His word light your way
        </p>

        <!-- Scripture -->
        <p class="text-base md:text-lg italic text-white/85 leading-relaxed mb-10 max-w-xl mx-auto">
          "Come to me, all you who are weary and burdened,<br class="hidden md:block" />
          and I will give you rest."
        </p>

        <p class="text-xs font-bold uppercase tracking-widest text-[#cc0000] mb-10">
          — Matthew 11:28
        </p>

        <!-- Enter button -->
        <button
          class="group inline-flex items-center gap-3 bg-[#cc0000] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl hover:bg-[#aa0000] transition-all hover:scale-105"
          @click="enter"
        >
          <Icon icon="fa6-solid:play" class="text-xs" />
          Enter with Worship
          <Icon icon="fa6-solid:arrow-right" class="text-xs group-hover:translate-x-1 transition-transform" />
        </button>

        <p class="text-xs text-white/50 mt-6 italic">
          Music will begin playing softly. You can pause anytime.
        </p>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.splash-fade-enter-active,
.splash-fade-leave-active {
  transition: opacity 0.4s ease;
}
.splash-fade-enter-from,
.splash-fade-leave-to {
  opacity: 0;
}
</style>
