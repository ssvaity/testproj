// -----------------------------------------------------------------------------
// Library data source — Sanity CMS with a graceful sample-data fallback.
//
// When SANITY.projectId is set (see src/config.js), the Library page reads its
// books from the hosted Sanity Studio. Until then, it uses the built-in
// sampleLibrary so the page keeps working out of the box.
//
// The GROQ query below maps Sanity documents onto the exact shape Library.jsx
// already expects, so the UI needs no knowledge of where the data came from:
//   { id, title, author, language, topic, year, pages, summary,
//     previewUrl, downloadUrl,
//     chapters: [ { title, pages, previewUrl, downloadUrl } ] }
// -----------------------------------------------------------------------------
import { createClient } from '@sanity/client'
import { SANITY } from '../config.js'
import { sampleLibrary } from '../data/sampleLibrary.js'

export const usingSanity = Boolean(SANITY.projectId)

const client = usingSanity
  ? createClient({
      projectId: SANITY.projectId,
      dataset: SANITY.dataset || 'production',
      apiVersion: '2024-01-01', // fixed date = stable, cache-friendly API behaviour
      useCdn: true, // fast, cached reads (public catalogue — no draft/preview needed)
    })
  : null

// A chapter's readable link falls back to its download PDF when no separate
// preview file was uploaded; same idea for the whole-book preview.
const LIBRARY_QUERY = `*[_type == "book"] | order(title asc){
  "id": _id,
  title,
  author,
  language,
  topic,
  year,
  pages,
  summary,
  "downloadUrl": coalesce(fullBookPdf.asset->url, previewPdf.asset->url),
  "previewUrl": coalesce(previewPdf.asset->url, fullBookPdf.asset->url),
  "chapters": chapters[]{
    title,
    pages,
    "downloadUrl": coalesce(pdf.asset->url, previewPdf.asset->url),
    "previewUrl": coalesce(previewPdf.asset->url, pdf.asset->url)
  }
}`

// Fetch the catalogue. Never throws — on any failure (or before Sanity is
// configured) it returns the sample library so the page still renders.
export async function getLibrary() {
  if (!client) return sampleLibrary
  try {
    const books = await client.fetch(LIBRARY_QUERY)
    return Array.isArray(books) && books.length ? books : sampleLibrary
  } catch (err) {
    console.error('Sanity library fetch failed — falling back to sample data.', err)
    return sampleLibrary
  }
}
