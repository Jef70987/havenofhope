import { supabaseAdmin } from './supabase'

interface AuthUser {
  id: string
  email: string | null
  name: string | null
  role: string
}

export const requireAuth = async (event: any): Promise<AuthUser> => {
  const sessionToken = getCookie(event, 'auth_token')
  const refreshToken = getCookie(event, 'refresh_token')

  if (!sessionToken && !refreshToken) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated.' })
  }

  const now = new Date()

  // Check the access token first
  if (sessionToken) {
    const { data: session } = await supabaseAdmin
      .from('admin_sessions')
      .select('id, user_id, expires_at, revoked_at')
      .eq('session_token', sessionToken)
      .maybeSingle()

    if (session && !session.revoked_at && new Date(session.expires_at) > now) {
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(session.user_id)
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('display_name, role')
        .eq('id', session.user_id)
        .maybeSingle()

      return {
        id: session.user_id,
        email: userData?.user?.email || null,
        name: profile?.display_name || null,
        role: profile?.role || 'author',
      }
    }
  }

  // Access expired → try refresh
  if (refreshToken) {
    const { data: refreshSession } = await supabaseAdmin
      .from('admin_sessions')
      .select('id, user_id, refresh_expires_at, revoked_at')
      .eq('refresh_token', refreshToken)
      .maybeSingle()

    if (
      refreshSession &&
      !refreshSession.revoked_at &&
      new Date(refreshSession.refresh_expires_at) > now
    ) {
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(refreshSession.user_id)
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('display_name, role')
        .eq('id', refreshSession.user_id)
        .maybeSingle()

      return {
        id: refreshSession.user_id,
        email: userData?.user?.email || null,
        name: profile?.display_name || null,
        role: profile?.role || 'author',
      }
    }
  }

  throw createError({ statusCode: 401, statusMessage: 'Session expired. Please log in again.' })
}
