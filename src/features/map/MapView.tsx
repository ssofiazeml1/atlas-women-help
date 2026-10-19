import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Search, ExternalLink, Phone } from 'lucide-react'
import {
  getCenters,
  subscribeContent,
  applySeedTransforms,
  type AdminCenter,
} from '../../lib/contentStore'
import { autoTranslateCached, geocodeAddress, pickLocalized } from '../../lib/translate'
import { getSeedCenters } from '../../lib/seeds'

// Fix default marker icons for Leaflet + Vite.
// The images are bundled from node_modules (instead of a CDN) so the pins
// always render, even when external requests are blocked.
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { CATEGORY_KEYS } from '../../lib/categories'
import { localizeSchedule, localizeLanguages } from '../../lib/humanize'
import { localizeCountry } from '../../lib/countries'
import { localizePublicDescription } from '../../lib/publicLocalization'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})




function normalizeCategories(c: AdminCenter): string[] {
  if (Array.isArray(c.categories) && c.categories.length) return c.categories
  if (c.category) return [c.category]
  return []
}

function FlyTo({ target }: { target: { lat: number; lng: number; zoom?: number } | null }) {
  const map = useMap()
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], target.zoom ?? 13, { duration: 1.1 })
    }
  }, [target, map])
  return null
}

export function MapView() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language || 'en').split('-')[0]

  const buildAll = (): AdminCenter[] => {
    const seeds = getSeedCenters().map<AdminCenter>((s) => ({
      id: s.id,
      name: s.name,
      city: s.city || '',
      country: s.country || '',
      description: s.description,
      contact: s.contact_phone,
      website: s.contact_web,
      address: s.address,
      email: s.email,
      hours: s.hours,
      cost: s.cost,
      languages: s.languages,
      lat: s.lat,
      lng: s.lng,
      category: s.category,
      categories: s.categories?.length ? s.categories : s.category ? [s.category] : [],
      open24: s.open24,
      createdAt: 0,
    }))
    const withOverrides = applySeedTransforms<AdminCenter>('centers', seeds)
    return [...getCenters(), ...withOverrides]
  }
  const [centers, setCenters] = useState<AdminCenter[]>(() => buildAll())
  useEffect(() => subscribeContent(() => setCenters(buildAll())), [])
  useEffect(() => setCenters(buildAll()), [i18n.language])

  // ---- Search ----
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number; zoom?: number } | null>(null)
  const [searchPin, setSearchPin] = useState<{ lat: number; lng: number; label: string } | null>(null)

  // ---- Filters ----
  const [filterCountry, setFilterCountry] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [only24, setOnly24] = useState(false)
  const [onlyFree, setOnlyFree] = useState(false)

  useEffect(() => {
    if (filterCountry === 'Germany') {
      setFlyTarget({ lat: 51.2, lng: 10.5, zoom: 6 })
    } else if (filterCountry === 'France') {
      setFlyTarget({ lat: 46.5, lng: 2.5, zoom: 5 })
    } else if (filterCountry === 'Россия') {
      setFlyTarget({ lat: 61.5, lng: 90, zoom: 3 })
    } else if (!filterCountry) {
      setFlyTarget({ lat: 49, lng: 6, zoom: 4 })
    }
  }, [filterCountry])
  const [visibleListCount, setVisibleListCount] = useState(40)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [flashId, setFlashId] = useState<string | null>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Countries come from the data itself: every newly added center brings its
  // country into the filter automatically (trimmed, case-insensitive unique).
  const countries = useMemo(() => {
    const map = new Map<string, string>()
    for (const c of centers) {
      const raw = (c.country || '').trim()
      if (!raw) continue
      const key = raw.toLowerCase()
      if (!map.has(key)) map.set(key, raw)
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b, lang))
  }, [centers, lang])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return centers.filter((c) => {
      const cats = normalizeCategories(c)
      const matchesText =
        !q ||
        [c.name, c.city, c.country, localizeCountry(c.country, lang), c.address, c.description]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      const matchesCountry =
        !filterCountry ||
        (c.country || '').trim().toLowerCase() === filterCountry.trim().toLowerCase()
      const matchesCat = !filterCat || cats.includes(filterCat)
      const matches24 = !only24 || c.open24 || /24\/?7|круглосуточно|24 hours/i.test(c.hours || '')
      const matchesFree = !onlyFree || c.cost === 'free'
      return matchesText && matchesCountry && matchesCat &&
        matches24 && matchesFree
    })
  }, [centers, query, filterCountry, filterCat, only24, onlyFree, lang])

  const visibleCenters = filtered.slice(0, visibleListCount)
  const selectedOutsideList = filtered.find(
    (center) => center.id === selectedId && !visibleCenters.some((visible) => visible.id === center.id),
  )

  useEffect(() => setVisibleListCount(40), [query, filterCountry, filterCat, only24, onlyFree])

  const catLabel = (k: string) => t(`categories.${k}`, { defaultValue: k })

  const handleSelectCard = (c: AdminCenter) => {
    setSelectedId(c.id)
    if (typeof c.lat === 'number' && typeof c.lng === 'number') {
      setFlyTarget({ lat: c.lat, lng: c.lng, zoom: 14 })
    }
  }

  const handleMarkerClick = (c: AdminCenter) => {
    const index = filtered.findIndex((item) => item.id === c.id)
    if (index >= 0) setVisibleListCount((count) => Math.max(count, index + 1))
    handleSelectCard(c)
    setFlashId(null)
    requestAnimationFrame(() => setFlashId(c.id))
  }

  useEffect(() => {
    if (!flashId) return
    const frame = requestAnimationFrame(() => {
      cardRefs.current[flashId]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    if (flashTimer.current) clearTimeout(flashTimer.current)
    flashTimer.current = setTimeout(() => setFlashId(null), 1800)
    return () => cancelAnimationFrame(frame)
  }, [flashId, visibleListCount])

  useEffect(() => () => {
    if (flashTimer.current) clearTimeout(flashTimer.current)
  }, [])

  const submitSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    const hit = filtered.find(
      (c) => c.name.toLowerCase().includes(q.toLowerCase()) && typeof c.lat === 'number'
    )
    if (hit && typeof hit.lat === 'number' && typeof hit.lng === 'number') {
      handleSelectCard(hit)
      return
    }
    setSearching(true)
    const res = await geocodeAddress(q)
    setSearching(false)
    if (res) {
      setFlyTarget({ lat: res.lat, lng: res.lng, zoom: 13 })
      setSearchPin({ lat: res.lat, lng: res.lng, label: res.displayName })
    }
  }

  const clearFilters = () => {
    setFilterCountry('')
    setFilterCat('')
    setOnly24(false)
    setOnlyFree(false)
    setQuery('')
    setSearchPin(null)
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-3 md:px-5 py-4 w-full">
      {/* Search + filters */}
      <form
        onSubmit={submitSearch}
        className="safe-card bg-white p-3 md:p-4 mb-4 flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <Search size={18} className="text-slate-500 shrink-0" />
          <label htmlFor="map-search" className="sr-only">{t('map.search')}</label>
          <input
            id="map-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('map.search_placeholder', { defaultValue: 'Country, city, address or organisation name…' })}
            className="flex-1 min-w-0 border border-slate-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-safe-teal"
          />
          <button
            type="submit"
            disabled={searching}
            className="bg-safe-800 text-white text-sm rounded-md px-3 md:px-4 py-2 hover:opacity-90 disabled:opacity-60 shrink-0"
          >
            {searching ? '…' : t('map.search', { defaultValue: 'Search' })}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            aria-label={t('map.all_countries')}
            className="border border-slate-200 rounded-md px-2 py-1.5 bg-white min-w-0"
          >
            <option value="">{t('map.all_countries', { defaultValue: 'All countries' })}</option>
            {countries.map((c) => <option key={c} value={c}>{localizeCountry(c, lang)}</option>)}
          </select>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            aria-label={t('map.all_categories')}
            className="border border-slate-200 rounded-md px-2 py-1.5 bg-white min-w-0"
          >
            <option value="">{t('map.all_categories', { defaultValue: 'All categories' })}</option>
            {CATEGORY_KEYS.map((k) => <option key={k} value={k}>{catLabel(k)}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="flex items-center gap-2 border border-slate-200 rounded-md px-2 py-1.5 bg-white cursor-pointer">
            <input type="checkbox" checked={only24} onChange={(e) => setOnly24(e.target.checked)} />
            <span>{t('map.only_24_7', { defaultValue: '24/7' })}</span>
          </label>
          <label className="flex items-center gap-2 border border-slate-200 rounded-md px-2 py-1.5 bg-white cursor-pointer">
            <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} />
            <span>{t('map.only_free', { defaultValue: 'Free' })}</span>
          </label>
        </div>

        {(filterCountry || filterCat || only24 || onlyFree || query || searchPin) && (
          <button
            type="button"
            onClick={clearFilters}
            className="self-start text-xs text-safe-800 underline"
          >
            {t('map.clear_filters', { defaultValue: 'Clear filters' })}
          </button>
        )}
      </form>

      {/* Map + list */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-4">
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-sky-50" style={{ height: 'min(70vh, 640px)' }}>
          <MapContainer
            center={[46.5, 2.5]}
            zoom={5}
            scrollWheelZoom
            preferCanvas
            attributionControl={false}
            className="h-full w-full"
            style={{ background: '#e0f2fe' }}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            />
            <FlyTo target={flyTarget} />
            {filtered
              .filter((c) => typeof c.lat === 'number' && typeof c.lng === 'number')
              .map((c) => (
                <CircleMarker
                  key={c.id}
                  center={[c.lat as number, c.lng as number]}
                  radius={selectedId === c.id ? 7 : 4}
                  pathOptions={{
                    color: selectedId === c.id ? '#0f766e' : '#155e75',
                    fillColor: selectedId === c.id ? '#14b8a6' : '#22d3ee',
                    fillOpacity: 0.8,
                    weight: selectedId === c.id ? 2 : 1,
                  }}
                  eventHandlers={{ click: () => handleMarkerClick(c) }}
                />
              ))}

            {searchPin && (
              <Marker position={[searchPin.lat, searchPin.lng]}>
                <Popup>{searchPin.label}</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {/* List */}
        <aside className="flex flex-col gap-3 lg:max-h-[min(70vh,640px)] lg:overflow-y-auto lg:pr-1">
          <div className="text-xs text-slate-500">
            {filtered.length === 0
              ? t('map.empty', { defaultValue: 'No organisations match the current filters.' })
              : t('map.found', { count: filtered.length, defaultValue: `Found: ${filtered.length}` })}
          </div>

          {selectedOutsideList && (
            <CenterCard
              c={selectedOutsideList}
              lang={lang}
              catLabel={catLabel}
              selected
              flash={flashId === selectedOutsideList.id}
              onSelect={() => handleSelectCard(selectedOutsideList)}
              cardRef={() => {}}
            />
          )}

          {visibleCenters.map((c) => (
            <CenterCard
              key={c.id}
              c={c}
              lang={lang}
              catLabel={catLabel}
              selected={selectedId === c.id}
              flash={flashId === c.id}
              onSelect={() => handleSelectCard(c)}
              cardRef={(el) => {
                cardRefs.current[c.id] = el
              }}
            />
          ))}

          {visibleListCount < filtered.length && (
            <button
              type="button"
              onClick={() => setVisibleListCount((count) => count + 40)}
              className="border border-safe-800 text-safe-800 rounded-md px-4 py-2 text-sm bg-white hover:bg-safe-50"
            >
              {t('map.show_more', { defaultValue: 'Показать ещё' })}
            </button>
          )}

          {centers.length === 0 && (
            <div className="safe-card text-sm text-slate-500 bg-white">
              {t('map.empty_all', { defaultValue: 'No data yet. Add organisations from the admin panel.' })}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function CenterCard({
  c,
  lang,
  catLabel,
  selected,
  flash,
  compact,
  onSelect,
  cardRef,
}: {
  c: AdminCenter
  lang: string
  catLabel: (k: string) => string
  selected: boolean
  flash?: boolean
  compact?: boolean
  onSelect: () => void
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const { t } = useTranslation()
  const rawDescription = pickLocalized(c, 'description', lang) || c.description || ''
  const staticDescription = localizePublicDescription(rawDescription, lang)
  const [description, setDescription] = useState(staticDescription)
  useEffect(() => {
    let active = true
    setDescription(staticDescription)
    if (staticDescription === rawDescription && rawDescription) {
      void autoTranslateCached(rawDescription, lang).then((value) => {
        if (active) setDescription(value)
      })
    }
    return () => { active = false }
  }, [rawDescription, staticDescription, lang])
  const address = pickLocalized(c, 'address', lang) || c.address
  const city = pickLocalized(c, 'city', lang) || c.city
  const country = localizeCountry(pickLocalized(c, 'country', lang) || c.country, lang)
  const cats = normalizeCategories(c)
  const costLabel =
    c.cost === 'free' ? t('card.cost_free')
      : c.cost === 'partial' ? t('card.cost_partial')
        : c.cost === 'paid' ? t('card.cost_paid')
          : ''
  const hoursLabel = c.open24
    ? t('sched.round_clock', { defaultValue: t('card.open_24_7') })
    : localizeSchedule(pickLocalized(c, 'hours', lang) || c.hours, t)
  const languagesLabel = localizeLanguages(pickLocalized(c, 'languages', lang) || c.languages, t)

  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect() } }}
      className={`safe-card bg-white cursor-pointer transition ${
        selected ? 'border-safe-teal ring-2 ring-safe-teal/40 shadow' : 'hover:border-safe-teal'
      } ${flash ? 'atlas-card-flash' : ''} ${compact ? 'atlas-popup-card' : ''}`}
      aria-label={c.name}
    >
      {c.photo && (
        <img
          src={c.photo}
          alt={c.name}
          loading="lazy"
          className={`w-full object-cover rounded-lg mb-3 ${compact ? 'h-24' : 'h-32'}`}
        />
      )}
      <h3 className="font-semibold text-safe-800 leading-snug">{c.name}</h3>
      <div className="text-xs text-slate-500 mt-0.5">
        {[city, country].filter(Boolean).join(', ')}
      </div>
      {/* Full address of the help point */}
      {(address || city || country) && (
        <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 mb-0.5">
            {t('card.full_address', { defaultValue: 'Полный адрес' })}
          </div>
          <div className="text-xs text-slate-700 leading-relaxed">
            {[address, city, country].filter(Boolean).join(', ')}
          </div>
          {!compact && typeof c.lat === 'number' && typeof c.lng === 'number' && (
            <a
              href={`https://maps.apple.com/?ll=${c.lat},${c.lng}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] text-teal-700 hover:underline mt-1 inline-block"
            >
              {t('card.open_in_osm', { defaultValue: 'Открыть точку на карте' })}
            </a>
          )}
        </div>
      )}


      {cats.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {cats.map((k) => (
            <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-safe-100 text-safe-800 border border-safe-200">
              {catLabel(k)}
            </span>
          ))}
        </div>
      )}

      <dl className="mt-3 grid grid-cols-1 gap-1 text-xs text-slate-700">
        {languagesLabel && (
          <div><dt className="inline text-slate-500">{t('card.languages')}: </dt><dd className="inline">{languagesLabel}</dd></div>
        )}
        {hoursLabel && (
          <div><dt className="inline text-slate-500">{t('card.hours')}: </dt><dd className="inline">{hoursLabel}</dd></div>
        )}
        {costLabel && (
          <div><dt className="inline text-slate-500">{t('card.cost')}: </dt><dd className="inline">{costLabel}</dd></div>
        )}
        {c.contact && (
          <div><dt className="inline text-slate-500">{t('card.phone')}: </dt><dd className="inline"><a href={`tel:${c.contact}`} className="text-teal-700" onClick={(e) => e.stopPropagation()}>{c.contact}</a></dd></div>
        )}
        {c.email && (
          <div className="min-w-0"><dt className="inline text-slate-500">{t('card.email')}: </dt><dd className="inline"><a href={`mailto:${c.email}`} className="text-teal-700 break-all" onClick={(e) => e.stopPropagation()}>{c.email}</a></dd></div>
        )}
      </dl>

      {description && (
        <p className={`text-sm text-slate-700 mt-3 leading-relaxed ${compact ? 'line-clamp-3' : ''}`}>{description}</p>
      )}

      {compact && (
        <div className="mt-3 text-xs text-safe-teal font-medium">
          {t('map.open_full_card', { defaultValue: 'Open full card' })} →
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {c.contact && (
          <a
            href={`tel:${c.contact}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 border border-safe-800 text-safe-800 text-xs rounded-md px-3 py-1.5 hover:bg-safe-800 hover:text-white transition"
          >
            <Phone size={14} /> {t('card.btn_call')}
          </a>
        )}
        {c.website && (
          <a
            href={c.website}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 border border-safe-800 text-safe-800 text-xs rounded-md px-3 py-1.5 hover:bg-safe-800 hover:text-white transition"
          >
            <ExternalLink size={14} /> {t('card.btn_website')}
          </a>
        )}
      </div>
    </div>
  )
}
