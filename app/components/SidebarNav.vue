<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { sidebarItems } from '~/utils/sidebar'

const { close } = useSidebar()
</script>

<template>
  <nav class="flex flex-col py-2">
    <NuxtLink
      v-for="item in sidebarItems"
      :key="item.link"
      :to="item.link"
      class="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-[#cc0000] hover:text-white transition-colors"
      @click="close"
    >
      <Icon :icon="item.icon" class="text-lg" />
      <span>{{ item.title }}</span>
    </NuxtLink>
  </nav>
</template>
