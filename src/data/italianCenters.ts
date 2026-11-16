import data from './italianCenters.json'
import type { SeedCenter } from '../lib/seeds'

// Source-reviewed public reception points. Unknown cost, hours, spoken
// languages and 24/7 access are deliberately not inferred.
export function getItalianCenters(language = 'en'): SeedCenter[] {
  const lang = language.split('-')[0]
  return data.map((center) => {
    const translations: Record<string, Record<string, string>> = center.translations
    return {
      ...center,
      verification: { ...center.verification, status: 'verified' as const },
      name: translations.name[lang] || translations.name.en,
      description: translations.description[lang] || translations.description.en,
    }
  })
}
