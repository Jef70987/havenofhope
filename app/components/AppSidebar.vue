<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SidebarBrand from '~/components/SidebarBrand.vue'
import SidebarNav from '~/components/SidebarNav.vue'

const { isOpen, close } = useSidebar()
</script>

<template>
  <!-- Mobile overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-40 md:hidden"
    @click="close"
  ></div>

  <!-- Sidebar drawer -->
  <aside
    class="fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex justify-end p-3 border-b border-gray-800">
      <button class="text-white text-xl" @click="close">
        <Icon icon="fa6-solid:xmark" />
      </button>
    </div>

    <SidebarBrand />
    <SidebarNav />
  </aside>
</template>
