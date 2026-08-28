import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { seo } from '../data/seo.js'

// Catch-all for addresses that do not exist. Previously these rendered an empty
// layout, which search engines record as a "soft 404" — an error page returning
// a success status. The noindex tag on this page (see src/data/seo.js) is what
// keeps mistyped and outdated URLs out of the search index; a single-page app
// served from static hosting cannot return a real 404 status by itself.
export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] flex-col items-center justify-center py-stack-lg text-center">
      <Seo {...seo.notFound} />

      <p className="eyebrow mb-3">404</p>
      <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-sepia">
        This page could not be found
      </h1>
      <p className="mt-3 max-w-md font-body-lg text-body-lg text-text-muted">
        The page you are looking for may have been moved or may never have existed. The archive and the library are
        both a click away.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-label-md text-label-md text-straw shadow-sm transition-colors hover:bg-maroon-dark"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>search</span>
          Search the archive
        </Link>
        <Link
          to="/library"
          className="inline-flex items-center gap-2 rounded-full border border-warm px-6 py-2.5 font-label-md text-label-md text-sepia transition-colors hover:bg-surface-container-lowest"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>menu_book</span>
          Browse the library
        </Link>
        <Link to="/" className="px-2 font-label-md text-label-md text-text-muted underline transition-colors hover:text-ink">
          Go home
        </Link>
      </div>
    </div>
  )
}
