import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
const encoder = new TextEncoder()
const SUBMISSIONS_KEY = 'atlas:public-submissions:v2'
const ANALYTICS_KEY = 'atlas:analytics:v1'
const ALLOWED_CATEGORIES = ['shelter','domestic','sexual','legal','psychological','migrant','children','emergency','medical','hotline','crisis']

function json(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
}
function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).padStart(2, '0')).join('')
}
async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)))
}
async function isValidAdminToken(token: unknown, secret: string) {
  if (typeof token !== 'string') return false
  const separator = token.lastIndexOf('.')
  if (separator < 1) return false
  const payload = token.slice(0, separator)
  if ((await sign(payload, secret)) !== token.slice(separator + 1)) return false
  const [purpose, expiresAt] = payload.split(':')
  return purpose === 'atlas-admin' && Number(expiresAt) > Date.now()
}
function safeText(value: unknown, max = 3000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}
function sanitize(value: unknown): unknown {
  if (typeof value === 'string') return safeText(value)
  if (Array.isArray(value)) return value.slice(0, 30).map(sanitize)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).slice(0, 40).map(([k, v]) => [k.slice(0, 80), sanitize(v)]))
  }
  return typeof value === 'number' || typeof value === 'boolean' ? value : null
}
async function readKey(client: any, key: string, fallback: any) {
  const { data } = await client.from('site_content').select('value').eq('key', key).maybeSingle()
  return data?.value ?? fallback
}
async function writeKey(client: any, key: string, value: unknown) {
  const { error } = await client.from('site_content').upsert({ key, value }, { onConflict: 'key' })
  if (error) throw error
}

