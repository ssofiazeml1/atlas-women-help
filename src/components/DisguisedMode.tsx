import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Simple safe disguised mode. In disguise the site appears as generic "Resources" or city news/weather
// Minimal tracking surface - completely client-side only.

export function DisguisedModeToggle() {
  const { t } = useTranslation()
  const [enabled, setEnabled] = useState<boolean>(() => localStorage.getItem('atlas_disguise') === '1')

  useEffect(() => {
    const handler = () => {
      if (enabled) {
        document.title = t('disguised.neutral_title')
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null
        if (link) link.href = '/vite.svg' // neutral vite icon used as fallback, or override later
      } else {
        document.title = t('disguised.default_title')
      }
    }
    handler()
    localStorage.setItem('atlas_disguise', enabled ? '1' : '0')
  }, [enabled, t])

  // Also ensure on every mount we keep the state in sync
  useEffect(() => {
    const stored = localStorage.getItem('atlas_disguise')
    if (stored !== (enabled ? '1' : '0')) {
      setEnabled(stored === '1')
    }
  }, [])

  return (
    <button
      onClick={() => setEnabled(v => !v)}
      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
      title={t('disguised.hint')}
    >
      {enabled ? t('disguised.normal') : t('disguised.disguised')}
    </button>
  )
}
