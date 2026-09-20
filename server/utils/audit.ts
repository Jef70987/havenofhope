import { supabaseAdmin } from './supabase'

type AuditAction =
  | 'create' | 'update' | 'delete' | 'restore'
  | 'login' | 'logout' | 'login_failed'
  | 'password_change' | 'password_reset' | 'password_reset_request'
  | 'role_change' | 'publish' | 'unpublish' | 'hide' | 'view'

interface AuditPayload {
  userId?: string | null
  action: AuditAction
  tableName?: string
  rowId?: string | null
  description?: string
  beforeData?: any
  afterData?: any
  event?: any // H3Event — for IP + user agent
}

export const writeAudit = async ({
  userId = null,
  action,
  tableName,
  rowId = null,
  description,
  beforeData = null,
  afterData = null,
  event,
}: AuditPayload) => {
  let ip: string | null = null
  let userAgent: string | null = null

  if (event) {
    ip =
      event.node?.req?.headers?.['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
      event.node?.req?.socket?.remoteAddress ||
      null
    userAgent = event.node?.req?.headers?.['user-agent']?.toString() || null
  }

  try {
    await supabaseAdmin.from('audit_logs').insert({
      user_id: userId,
      action,
      table_name: tableName || null,
      row_id: rowId,
      description: description || null,
      before_data: beforeData,
      after_data: afterData,
      ip_address: ip,
      user_agent: userAgent,
    })
  } catch (err) {
    // Never fail the main action because logging failed
    console.error('[audit] failed to write log:', err)
  }
}