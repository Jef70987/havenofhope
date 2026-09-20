<script setup lang="ts">
definePageMeta({ layout: false })

const loading = ref(false)
const sent = ref(false)
const error = ref('')

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/forgot', {
      method: 'POST',
      body: {},
    })
    sent.value = true
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Could not send reset email.'
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
          Forgot Password
        </p>
      </div>

      <!-- Confirmation -->
      <div v-if="sent" class="text-center space-y-4">
        <p class="text-sm text-gray-700 leading-relaxed">
          If the registered author account exists, a password reset link has been sent to its email inbox.
        </p>
        <p class="text-[0.7rem] text-gray-500">
          The link expires shortly. Check the inbox and spam folder.
        </p>
        <NuxtLink
          to="/author-panel-9f3a7b"
          class="inline-block bg-[#cc0000] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000]"
        >
          Back to Login
        </NuxtLink>
      </div>

      <!-- Single confirm button -->
      <div v-else class="space-y-4">
        <p class="text-sm text-gray-700 text-center leading-relaxed">
          Click below to send a password reset link to the registered author account.
        </p>

        <p v-if="error" class="text-xs text-[#cc0000] text-center">{{ error }}</p>

        <button
          type="button"
          :disabled="loading"
          class="w-full bg-[#cc0000] text-white py-2 font-semibold text-xs uppercase tracking-wider hover:bg-[#990000] transition-colors rounded disabled:opacity-60"
          @click="submit"
        >
          {{ loading ? 'Sending…' : 'Send Reset Link' }}
        </button>

        <NuxtLink
          to="/author-panel-9f3a7b"
          class="block text-center text-xs text-gray-500 hover:text-[#1a1a1a]"
        >
          Back to Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>