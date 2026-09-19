<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({ layout: false })

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)

// strict email pattern
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const submit = async () => {
  error.value = ''

  if (!username.value.trim() || !password.value.trim()) {
    error.value = 'Please fill in all fields.'
    return
  }

  if (!emailRegex.test(username.value.trim())) {
    error.value = 'Invalid username format.'
    return
  }

  loading.value = true
  await new Promise((r) => setTimeout(r, 500))

  // Placeholder — backend will validate tomorrow
  if (password.value === 'admin') {
    error.value = 'Login wired tomorrow. Credentials accepted.'
  } else {
    error.value = 'Invalid username or password.'
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-4 font-['Arial',sans-serif]">
    <div class="w-full max-w-xs">
      <!-- Brand -->
      <div class="text-center mb-6">
        <h1 class="text-lg font-bold text-[#1a1a1a]">
          <span class="text-[#cc0000]">Global</span> Mentorship
        </h1>
        <p class="text-[0.65rem] text-gray-500 uppercase tracking-wider mt-0.5">
          Author
        </p>
      </div>

      <!-- Form -->
      <form class="space-y-3" novalidate @submit.prevent="submit">
        <div>
          <label for="username" class="block text-xs font-semibold text-[#1a1a1a] mb-1">
            Username
          </label>
          <input
            id="username"
            v-model="username"
            type="email"
            inputmode="email"
            autocomplete="username"
            autocapitalize="none"
            spellcheck="false"
            class="w-full px-3 py-2 border border-gray-300 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] rounded"
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-xs font-semibold text-[#1a1a1a] mb-1">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              class="w-full px-3 py-2 pr-9 border border-gray-300 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] rounded"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a1a]"
              @click="showPassword = !showPassword"
            >
              <Icon :icon="showPassword ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" class="text-sm" />
            </button>
          </div>
        </div>

        <p v-if="error" class="text-xs text-[#cc0000]">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-[#cc0000] text-white py-2 font-semibold text-xs uppercase tracking-wider hover:bg-[#990000] transition-colors rounded disabled:opacity-60"
        >
          {{ loading ? 'Checking…' : 'Login' }}
        </button>
      </form>

      <p class="text-[0.65rem] text-center text-gray-400 mt-6">
        Authorised access only
      </p>
    </div>
  </div>
</template>