import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL!
const anonKey = process.env.SUPABASE_KEY!
const serviceKey = process.env.SUPABASE_SERVICE_KEY!

if (!url || !anonKey || !serviceKey) {
  throw new Error('Missing Supabase env variables. Check .env — SUPABASE_URL, SUPABASE_KEY, SUPABASE_SERVICE_KEY.')
}

// Public client (respects RLS — safe for auth operations)
export const supabasePublic: SupabaseClient = createClient(url, anonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Admin client (bypasses RLS — server-side only, never expose to the browser)
export const supabaseAdmin: SupabaseClient = createClient(url, serviceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})
