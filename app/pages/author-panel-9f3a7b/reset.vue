<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({ layout: false })

const route = useRoute()
const password = ref('')
const confirm = ref('')
const showPw = ref(false)
const showPw2 = ref(false)
const loading = ref(false)
const error = ref('')
const done = ref(false)

const accessToken = computed(() => {
  // Supabase sends token in the URL hash: #access_token=...&type=recovery
  // or as query param depending on config
  const hash = (route.hash || '').replace(/^#/, '')
  const hashParams = new URLSearchParams(hash)
  return (
    hashParams.get('access_token') ||
    (route.query.access_token as string) ||
    ''
  )
})

const submit = async () => {
  error.value = ''
  if (!password.value || password.value.length < 8) {
    error.value = 'Password must be at least 8 characters.'
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Passwords do not match.'
    return
  }
  if (!accessToken.value) {
    error.value = 'Reset link is invalid or has expired.'
    return
  }
  loading.value = true
  try {
    const res = await $fetch<{ ok: boolean }>('/api/auth/reset', {
      method: 'POST',
      body: {
        access_token: accessToken.value,
        new_password: password.value,
        confirm_password: confirm.value,
      },
    })
    if (res.ok) done.value = true
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Could not reset password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-4 font-['Arial',sans-serif]">
    <div class="w-full max-w-xs">
      <div class="text-center mb-6">
        <h1 class="text-lg font-bold text-[#1a1a1a]">
          <span class="text-[#cc0000]">Global</span> Mentorship
        </h1>
        <p class="text-[0.65rem] text-gray-500 uppercase tracking-wider mt-0.5">
          Reset Password
        </p>
      </div>

      <div v-if="done" class="text-center space-y-4">
        <p class="text-sm text-gray-700">
          Your password has been updated.
        </p>
        <NuxtLink
          to="/author-panel-9f3a7b"
          class="inline-block bg-[#cc0000] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000]"
        >
          Go to Login
        </NuxtLink>
      </div>

      <form v-else class="space-y-3" @submit.prevent="submit">
        <div>
          <label for="pw" class="block text-xs font-semibold text-[#1a1a1a] mb-1">
            New Password
          </label>
          <div class="relative">
            <input
              id="pw"
              v-model="password"
              :type="showPw ? 'text' : 'password'"
              autocomplete="new-password"
              class="w-full px-3 py-2 pr-9 border border-gray-300 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] rounded"
              placeholder="At least 8 characters"
              required
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a1a]"
              @click="showPw = !showPw"
            >
              <Icon :icon="showPw ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" class="text-sm" />
            </button>
          </div>
        </div>

        <div>
          <label for="pw2" class="block text-xs font-semibold text-[#1a1a1a] mb-1">
            Confirm Password
          </label>
          <div class="relative">
            <input
              id="pw2"
              v-model="confirm"
              :type="showPw2 ? 'text' : 'password'"
              autocomplete="new-password"
              class="w-full px-3 py-2 pr-9 border border-gray-300 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] rounded"
              placeholder="Repeat password"
              required
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a1a]"
              @click="showPw2 = !showPw2"
            >
              <Icon :icon="showPw2 ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" class="text-sm" />
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
          {{ loading ? 'Saving…' : 'Set New Password' }}
        </button>
      </form>
    </div>
  </div>
</template>
