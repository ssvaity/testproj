// -----------------------------------------------------------------------------
// Archive catalogue data layer.
//
// The archive (Search page) reads its list of manuscripts from a Google Sheet
// that you keep in a normal spreadsheet. Edit the sheet, and the site shows the
// new data on the next page load — no code change and no server needed.
//
// HOW IT WORKS
//   1. Your catalogue lives in a Google Sheet (import New Catalogue.xlsx once).
//   2. In the sheet:  File -> Share -> Publish to web -> pick the sheet ->
//      choose "Comma-separated values (.csv)" -> Publish. Copy that URL.
//   3. Paste the URL into BOOKS_SHEET_CSV_URL in src/config.js.
//   That's it. The site fetches the latest rows and searches them in-browser.
//
// If BOOKS_SHEET_CSV_URL is empty, the archive throws a clear error (there is
// no bundled sample list — the catalogue comes only from the sheet).
//
// Expected columns (header row, any order — matched by name, else by position):
//   Granth Name | Type | Language | Karta | Tikakaar | Speciality
// -----------------------------------------------------------------------------
import { BOOKS_SHEET_CSV_URL } from '../config.js'
import { searchKey, searchTokens } from './translit.js'
import { languagesOf, genresOf } from './catalogFacets.js'

// --- CSV parsing (RFC 4180: quotes, escaped "", commas & newlines in fields) --
export function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  let i = 0
  const endField = () => {
    row.push(field)
    field = ''
  }
  const endRow = () => {
    rows.push(row)
    row = []
  }
  while (i < text.length) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i += 2
          continue
        }
        inQuotes = false
        i += 1
        continue
      }
      field += c
      i += 1
      continue
    }
    if (c === '"') {
      inQuotes = true
      i += 1
    } else if (c === ',') {
      endField()
      i += 1
    } else if (c === '\r') {
      i += 1
    } else if (c === '\n') {
      endField()
      endRow()
      i += 1
    } else {
      field += c
      i += 1
    }
  }
  // Flush the final field/row when the file doesn't end in a newline.
  if (field.length > 0 || row.length > 0) {
    endField()
    endRow()
  }
  return rows
}

// --- Header matching --------------------------------------------------------
// Map a spreadsheet header to one of our field keys. Order here also defines the
// positional fallback used when a header can't be recognised by name.
const FIELD_ORDER = ['name', 'type', 'language', 'author', 'tikakaar', 'speciality']
const HEADER_SYNONYMS = {
  name: ['granth name', 'name', 'title', 'granth', 'book name', 'grantha'],
  type: ['type', 'prakar', 'category', 'topic', 'vishay'],
  language: ['language', 'bhasha', 'lang'],
  author: ['karta', 'kartha', 'author', 'writer'],
  tikakaar: ['tikakaar', 'tikakar', 'commentator', 'tika', 'teekakar'],
  speciality: ['speciality', 'specialty', 'note', 'notes', 'remark', 'remarks', 'vishesh'],
}

const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ')

function buildColumnIndex(headerRow) {
  const headers = headerRow.map(norm)
  const index = {}
  for (const key of FIELD_ORDER) {
    const wanted = HEADER_SYNONYMS[key]
    const found = headers.findIndex((h) => wanted.includes(h))
    index[key] = found === -1 ? FIELD_ORDER.indexOf(key) : found
  }
  return index
}

// --- Rows -> book objects ---------------------------------------------------
function rowsToBooks(rows) {
  if (!rows.length) return []
  const index = buildColumnIndex(rows[0])
  const cell = (row, key) => String(row[index[key]] ?? '').trim()
  const books = []
  for (let r = 1; r < rows.length; r += 1) {
    const row = rows[r]
    if (!row.some((c) => String(c ?? '').trim() !== '')) continue // skip blank rows
    const name = cell(row, 'name')
    if (!name) continue // a row with no title isn't a usable record
    const type = cell(row, 'type')
    const author = cell(row, 'author')
    const language = cell(row, 'language')
    const tikakaar = cell(row, 'tikakaar')
    const speciality = cell(row, 'speciality')
    books.push({
      // Stable within a load; the request cart keys off this. Row-based so it
      // survives edits to other rows.
      id: `r${books.length + 1}`,
      name,
      type,
      topic: type, // alias: the UI's "topic" filter uses the Type column
      language,
      author,
      tikakaar,
      speciality,
      // Cross-script search key (Devanagari <-> Latin). Computed once per load.
      _key: searchKey([name, type, language, author, tikakaar, speciality].join(' ')),
      // Per-word tokens for the fuzzy (typo-tolerant) matcher.
      _tokens: searchTokens([name, type, language, author, tikakaar, speciality].join(' ')),
      // Per-field cross-script keys so the Author / Commentator filters match
      // whether the visitor types Latin or Devanagari.
      _authorKey: searchKey(author),
      _tikKey: searchKey(tikakaar),
      // Canonical facet sets for the clean Language/Type dropdowns.
      _langs: languagesOf(language),
      _genres: genresOf(type),
    })
  }
  return books
}

// --- Public API -------------------------------------------------------------
let cache = null

async function loadBooks() {
  if (!BOOKS_SHEET_CSV_URL) throw new Error('No catalogue URL is configured.')
  const res = await fetch(BOOKS_SHEET_CSV_URL)
  if (!res.ok) throw new Error(`Could not load the catalogue (HTTP ${res.status})`)
  const books = rowsToBooks(parseCsv(await res.text()))
  if (!books.length) throw new Error('The catalogue sheet has no rows yet.')
  return books
}

// Returns a cached promise so the whole catalogue is fetched at most once per
// SPA session. A hard page reload re-fetches, which is how sheet edits show up.
export function getBooks() {
  if (!cache) cache = loadBooks()
  return cache
}

// Force the next getBooks() to re-fetch (e.g. a manual "refresh" button).
export function refreshBooks() {
  cache = null
  return getBooks()
}

export const usingLiveSheet = Boolean(BOOKS_SHEET_CSV_URL)
