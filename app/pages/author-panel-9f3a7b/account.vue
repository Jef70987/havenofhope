<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({ layout: 'admin' })

const { show: showToast } = useToast()

// ===== PROFILE =====
const profile = reactive({
  displayName: 'Mwalimu Malata Benson',
  username: 'bensonmalata65@gmail.com', // label as Username but it's the login email
  phone: '0728701795',
  tagline: 'Teacher – Mentor – Writer – Publisher – Educational Consultant – Political Analyst',
  publicEmail: 'bensonmalata65@gmail.com',
})

const saveProfile = () => {
  if (!profile.displayName.trim()) return showToast('Display name cannot be empty.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.username)) return showToast('Invalid username format.')
  showToast('Profile saved — wired tomorrow.')
}

// ===== CHANGE PASSWORD =====
const pw = reactive({
  current: '',
  next: '',
  confirm: '',
})
const showPw = reactive({ current: false, next: false, confirm: false })

const savePassword = () => {
  if (!pw.current || !pw.next || !pw.confirm) return showToast('Please fill in all password fields.')
  if (pw.next.length < 8) return showToast('New password must be at least 8 characters.')
  if (pw.next !== pw.confirm) return showToast('New password and confirmation do not match.')
  if (pw.next === pw.current) return showToast('New password must be different from the current one.')
  pw.current = ''
  pw.next = ''
  pw.confirm = ''
  showToast('Password updated — wired tomorrow.')
}

// ===== DANGER ZONE =====
const confirmDelete = ref('')
const deleteAccount = () => {
  if (confirmDelete.value !== 'DELETE') return showToast('Type DELETE to confirm.')
  showToast('Account deletion wired tomorrow.')
}
</script>

<template>
  <div class="space-y-4 md:space-y-6 w-full max-w-full">
    <!-- HEADER -->
    <div>
      <h1 class="text-lg md:text-xl font-bold text-[#1a1a1a]">Account</h1>
      <p class="text-xs md:text-sm text-gray-500">Manage your profile, login and security</p>
    </div>

    <!-- ===== PROFILE ===== -->
    <section class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 md:p-5 w-full">
      <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-4 border-l-4 border-[#cc0000] pl-2">
        Profile
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="min-w-0">
          <label class="block text-xs font-semibold mb-1">Display Name</label>
          <input
            v-model="profile.displayName"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            placeholder="Your public name"
          />
        </div>

        <div class="min-w-0">
          <label class="block text-xs font-semibold mb-1">Username</label>
          <input
            v-model="profile.username"
            type="email"
            autocapitalize="none"
            spellcheck="false"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            placeholder="you@example.com"
          />
          <p class="text-[0.65rem] text-gray-500 mt-1">Used to log into the author panel.</p>
        </div>

        <div class="min-w-0">
          <label class="block text-xs font-semibold mb-1">Phone</label>
          <input
            v-model="profile.phone"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            placeholder="07xx xxx xxx"
          />
        </div>

        <div class="min-w-0">
          <label class="block text-xs font-semibold mb-1">Public Email</label>
          <input
            v-model="profile.publicEmail"
            type="email"
            autocapitalize="none"
            spellcheck="false"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            placeholder="contact@example.com"
          />
          <p class="text-[0.65rem] text-gray-500 mt-1">Shown on articles and the About page.</p>
        </div>

        <div class="md:col-span-2 min-w-0">
          <label class="block text-xs font-semibold mb-1">Tagline</label>
          <input
            v-model="profile.tagline"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            placeholder="Short description shown in signatures"
          />
        </div>
      </div>

      <div class="mt-5 flex justify-end">
        <button
          class="bg-[#cc0000] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000]"
          @click="saveProfile"
        >
          Save Profile
        </button>
      </div>
    </section>

    <!-- ===== CHANGE PASSWORD ===== -->
    <section class="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-4 md:p-5 w-full">
      <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-4 border-l-4 border-[#cc0000] pl-2">
        Change Password
      </h2>

      <div class="space-y-4 max-w-xl">
        <div>
          <label class="block text-xs font-semibold mb-1">Current Password</label>
          <div class="relative">
            <input
              v-model="pw.current"
              :type="showPw.current ? 'text' : 'password'"
              autocomplete="current-password"
              class="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
              placeholder="Enter current password"
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a1a]"
              @click="showPw.current = !showPw.current"
            >
              <Icon :icon="showPw.current ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" />
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold mb-1">New Password</label>
          <div class="relative">
            <input
              v-model="pw.next"
              :type="showPw.next ? 'text' : 'password'"
              autocomplete="new-password"
              class="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a1a]"
              @click="showPw.next = !showPw.next"
            >
              <Icon :icon="showPw.next ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" />
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold mb-1">Confirm New Password</label>
          <div class="relative">
            <input
              v-model="pw.confirm"
              :type="showPw.confirm ? 'text' : 'password'"
              autocomplete="new-password"
              class="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
              placeholder="Repeat new password"
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a1a]"
              @click="showPw.confirm = !showPw.confirm"
            >
              <Icon :icon="showPw.confirm ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" />
            </button>
          </div>
        </div>
      </div>

      <div class="mt-5 flex justify-end max-w-xl">
        <button
          class="bg-[#cc0000] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000]"
          @click="savePassword"
        >
          Update Password
        </button>
      </div>
    </section>

    <!-- ===== DANGER ZONE ===== -->
    <section class="bg-white rounded-lg shadow-sm border border-[#cc0000] p-4 md:p-5 w-full">
      <h2 class="text-sm font-bold uppercase tracking-wider text-[#cc0000] mb-2 border-l-4 border-[#cc0000] pl-2">
        Danger Zone
      </h2>
      <p class="text-xs text-gray-600 mb-4">
        Deleting your account removes all posts, comments and requests. This cannot be undone.
      </p>

      <div class="space-y-3 max-w-xl">
        <div>
          <label class="block text-xs font-semibold mb-1">
            Type <span class="font-mono text-[#cc0000]">DELETE</span> to confirm
          </label>
          <input
            v-model="confirmDelete"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#cc0000]"
            placeholder="DELETE"
          />
        </div>

        <button
          class="bg-[#cc0000] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="confirmDelete !== 'DELETE'"
          @click="deleteAccount"
        >
          Delete Account
        </button>
      </div>
    </section>
  </div>
</template>
