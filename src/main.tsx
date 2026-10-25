import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import './i18n/config'  // initialize i18next + language detector early

const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter

// Links opened from messengers and assistants can arrive with tracking
// parameters such as `utm_source=chatgpt.com`. They are not needed by Atlas
// and should not remain visible when a visitor moves between sections.
function removeExternalTrackingFromAddress() {
  const url = new URL(window.location.href)
  const trackingKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'source', 'ref']
  let changed = false

  for (const key of trackingKeys) {
    if (url.searchParams.has(key)) {
      url.searchParams.delete(key)
      changed = true
    }
  }

  const hash = url.hash.slice(1)
  const separator = hash.indexOf('?')
  if (separator >= 0) {
    const path = hash.slice(0, separator)
    const params = new URLSearchParams(hash.slice(separator + 1))
    for (const key of trackingKeys) {
      if (params.has(key)) {
        params.delete(key)
        changed = true
      }
    }
    const query = params.toString()
    url.hash = `${path}${query ? `?${query}` : ''}`
  }

  if (changed) window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}

removeExternalTrackingFromAddress()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
