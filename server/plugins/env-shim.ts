export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()
  process.env.SUPABASE_URL = config.supabaseUrl
  process.env.SUPABASE_KEY = config.supabaseKey
  process.env.SUPABASE_SERVICE_KEY = config.supabaseServiceKey
})