async function geocode(city: string, country: string) {
  const q = [city, country].filter(Boolean).join(', ')
  if (!q) return undefined
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`, {
      headers: { 'User-Agent': 'AtlasWomenHelp/1.0 (admin verification)' },
    })
    if (response.ok) {
      const rows = await response.json()
      const lat = Number(rows?.[0]?.lat), lng = Number(rows?.[0]?.lon)
      if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng }
    }
  } catch { /* try the fallback geocoder */ }
  try {
    const response = await fetch(`https://photon.komoot.io/api/?limit=1&q=${encodeURIComponent(q)}`, {
      headers: { 'User-Agent': 'AtlasWomenHelp/1.0 (admin verification)' },
    })
    if (!response.ok) return undefined
    const result = await response.json()
    const coordinates = result?.features?.[0]?.geometry?.coordinates
    const lng = Number(coordinates?.[0]), lat = Number(coordinates?.[1])
    return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : undefined
  } catch { return undefined }
}
function inferCategories(text: string) {
  const hay = text.toLowerCase()
  const rules: Record<string, string[]> = {
    legal: ['legal','lawyer','jurid','avocat','правов','юрид','abogad','قانون'],
    psychological: ['psycholog','counselling','counseling','therapy','психолог','консультац','心理','نفسي'],
    shelter: ['shelter','safe house','refuge','hébergement','приют','убежищ','refugio','مأوى'],
    medical: ['medical','health','clinic','hospital','медицин','клиник','salud','صحي'],
    hotline: ['hotline','helpline','phone line','горяч','телефон доверия','línea','خط ساخن'],
    children: ['children','child','enfant','дет','niñ','طفل'],
    migrant: ['migrant','refugee','asylum','мигран','бежен','migrante','لاجئ'],
    sexual: ['sexual violence','rape','violence sexuelle','изнасил','сексуаль','violación','اغتصاب'],
    domestic: ['domestic violence','violence domestique','домашн','violencia doméstica','عنف أسري'],
    crisis: ['crisis','кризис','crise','crisis','أزمة'],
    emergency: ['emergency','urgent','экстрен','urgencia','طوارئ'],
  }
  return Object.entries(rules).filter(([, words]) => words.some((w) => hay.includes(w))).map(([key]) => key)
}
async function aiReview(payload: Record<string, any>) {
  const city = safeText(payload.city, 200), country = safeText(payload.country, 200)
  const website = safeText(payload.contactWeb || payload.web || payload.website, 500)
  const coordinates = await geocode(city, country)
  let websiteReachable = false, websiteText = ''
  if (/^https?:\/\//i.test(website)) {
    try {
      const response = await fetch(website, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 AtlasWomenHelpVerifier/1.0' } })
      websiteReachable = response.ok
      if (response.ok) websiteText = (await response.text()).replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 30000)
    } catch { /* marked unreachable */ }
  }
  const rawCategories = Array.isArray(payload.category) ? payload.category : Array.isArray(payload.categories) ? payload.categories : []
  const submitted = rawCategories.filter((x: string) => ALLOWED_CATEGORIES.includes(x))
  let suggestedCategories = [...new Set([...submitted, ...inferCategories(`${payload.message || ''} ${websiteText}`)])]
  const notes: string[] = []
  if (!coordinates) notes.push('Координаты не найдены автоматически — проверьте адрес вручную.')
  if (website && !websiteReachable) notes.push('Сайт организации не открылся во время проверки.')
  if (!website) notes.push('Сайт организации не указан.')

  const openAiKey = Deno.env.get('OPENAI_API_KEY')
  if (openAiKey && websiteText) {
    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST', headers: { Authorization: `Bearer ${openAiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: Deno.env.get('OPENAI_MODEL') || 'gpt-4.1-mini',
          input: `Review this proposed women-support centre using only the supplied website text. Return JSON with keys categories (array limited to ${ALLOWED_CATEGORIES.join(',')}), notes (array of short Russian strings). Do not infer services without evidence.\n\n${websiteText}`,
          text: { format: { type: 'json_object' } },
        }),
      })
      const result = await response.json()
      const raw = result?.output?.flatMap((x: any) => x.content || []).find((x: any) => x.type === 'output_text')?.text
      const parsed = raw ? JSON.parse(raw) : null
      if (Array.isArray(parsed?.categories)) suggestedCategories = [...new Set([...submitted, ...parsed.categories.filter((x: string) => ALLOWED_CATEGORIES.includes(x))])]
      if (Array.isArray(parsed?.notes)) notes.push(...parsed.notes.map((x: unknown) => safeText(x, 300)).filter(Boolean))
    } catch { notes.push('ИИ-проверка временно недоступна; выполнена автоматическая проверка сайта и координат.') }
  } else if (!openAiKey) {
    notes.push('Выполнена автоматическая проверка координат, сайта и услуг по ключевым словам.')
  }
  return {
    status: coordinates && (!website || websiteReachable) ? 'verified' : 'needs_review',
    checkedAt: new Date().toISOString(), coordinates, suggestedCategories, websiteReachable, notes,
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  try {
    const body = await request.json()
    const url = Deno.env.get('SUPABASE_URL'), serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!url || !serviceKey) throw new Error('Backend is not configured')
    const client = createClient(url, serviceKey)

    if (body.action === 'analytics') {
      const sessionId = safeText(body.sessionId, 100), visitorId = safeText(body.visitorId, 100)
      if (!sessionId || !visitorId) return json({ error: 'Invalid analytics event' }, 400)
      const now = Date.now(), date = new Date().toISOString().slice(0, 10)
      const state = await readKey(client, ANALYTICS_KEY, { total: 0, daily: {}, sessions: {} })
      state.daily ||= {}; state.sessions ||= {}; state.total ||= 0
      if (body.newVisit && !state.sessions[sessionId]) {
        state.total += 1; state.daily[date] = (state.daily[date] || 0) + 1
      }
      state.sessions[sessionId] = { visitorId, lastSeen: now, path: safeText(body.path, 300) }
      for (const [id, value] of Object.entries(state.sessions)) if (now - Number((value as any).lastSeen) > 86400000) delete state.sessions[id]
      await writeKey(client, ANALYTICS_KEY, state)
      return json({ ok: true })
    }

    if (body.action === 'public-submit') {
      if (!['center','story','hotline'].includes(body.type) || JSON.stringify(body.payload || {}).length > 25000) return json({ error: 'Invalid submission' }, 400)
      const submissions = await readKey(client, SUBMISSIONS_KEY, [])
      const payload = sanitize(body.payload) as Record<string, any>
      const submission: any = { id: crypto.randomUUID(), type: body.type, createdAt: new Date().toISOString(), status: 'pending', payload }
      if (body.type === 'center') submission.autoReview = await aiReview(payload)
      submissions.unshift(submission)
      await writeKey(client, SUBMISSIONS_KEY, submissions.slice(0, 2000))
      return json({ ok: true, id: submission.id })
    }

    const secret = Deno.env.get('ATLAS_ADMIN_LOGIN_PASSWORD') || Deno.env.get('ATLAS_ADMIN_PASSWORD')
    if (!secret || !(await isValidAdminToken(body.adminToken, secret))) return json({ error: 'Unauthorized' }, 401)

    if (body.action === 'admin-dashboard') {
      const submissions = await readKey(client, SUBMISSIONS_KEY, [])
      const state = await readKey(client, ANALYTICS_KEY, { total: 0, daily: {}, sessions: {} })
      const now = Date.now(), todayKey = new Date().toISOString().slice(0, 10)
      const activeNow = Object.values(state.sessions || {}).filter((s: any) => now - Number(s.lastSeen) <= 5 * 60_000).length
      const daily = Object.entries(state.daily || {}).sort(([a], [b]) => a.localeCompare(b)).slice(-30).map(([date, visits]) => ({ date, visits }))
      return json({ submissions, analytics: { activeNow, today: state.daily?.[todayKey] || 0, total: state.total || 0, daily, updatedAt: new Date().toISOString() } })
    }
    if (body.action === 'admin-submission') {
      const submissions = await readKey(client, SUBMISSIONS_KEY, [])
      const row = submissions.find((x: any) => x.id === body.id)
      if (!row || !['published','rejected','pending'].includes(body.status)) return json({ error: 'Invalid submission update' }, 400)
      row.status = body.status; row.reviewedAt = new Date().toISOString()
      await writeKey(client, SUBMISSIONS_KEY, submissions)
      return json({ ok: true })
    }
    if (body.action === 'admin-review-center') {
      const submissions = await readKey(client, SUBMISSIONS_KEY, [])
      const row = submissions.find((x: any) => x.id === body.id && x.type === 'center')
      if (!row) return json({ error: 'Center not found' }, 404)
      row.autoReview = await aiReview(row.payload || {})
      await writeKey(client, SUBMISSIONS_KEY, submissions)
      return json({ ok: true, submission: row })
    }
    if (body.action === 'bootstrap') {
      const entries = Array.isArray(body.entries) ? body.entries.filter((x: any) => x && typeof x.key === 'string' && x.key.startsWith('atlas:')).map((x: any) => ({ key: x.key, value: x.value })) : []
      if (entries.length) {
        const { error } = await client.from('site_content').upsert(entries, { onConflict: 'key', ignoreDuplicates: true })
        if (error) throw error
      }
      const { data, error } = await client.from('site_content').select('key,value')
      if (error) throw error
      return json({ entries: data || [] })
    }
    if (body.action === 'save' && typeof body.key === 'string' && body.key.startsWith('atlas:')) {
      await writeKey(client, body.key, body.value)
      return json({ ok: true })
    }
    return json({ error: 'Invalid action' }, 400)
  } catch (error) {
    console.error('site-content error', error)
    return json({ error: 'Unable to process request' }, 500)
  }
})
