import descriptions from '../data/localizedDescriptions.json'

const table = descriptions as Record<string, Record<string, string>>

export function localizePublicDescription(source: string | undefined, lang: string): string {
  const raw = (source || '').trim()
  if (!raw) return ''
  const locale = (lang || 'en').split('-')[0]
  return table[raw]?.[locale] || raw
}
