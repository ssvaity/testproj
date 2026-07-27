import { useEffect, useState } from 'react'
import { getBooks } from '../lib/booksStore.js'

// Loads the archive catalogue once and exposes { books, loading, error }.
// Backed by the shared cache in booksStore, so navigating away and back does
// not re-fetch. Pass `enabled = false` (e.g. when Supabase server-search is on)
// to skip the whole-catalogue fetch entirely.
export function useBooks(enabled = true) {
  const [state, setState] = useState({ books: [], loading: enabled, error: null })

  useEffect(() => {
    if (!enabled) {
      setState({ books: [], loading: false, error: null })
      return undefined
    }
    let alive = true
    getBooks().then(
      (books) => alive && setState({ books, loading: false, error: null }),
      (error) => alive && setState({ books: [], loading: false, error }),
    )
    return () => {
      alive = false
    }
  }, [enabled])

  return state
}
