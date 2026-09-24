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
      // These NUXT_PUBLIC_ variables are the correct ones for the module.
      // Nuxt's runtimeConfig automatically maps env vars with this prefix.
      supabaseUrl: '',
      supabaseKey: '',
      siteUrl: '',
    },
    supabaseServiceKey: '',
  },
  nitro: {
    // This is the critical fix for the 500 error on Cloudflare.
    // It prevents the edge runtime from crashing due to minification incompatibilities.
    minify: false
  },
  vite: {
    plugins: [tailwindcss()],
  },
})