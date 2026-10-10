import { supabase } from '../integrations/supabase/client'
import { ADMIN_TOKEN_KEY } from './contentStore'

export type AutoReview = {
  status: 'verified' | 'needs_review' | 'unverified'
  checkedAt: string
  coordinates?: { lat: number; lng: number }
  suggestedCategories?: string[]
  websiteReachable?: boolean
  notes?: string[]
}

export type PublicSubmission = {
  id: string
  type: 'center' | 'story' | 'hotline'
  createdAt: string
  status: 'pending' | 'published' | 'rejected'
  payload: Record<string, any>
  autoReview?: AutoReview
}

export type AnalyticsSummary = {
  activeNow: number
  today: number
  total: number
  daily: { date: string; visits: number }[]
  updatedAt?: string
}

export async function submitPublic(type: PublicSubmission['type'], payload: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke('site-content', {
    body: { action: 'public-submit', type, payload },
  })
  if (error || !data?.ok) throw error || new Error('Submission failed')
  return data
}

export async function getAdminDashboard() {
  const adminToken = window.sessionStorage.getItem(ADMIN_TOKEN_KEY)
  if (!adminToken) throw new Error('Admin session expired')
  const { data, error } = await supabase.functions.invoke('site-content', {
    body: { action: 'admin-dashboard', adminToken },
  })
  if (error) throw error
  return data as { submissions: PublicSubmission[]; analytics: AnalyticsSummary }
}

export async function updateSubmission(id: string, status: PublicSubmission['status']) {
  const adminToken = window.sessionStorage.getItem(ADMIN_TOKEN_KEY)
  if (!adminToken) throw new Error('Admin session expired')
  const { data, error } = await supabase.functions.invoke('site-content', {
    body: { action: 'admin-submission', adminToken, id, status },
  })
  if (error || !data?.ok) throw error || new Error('Update failed')
}

export async function recheckCenter(id: string) {
  const adminToken = window.sessionStorage.getItem(ADMIN_TOKEN_KEY)
  if (!adminToken) throw new Error('Admin session expired')
  const { data, error } = await supabase.functions.invoke('site-content', {
    body: { action: 'admin-review-center', adminToken, id },
  })
  if (error || !data?.ok) throw error || new Error('Review failed')
  return data.submission as PublicSubmission
}

export function startVisitTracking() {
  if (typeof window === 'undefined' || location.pathname.startsWith('/secret-admin')) return () => {}
  const visitorKey = 'atlas:visitor:id'
  const sessionKey = 'atlas:visit:session'
  let visitorId = localStorage.getItem(visitorKey)
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    localStorage.setItem(visitorKey, visitorId)
  }
  let sessionId = sessionStorage.getItem(sessionKey)
  const newVisit = !sessionId
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    sessionStorage.setItem(sessionKey, sessionId)
  }
  const ping = (isNew = false) => {
    void supabase.functions.invoke('site-content', {
      body: {
        action: 'analytics', visitorId, sessionId, newVisit: isNew,
        path: location.pathname,
      },
    })
  }
  ping(newVisit)
  const timer = window.setInterval(() => ping(false), 60_000)
  const visible = () => document.visibilityState === 'visible' && ping(false)
  document.addEventListener('visibilitychange', visible)
  return () => {
    clearInterval(timer)
    document.removeEventListener('visibilitychange', visible)
  }
}
