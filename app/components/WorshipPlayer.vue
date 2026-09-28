<script setup lang="ts">
import { Icon } from '@iconify/vue'

const {
  isPlaying,
  isMuted,
  volume,
  currentTrack,
  toggle,
  next,
  prev,
  toggleMute,
  setVolume,
} = useWorshipAudio()

const expanded = ref(false)
</script>

<template>
  <div class="fixed bottom-3 right-3 md:bottom-5 md:right-5 z-[90]">
    <!-- Collapsed pill -->
    <button
      v-if="!expanded"
      class="flex items-center gap-2 bg-[#111] text-white rounded-full pl-2 pr-4 py-2 shadow-lg hover:bg-black transition-colors"
      title="Worship music"
      @click="expanded = true"
    >
      <span class="w-8 h-8 rounded-full bg-[#cc0000] flex items-center justify-center">
        <Icon :icon="isPlaying ? 'fa6-solid:pause' : 'fa6-solid:play'" class="text-xs" />
      </span>
      <Icon icon="fa6-solid:music" class="text-xs text-white/70" />
      <span class="text-xs font-bold max-w-[110px] truncate">
        {{ currentTrack?.title || 'Worship' }}
      </span>
    </button>

    <!-- Expanded panel -->
    <div
      v-else
      class="bg-[#111] text-white rounded-xl shadow-2xl w-[280px] md:w-[320px] p-4"
    >
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#cc0000] animate-pulse"></span>
          <span class="text-[0.6rem] font-bold uppercase tracking-widest text-white/60">
            Worship
          </span>
        </div>
        <button
          class="text-white/60 hover:text-white text-xs"
          title="Collapse"
          @click="expanded = false"
        >
          <Icon icon="fa6-solid:chevron-down" />
        </button>
      </div>

      <div class="mb-4">
        <p class="text-sm font-bold truncate">{{ currentTrack?.title }}</p>
        <p class="text-xs text-white/60 truncate">{{ currentTrack?.artist }}</p>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-center gap-3 mb-4">
        <button
          class="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70"
          title="Previous"
          @click="prev"
        >
          <Icon icon="fa6-solid:backward-step" />
        </button>

        <button
          class="w-12 h-12 rounded-full bg-[#cc0000] hover:bg-[#aa0000] flex items-center justify-center"
          :title="isPlaying ? 'Pause' : 'Play'"
          @click="toggle"
        >
          <Icon :icon="isPlaying ? 'fa6-solid:pause' : 'fa6-solid:play'" class="text-lg" />
        </button>

        <button
          class="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70"
          title="Next"
          @click="next"
        >
          <Icon icon="fa6-solid:forward-step" />
        </button>
      </div>

      <!-- Volume -->
      <div class="flex items-center gap-2">
        <button
          class="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white"
          :title="isMuted ? 'Unmute' : 'Mute'"
          @click="toggleMute"
        >
          <Icon :icon="isMuted ? 'fa6-solid:volume-xmark' : 'fa6-solid:volume-high'" />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="volume"
          class="flex-1 accent-[#cc0000]"
          @input="(e) => setVolume(parseFloat((e.target as HTMLInputElement).value))"
        />
      </div>
    </div>
  </div>
</template>
