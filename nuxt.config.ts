import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-16',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/supabase'],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseKey: '',
      siteUrl: '',
    },
    supabaseServiceKey: '',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})