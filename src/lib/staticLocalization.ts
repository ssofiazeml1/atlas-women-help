import { useCallback, useEffect, useRef, useState } from 'react'
import translations from '../data/staticTranslations.json'
import { autoTranslateCached } from './translate'

const table = translations as Record<string, Record<string, string>>

export function localizeStaticText(source: string, language: string): string {
  const lang = (language || 'ru').split('-')[0]
  return table[source]?.[lang] || table[source]?.en || table[source]?.ru || source
}

/** Static text is instant; newly added text is translated once and cached. */
export function useStaticLocalizer(language: string) {
  const lang = (language || 'ru').split('-')[0]
  const [dynamic, setDynamic] = useState<Record<string, string>>({})
  const pending = useRef(new Set<string>())
  const attempted = useRef(new Set<string>())

  useEffect(() => {
    setDynamic({})
    pending.current.clear()
    attempted.current.clear()
  }, [lang])

  const localize = useCallback((source: string) => {
    const bundled = localizeStaticText(source, lang)
    if (lang === 'ru' || table[source]?.[lang]) return bundled
    if (dynamic[source]) return dynamic[source]
    if (!attempted.current.has(source)) pending.current.add(source)
    return bundled
  }, [dynamic, lang])

  useEffect(() => {
    const sources = [...pending.current].filter((source) => !attempted.current.has(source))
    pending.current.clear()
    if (!sources.length) return
    sources.forEach((source) => attempted.current.add(source))
    let active = true
    void Promise.all(sources.map(async (source) => [source, await autoTranslateCached(source, lang)] as const))
      .then((pairs) => {
        if (!active) return
        const translated = Object.fromEntries(pairs.filter(([source, value]) => value && value !== source))
        if (Object.keys(translated).length) setDynamic((current) => ({ ...current, ...translated }))
      })
    return () => { active = false }
  })

  return localize
}
