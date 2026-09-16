// Keep the legacy /admin page on the same Supabase connection as the rest of
// the application. The shared client also contains the production fallback
// used when a hosting environment has not injected Vite variables yet.
export { supabase } from '../integrations/supabase/client'

// Helper types for our schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Location {
  id: string
  created_at: string
  lat: number
  lng: number
  category: string[]
  contact_phone?: string | null
  contact_web?: string | null
  contact_other?: Json | null
  name: Json // multi-lang {en, ru, fr, ar}
  description: Json
  country?: string | null
  city?: string | null
  verified: boolean
  source_note?: string | null
}

export interface CaseStory {
  id: string
  created_at: string
  published: boolean
  title: Json
  situation: Json
  actions: Json
  outcome: Json
  lang_primary?: string | null
  tags?: string[] | null
}

export interface LocationSuggestion {
  id: string
  created_at: string
  lat: number
  lng: number
  proposed_name: Json
  category: string[]
  contact_phone?: string
  contact_web?: string
  message?: string
  reviewed: boolean
  review_note?: string
}

export interface CaseSubmission {
  id: string
  created_at: string
  title: Json
  situation: Json
  actions?: Json
  outcome?: Json
  notes?: string
  reviewed: boolean
  actioned_case_id?: string
}
