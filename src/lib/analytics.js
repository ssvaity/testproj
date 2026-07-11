import { GA_MEASUREMENT_ID } from '../config.js'

// Loads Google Analytics 4 once, only when a Measurement ID is configured.
// Called from main.jsx at startup. No-op when GA_MEASUREMENT_ID is empty.
export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof document === 'undefined') return
  if (document.getElementById('ga4-src')) return

  const script = document.createElement('script')
  script.id = 'ga4-src'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID)
}

// Fires a GA4 event when analytics is active; otherwise silently does nothing.
export function trackEvent(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

// Counts a download across all users. View the total in GA under the
// `book_download` event.
export function trackDownload(book) {
  trackEvent('book_download', {
    book_id: book.id,
    book_title: book.title,
  })
}
