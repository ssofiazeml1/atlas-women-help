import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookOpen, Download } from 'lucide-react'
import {
  getLibrary,
  subscribeContent,
  applySeedTransforms,
  type LibraryArticle,
} from '../../lib/contentStore'
import { pickLocalized } from '../../lib/translate'
import { getSeedLibrary } from '../../lib/seeds'

export function ResearchLibrary() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language || 'en').split('-')[0]
  const visiblePlaceholders = applySeedTransforms('library', getSeedLibrary())
  const [admin, setAdmin] = useState<LibraryArticle[]>(() => getLibrary())
  useEffect(() => subscribeContent(() => setAdmin(getLibrary())), [])

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-widest text-teal-700 font-medium mb-1">{t('research.title')}</div>
        <h1 className="text-3xl font-semibold tracking-tight text-safe-800 mb-3">{t('research.title')}</h1>
        <p className="max-w-3xl text-slate-600">{t('research.intro')}</p>
      </div>

      {admin.length === 0 && visiblePlaceholders.length === 0 && (
        <div className="mb-6 text-xs text-slate-500 border-l-2 border-slate-200 pl-3">{t('research.empty')}</div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {admin.map((a) => (
          <div key={a.id} className="safe-card p-5">
            <div className="flex gap-3 items-start">
              <div className="mt-1 text-teal-700"><BookOpen size={18} /></div>
              <div className="flex-1">
                <div className="font-semibold mb-1">{pickLocalized(a, 'title', lang) || a.title}</div>
                {(pickLocalized(a, 'category', lang) || a.category) && (
                  <div className="text-xs text-slate-500 mb-2">{pickLocalized(a, 'category', lang) || a.category}</div>
                )}
                {a.image && <img src={a.image} alt="" className="rounded mb-3 h-28 w-full object-cover" />}
                <div className="text-sm leading-relaxed mb-4 text-slate-700 whitespace-pre-wrap">{pickLocalized(a, 'text', lang) || a.text}</div>
                {a.downloadUrl && (
                  <a
                    href={a.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 border rounded text-xs inline-flex items-center gap-1 hover:bg-slate-50"
                  >
                    <Download size={14} /> {t('research.card.pdf')}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {visiblePlaceholders.length > 0 ? (
          visiblePlaceholders.map((p: any, idx: number) => (
            <div key={p.id || idx} className="safe-card p-5">
              <div className="flex gap-3 items-start">
                <div className="mt-1 text-teal-700"><BookOpen size={18} /></div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{pickLocalized(p, 'title', lang) || p.title}</div>
                  <div className="text-xs text-slate-500 mb-2">
                    {t('research.card.author_label')}: {p.author} • {t('research.card.date_label')}: {p.date} • {t('research.card.category_label')}: {pickLocalized(p, 'category', lang) || p.category}
                  </div>
                  <div className="text-sm leading-relaxed mb-4 text-slate-700">
                    {t('research.card.abstract_label')}: {pickLocalized(p, 'abstract', lang) || p.abstract}
                  </div>
                  <div className="flex gap-3 items-center text-sm">
                    <a href={p.pdfUrls?.[lang] || p.pdfUrls?.en} target="_blank" rel="noreferrer" className="px-3 py-1 border rounded text-xs inline-flex items-center gap-1 hover:bg-slate-50">
                      <Download size={14} /> {t('research.card.pdf')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : admin.length === 0 ? (
          <div className="safe-card p-5 text-sm text-slate-500">{t('research.empty')}</div>
        ) : null}
      </div>
    </div>
  )
}
