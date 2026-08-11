// -----------------------------------------------------------------------------
// Supabase client + server-side archive search.
//
// When SUPABASE is configured (src/config.js), the Search page queries the
// `search_books` Postgres function instead of downloading the whole catalogue.
// The query is transliteration-folded with the SAME translit.js used to build
// the stored `search_key`, so typing Devanagari or Latin both match — exactly
// like the in-browser search, just done in the database.
// -----------------------------------------------------------------------------
import { createClient } from '@supabase/supabase-js'
import { SUPABASE } from '../config.js'
import { searchKey } from './translit.js'

export const usingSupabase = Boolean(SUPABASE.url && SUPABASE.anonKey)

const client = usingSupabase ? createClient(SUPABASE.url, SUPABASE.anonKey) : null

// Typo tolerance for fuzzy search (0..1). Lower = more forgiving/looser (more
// results, more noise); higher = stricter. 0.35 keeps common misspellings —
// "stvan" -> "stavan" — while trimming the loose-match noise.
const FUZZ = 0.35

// Run a server-side search. Filters mirror the client-side matcher:
//   keyword -> fuzzy (substring OR trigram) on the folded search key
//   language / topic -> exact match against the canonical facet arrays
//   author / tikakaar -> cross-script substring on the field key
//   onlyCommentary -> rows that have a Tikakaar
// Returns { rows, total }, where `total` is the full match count (for paging).
export async function searchBooks({
  keyword = '',
  language = '',
  topic = '',
  author = '',
  tikakaar = '',
  onlyCommentary = false,
  page = 1,
  perPage = 25,
} = {}) {
  if (!client) throw new Error('Supabase is not configured.')
  const { data, error } = await client.rpc('search_books', {
    q: searchKey(keyword),
    f_language: language || '',
    f_topic: topic || '',
    f_author: searchKey(author),
    f_tikakaar: searchKey(tikakaar),
    f_only_commentary: Boolean(onlyCommentary),
    lim: perPage,
    off: Math.max(0, (page - 1) * perPage),
    fuzz: FUZZ,
  })
  if (error) throw error
  const list = data || []
  const rows = list.map((r) => ({
    id: r.id,
    name: r.name,
    type: r.type,
    topic: r.type, // the UI's "topic" mirrors the Type column
    language: r.language,
    author: r.author,
    tikakaar: r.tikakaar,
    speciality: r.speciality,
  }))
  const total = list.length ? Number(list[0].total_count) : 0
  return { rows, total }
}
