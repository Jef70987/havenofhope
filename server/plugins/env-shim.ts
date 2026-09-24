export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()
  process.env.SUPABASE_URL = config.public.supabaseUrl as string
  process.env.SUPABASE_KEY = config.public.supabaseKey as string
  process.env.SUPABASE_SERVICE_KEY = config.supabaseServiceKey as string
  process.env.SITE_URL = config.public.siteUrl as string
})