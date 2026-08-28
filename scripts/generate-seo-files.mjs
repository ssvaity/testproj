// -----------------------------------------------------------------------------
// Generate dist/robots.txt and dist/sitemap.xml after a production build.
//
//   npm run build          (runs automatically — see package.json)
//   node scripts/generate-seo-files.mjs
//
// Both files must carry the site's real domain, so they are generated from
// SITE_URL in src/config.js rather than checked in by hand. That keeps one
// source of truth: change the domain there and these follow.
//
// robots.txt tells crawlers what to fetch; sitemap.xml lists the pages worth
// indexing. Submit the sitemap once in Google Search Console
// (https://search.google.com/search-console) and Bing Webmaster Tools.
// -----------------------------------------------------------------------------
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { SITE_URL } from '../src/config.js'

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

// Public pages, most important first. `changefreq` and `priority` are hints
// only — search engines weigh them lightly, but they cost nothing to state.
//
// /requests and /intro-demo are deliberately absent: they are marked noindex in
// src/data/seo.js, and a sitemap must never advertise a page you don't want
// indexed. Add new public routes here when you add them to src/App.jsx.
const ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/library', changefreq: 'weekly', priority: '0.9' },
  { path: '/search', changefreq: 'weekly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'yearly', priority: '0.5' },
]

const base = SITE_URL.replace(/\/$/, '')
const lastmod = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${base}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# A visitor's own request list and the internal animation demo have nothing
# useful to show someone arriving from a search engine.
Disallow: /requests
Disallow: /intro-demo

Sitemap: ${base}/sitemap.xml
`

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true })
writeFileSync(join(DIST, 'sitemap.xml'), sitemap)
writeFileSync(join(DIST, 'robots.txt'), robots)

// Link scrapers (WhatsApp, X, Slack) need an ABSOLUTE og:image — a relative
// path is unreliable and often silently dropped. index.html keeps the relative
// path so the domain lives in one place; it is rewritten here at build time.
// (Seo.jsx does the same at runtime for each page's own image.)
const indexPath = join(DIST, 'index.html')
if (existsSync(indexPath)) {
  const html = readFileSync(indexPath, 'utf8')
  const absolute = html.replace(/(property="og:image" content=")\/(?!\/)/, `$1${base}/`)
  if (absolute !== html) {
    writeFileSync(indexPath, absolute)
    console.log(`[seo] rewrote og:image in dist/index.html to an absolute URL`)
  }
}

console.log(`[seo] wrote dist/robots.txt and dist/sitemap.xml (${ROUTES.length} URLs) for ${base}`)
