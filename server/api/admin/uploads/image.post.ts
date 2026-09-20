import { supabaseAdmin } from '../../../utils/supabase'
import { requireAuth } from '../../../utils/requireAuth'
import { writeAudit } from '../../../utils/audit'
import crypto from 'node:crypto'

const MAX_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const form = await readMultipartFormData(event)
  const file = form?.find((f) => f.name === 'file')

  if (!file || !file.data || !file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded.' })
  }
  if (file.data.length > MAX_BYTES) {
    throw createError({ statusCode: 400, statusMessage: 'File too large (max 5MB).' })
  }
  if (!ALLOWED.includes(file.type || '')) {
    throw createError({ statusCode: 400, statusMessage: 'Only JPG, PNG or WEBP allowed.' })
  }

  // Safe filename — random, keep extension
  const ext = (file.filename.split('.').pop() || 'jpg').toLowerCase()
  const key = `${new Date().toISOString().slice(0, 10)}/${crypto.randomBytes(12).toString('hex')}.${ext}`

  const { error } = await supabaseAdmin.storage
    .from('post-images')
    .upload(key, file.data, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    console.error('[upload] error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Upload failed.' })
  }

  const { data: urlData } = supabaseAdmin.storage
    .from('post-images')
    .getPublicUrl(key)

  await writeAudit({
    userId: user.id,
    action: 'create',
    tableName: 'storage.objects',
    description: `Uploaded image: ${key}`,
    event,
  })

  return { ok: true, key, url: urlData.publicUrl }
})
