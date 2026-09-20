import { supabaseAdmin } from '../../utils/supabase'
import { writeAudit } from '../../utils/audit'

export default defineEventHandler(async (event) => {
  const sessionToken = getCookie(event, 'auth_token')
  const refreshToken = getCookie(event, 'refresh_token')

  let userId: string | null = null

  // Find the session to revoke
  if (sessionToken || refreshToken) {
    const { data: session } = await supabaseAdmin
      .from('admin_sessions')
      .select('id, user_id')
      .or(`session_token.eq.${sessionToken},refresh_token.eq.${refreshToken}`)
      .maybeSingle()

    if (session) {
      userId = session.user_id
      await supabaseAdmin
        .from('admin_sessions')
        .update({ revoked_at: new Date().toISOString() })
        .eq('id', session.id)
    }
  }

  // Clear cookies regardless
  deleteCookie(event, 'auth_token', { path: '/' })
  deleteCookie(event, 'refresh_token', { path: '/' })

  await writeAudit({
    userId,
    action: 'logout',
    tableName: 'admin_sessions',
    description: 'User logged out',
    event,
  })

  return { ok: true }
})
