<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { userRating, rate, hasRated, totalVotes, averageScore } = useRating()

// Stars ordered 1..5 for the interactive row
const stars = [1, 2, 3, 4, 5]

// Highlight state while hovering on mobile/desktop
const hovered = ref(0)

const onRate = (value: number) => {
  rate(value)
  setTimeout(() => { dismiss() }, 1000)
}

// Mobile popup
const showMobile = ref(false)
const popupDisabled = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

const dismiss = () => {
  showMobile.value = false
}

// Mobile popup scheduling
onMounted(() => {
  if (window.innerWidth >= 768) return

  // If already rated on this device, never show again
  if (hasRated.value) {
    popupDisabled.value = true
    return
  }

  // First appearance after 8s, then repeat every 60s until rated
  setTimeout(() => {
    if (!hasRated.value && !popupDisabled.value) showMobile.value = true
  }, 8000)

  intervalId = setInterval(() => {
    if (hasRated.value) {
      popupDisabled.value = true
      showMobile.value = false
      if (intervalId) clearInterval(intervalId)
    } else if (!showMobile.value) {
      showMobile.value = true
    }
  }, 60000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <!-- ===== DESKTOP RATING ===== -->
  <div class="hidden md:block fixed left-4 top-40 z-40 w-44">
    <div class="bg-white border border-[#e8e8e8] rounded-lg shadow-lg p-3 text-center">
      <h4 class="text-[0.7rem] font-bold text-[#1a1a1a] uppercase tracking-wider mb-2">
        Rate This Site
      </h4>

      <div class="text-lg font-bold text-[#cc0000]">{{ averageScore.toFixed(2) }}</div>
      <div class="text-[0.6rem] text-gray-500 mb-3">
        {{ totalVotes }} {{ totalVotes === 1 ? 'vote' : 'votes' }}
      </div>

      <div class="flex items-center justify-center gap-1 mb-2">
        <button
          v-for="s in stars"
          :key="s"
          class="text-xl transition-colors"
          :class="
            userRating !== null && s <= userRating
              ? 'text-[#f5b301]'
              : hovered >= s
                ? 'text-[#f5b301]/60'
                : 'text-gray-300 hover:text-[#f5b301]'
          "
          @mouseenter="hovered = s"
          @mouseleave="hovered = 0"
          @click="onRate(s)"
        >
          <Icon icon="fa6-solid:star" />
        </button>
      </div>

      <p v-if="hasRated" class="text-[0.6rem] text-gray-500">
        You rated {{ userRating }} ★
      </p>
      <p v-else class="text-[0.6rem] text-gray-500">
        Click a star to rate
      </p>
    </div>
  </div>

  <!-- ===== MOBILE POPUP ===== -->
  <Transition name="fade">
    <div
      v-if="showMobile && !hasRated"
      class="md:hidden fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4"
      @click.self="dismiss"
    >
      <div class="bg-white rounded-lg shadow-2xl p-5 w-full max-w-xs relative text-center">
        <button
          class="absolute top-2 right-2 text-gray-400 hover:text-[#cc0000] text-lg"
          @click="dismiss"
        >
          <Icon icon="fa6-solid:xmark" />
        </button>

        <h4 class="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3">
          Rate This Site
        </h4>

        <div class="text-2xl font-bold text-[#cc0000]">{{ averageScore.toFixed(2) }}</div>
        <div class="text-[0.7rem] text-gray-500 mb-4">
          {{ totalVotes }} {{ totalVotes === 1 ? 'vote' : 'votes' }}
        </div>

        <div class="flex items-center justify-center gap-2 mb-3">
          <button
            v-for="s in stars"
            :key="s"
            class="text-3xl transition-colors"
            :class="
              userRating !== null && s <= userRating
                ? 'text-[#f5b301]'
                : 'text-gray-300 active:text-[#f5b301]'
            "
            @click="onRate(s)"
          >
            <Icon icon="fa6-solid:star" />
          </button>
        </div>

        <p class="text-xs text-gray-500">
          Tap a star to rate
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>