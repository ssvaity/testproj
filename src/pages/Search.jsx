import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { sampleBooks } from '../data/sampleBooks.js'
import { useCart } from '../context/CartContext.jsx'

const emptyFilters = {
  keyword: '',
  language: '',
  topic: '',
  author: '',
  publisher: '',
}

const languages = [...new Set(sampleBooks.map((b) => b.language))].sort()
const topics = [...new Set(sampleBooks.map((b) => b.topic))].sort()

const topicCounts = sampleBooks.reduce((m, b) => {
  m[b.topic] = (m[b.topic] || 0) + 1
  return m
}, {})

const popularTexts =['Kalpa Sutra', 'Tattvartha Sutra', 'Yogashastra', 'Bhaktamar Stotra', 'Samayasara']

// iPhone-style Devanagari keyboard — a letters page and a "more" page for
// matras, marks & digits, toggled from the bottom row.
const KB_LETTERS = [
  ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'],
  ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ'],
  ['ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'],
  ['प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व'],
  ['श', 'ष', 'स', 'ह', 'क्ष', 'त्र', 'ज्ञ', 'अं', 'अः'],
]
const KB_MORE = [
  ['ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ'],
  ['ं', 'ः', 'ँ', '्', 'ृ', 'ॉ', 'ॐ', '।'],
  ['१', '२', '३', '४', '५', '६', '७', '८', '९', '०'],
]

const fieldClass =
  'w-full p-3 rounded-lg border border-warm focus:border-secondary-fixed-dim focus:ring-2 focus:ring-secondary-fixed-dim focus:ring-opacity-50 transition-shadow bg-white font-body-md text-body-md'
const labelClass = 'block font-label-md text-label-md text-on-surface mb-base'

export default function Search() {
  const { toggle, has } = useCart()
  const [searchParams] = useSearchParams()
  const initialKeyword = searchParams.get('q') || ''
  const initialFilters = { ...emptyFilters, keyword: initialKeyword }

  const [draft, setDraft] = useState(initialFilters)
  const [filters, setFilters] = useState(initialFilters)
  const [perPage, setPerPage] = useState(25)
  const [page, setPage] = useState(1)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [hasSearched, setHasSearched] = useState(Boolean(initialKeyword))
  const [hindiKb, setHindiKb] = useState(false)
  const [kbPage, setKbPage] = useState('letters')
  const keywordRef = useRef(null)

  // Insert a character from the on-screen keyboard at the cursor position.
  const insertChar = (ch) => {
    const el = keywordRef.current
    const start = el?.selectionStart ?? draft.keyword.length
    const end = el?.selectionEnd ?? draft.keyword.length
    const next = draft.keyword.slice(0, start) + ch + draft.keyword.slice(end)
    setDraft({ ...draft, keyword: next })
    requestAnimationFrame(() => {
      if (!el) return
      el.focus()
      const pos = start + ch.length
      el.setSelectionRange(pos, pos)
    })
  }

  const backspaceChar = () => {
    const el = keywordRef.current
    const start = el?.selectionStart ?? draft.keyword.length
    const end = el?.selectionEnd ?? draft.keyword.length
    if (start === 0 && end === 0) return
    let next
    let pos
    if (start !== end) {
      next = draft.keyword.slice(0, start) + draft.keyword.slice(end)
      pos = start
    } else {
      next = draft.keyword.slice(0, start - 1) + draft.keyword.slice(start)
      pos = start - 1
    }
    setDraft({ ...draft, keyword: next })
    requestAnimationFrame(() => {
      if (!el) return
      el.focus()
      el.setSelectionRange(pos, pos)
    })
  }

  const results = useMemo(() => {
    const kw = filters.keyword.trim().toLowerCase()
    return sampleBooks.filter((b) => {
      const matchesKeyword =
        !kw ||
        [b.name, b.author, b.publisher, b.topic, b.bhandar, b.id]
          .join(' ')
          .toLowerCase()
          .includes(kw)
      const matchesLanguage = !filters.language || b.language === filters.language
      const matchesTopic = !filters.topic || b.topic === filters.topic
      const matchesAuthor =
        !filters.author ||
        b.author.toLowerCase().includes(filters.author.trim().toLowerCase())
      const matchesPublisher =
        !filters.publisher ||
        b.publisher.toLowerCase().includes(filters.publisher.trim().toLowerCase())
      return (
        matchesKeyword &&
        matchesLanguage &&
        matchesTopic &&
        matchesAuthor &&
        matchesPublisher
      )
    })
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(results.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = results.slice((currentPage - 1) * perPage, currentPage * perPage)

  const update = (key) => (e) => setDraft({ ...draft, [key]: e.target.value })

  const runSearch = (e) => {
    e.preventDefault()
    setFilters(draft)
    setPage(1)
    setHasSearched(true)
  }

  // Run a search directly from a suggestion (bypasses the input draft state)
  const runWith = (patch) => {
    const next = { ...emptyFilters, ...patch }
    setDraft(next)
    setFilters(next)
    setPage(1)
    setHasSearched(true)
  }

  const newSearch = () => {
    setDraft(emptyFilters)
    setFilters(emptyFilters)
    setPage(1)
    setShowAdvanced(false)
    setHasSearched(false)
  }

  const clearAll = () => {
    setDraft(emptyFilters)
    setFilters(emptyFilters)
    setPage(1)
  }

  const clearOne = (key) => {
    setDraft({ ...draft, [key]: '' })
    setFilters({ ...filters, [key]: '' })
    setPage(1)
  }

  // Active advanced filters, summarised for the "current search" chips
  const advancedChips = [
    filters.language && { key: 'language', label: filters.language },
    filters.topic && { key: 'topic', label: filters.topic },
    filters.author && { key: 'author', label: `Author: ${filters.author}` },
    filters.publisher && { key: 'publisher', label: `Publisher: ${filters.publisher}` },
  ].filter(Boolean)

  const pageNumbers = useMemo(() => {
    const nums = []
    for (let i = 1; i <= totalPages; i += 1) nums.push(i)
    return nums
  }, [totalPages])

  return (
    <>
      <div className={hasSearched ? '' : 'mx-auto max-w-3xl pt-stack-md'}>
        {/* Header */}
        {hasSearched ? (
          <div className="mb-stack-sm flex items-center justify-between gap-4">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-sepia">
              The archive
            </h1>
            <button
              type="button"
              onClick={newSearch}
              className="inline-flex items-center gap-1.5 rounded-full border border-warm px-4 py-2 font-label-md text-label-md text-text-muted transition-colors hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              New search
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="eyebrow mb-3">The catalogue</p>
            <h1 className="mb-base font-headline-lg text-headline-lg-mobile md:text-headline-xl text-sepia">
              What are you looking for?
            </h1>
            <p className="font-body-lg text-body-lg text-text-muted">
              Search over 80,000 manuscripts by title, author, language, bhandar or topic.
            </p>
          </div>
        )}

        {/* Search box */}
        <form onSubmit={runSearch} className={hasSearched ? 'mb-stack-md' : 'mt-stack-md'}>
          <div className="rounded-2xl border border-warm bg-white p-2 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-secondary-fixed-dim focus-within:ring-opacity-50">
            <div className="flex items-center gap-3 px-3 pt-2.5">
              <span className="material-symbols-outlined text-secondary-fixed-dim">search</span>
              <input
                ref={keywordRef}
                className="flex-1 bg-transparent font-body-md text-body-md text-on-surface outline-none placeholder:text-text-muted"
                id="keyword"
                placeholder="Search titles, authors, quotes, bhandars…"
                type="text"
                autoComplete="off"
                value={draft.keyword}
                onChange={update('keyword')}
              />
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 px-1 pb-1">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setShowAdvanced((v) => !v)}
                  aria-expanded={showAdvanced}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-label-md text-label-md text-text-muted transition-colors hover:bg-surface-container-low"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  Advanced options
                  <span
                    className={`material-symbols-outlined text-[18px] transition-transform ${
                      showAdvanced ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setHindiKb((v) => !v)}
                  aria-pressed={hindiKb}
                  title="हिन्दी कीबोर्ड"
                  className={`indic inline-flex items-center rounded-full px-3 py-2 font-label-md text-label-md transition-colors ${
                    hindiKb ? 'bg-cream-surface text-oxblood' : 'text-text-muted hover:bg-surface-container-low'
                  }`}
                >
                  हिन्दी
                </button>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 font-label-md text-label-md text-white shadow-sm transition-colors hover:bg-maroon-dark"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  search
                </span>
                Search
              </button>
            </div>
          </div>

          {/* On-screen Hindi keyboard — iPhone style */}
          {hindiKb && (
            <div className="mt-3 rounded-2xl bg-[#e6e1d5] p-2 shadow-sm sm:p-2.5">
              <div className="mb-1.5 flex items-center justify-between px-1">
                <p className="indic font-label-md text-label-md text-sepia">हिन्दी कीबोर्ड</p>
                <button
                  type="button"
                  onClick={() => setHindiKb(false)}
                  aria-label="Close keyboard"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-white/60 hover:text-oxblood"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {(kbPage === 'letters' ? KB_LETTERS : KB_MORE).map((row, r) => (
                  <div key={r} className="flex justify-center gap-1.5">
                    {row.map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          insertChar(ch)
                        }}
                        className="flex h-10 flex-1 items-center justify-center rounded-md bg-white text-[19px] leading-none text-ink shadow-[0_1px_1px_rgba(47,36,24,0.28)] transition-colors active:bg-cream-surface sm:h-11"
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                ))}

                {/* Bottom row: page toggle · space · backspace */}
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      setKbPage((p) => (p === 'letters' ? 'more' : 'letters'))
                    }}
                    className="flex h-10 w-16 items-center justify-center rounded-md bg-black/5 font-label-md text-sm text-ink shadow-[0_1px_1px_rgba(47,36,24,0.2)] transition-colors active:bg-black/10 sm:h-11"
                  >
                    {kbPage === 'letters' ? '१२३' : 'अ'}
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      insertChar(' ')
                    }}
                    className="h-10 flex-1 rounded-md bg-white font-label-md text-label-md text-text-muted shadow-[0_1px_1px_rgba(47,36,24,0.28)] transition-colors active:bg-cream-surface sm:h-11"
                  >
                    Space
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      backspaceChar()
                    }}
                    aria-label="Backspace"
                    className="flex h-10 w-16 items-center justify-center rounded-md bg-black/5 text-ink shadow-[0_1px_1px_rgba(47,36,24,0.2)] transition-colors active:bg-black/10 sm:h-11"
                  >
                    <span className="material-symbols-outlined text-[20px]">backspace</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active filter chips */}
          {advancedChips.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {advancedChips.map((c) => (
                <span
                  key={c.key}
                  className="inline-flex items-center gap-1 rounded-full bg-cream-surface px-3 py-1.5 font-label-md text-label-md text-sepia"
                >
                  {c.label}
                  <button
                    type="button"
                    onClick={() => clearOne(c.key)}
                    aria-label={`Remove ${c.label}`}
                    className="text-text-muted transition-colors hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Advanced options panel */}
          {showAdvanced && (
            <div className="mt-4 rounded-xl border border-warm bg-surface-container-lowest p-stack-md shadow-sm">
              <div className="mb-stack-sm flex items-center justify-between">
                <p className="font-label-md text-label-md text-sepia">Advanced options</p>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(false)}
                  aria-label="Close advanced options"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-container-low hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className={labelClass} htmlFor="language">
                    Language
                  </label>
                  <select className={fieldClass} id="language" value={draft.language} onChange={update('language')}>
                    <option value="">All Languages</option>
                    {languages.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="topic">
                    Topic
                  </label>
                  <select className={fieldClass} id="topic" value={draft.topic} onChange={update('topic')}>
                    <option value="">All Topics</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="author">
                    Author
                  </label>
                  <input
                    className={fieldClass}
                    id="author"
                    placeholder="E.g., Acharya..."
                    type="text"
                    value={draft.author}
                    onChange={update('author')}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="publisher">
                    Publisher / Bhandar
                  </label>
                  <input
                    className={fieldClass}
                    id="publisher"
                    placeholder="E.g., LD Institute..."
                    type="text"
                    value={draft.publisher}
                    onChange={update('publisher')}
                  />
                </div>
              </div>

              <div className="mt-stack-md flex justify-end gap-4">
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-lg border border-primary px-6 py-2 font-label-md text-label-md text-primary transition-colors hover:bg-surface-container-low"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-6 py-2 font-label-md text-label-md text-white shadow-sm transition-colors hover:bg-maroon-dark"
                >
                  Apply filters
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Suggestions (before any search) OR results (after a search) */}
      {!hasSearched ? (
        <div className="mx-auto mt-stack-lg max-w-4xl">
          <p className="eyebrow mb-3">Popular texts</p>
          <div className="mb-stack-md flex flex-wrap gap-2">
            {popularTexts.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => runWith({ keyword: t })}
                className="rounded-full border border-warm bg-white px-4 py-2 font-label-md text-label-md text-sepia transition-colors hover:border-oxblood hover:text-oxblood"
              >
                {t}
              </button>
            ))}
          </div>

          <p className="eyebrow mb-3">Browse by topic</p>
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => runWith({ topic: t })}
                className="group flex items-center gap-4 rounded-xl border border-warm bg-white p-4 text-left shadow-sm transition-colors hover:border-oxblood/40 hover:bg-cream-surface/40"
              >
                <span className="min-w-0">
                  <span className="block font-headline-md text-[17px] text-ink">{t}</span>
                  <span className="block text-sm text-text-muted">
                    {topicCounts[t]} {topicCounts[t] === 1 ? 'text' : 'texts'}
                  </span>
                </span>
                <span className="material-symbols-outlined ml-auto text-text-muted transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Results Summary */}
          <div className="mb-stack-sm flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-body-md text-body-md text-text-muted">
              Found <strong className="text-on-surface">{results.length.toLocaleString()}</strong>{' '}
              {results.length === 1 ? 'result' : 'results'}
            </p>
            <div className="flex items-center gap-2">
              <label className="font-label-md text-label-md text-text-muted" htmlFor="perPage">
                Results per page:
              </label>
              <select
                id="perPage"
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value))
                  setPage(1)
                }}
                className="cursor-pointer rounded-lg border border-warm bg-white px-3 py-2 font-body-md text-sm text-body-md transition-shadow focus:border-secondary-fixed-dim focus:ring-1 focus:ring-secondary-fixed-dim"
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>

          {/* Results — editorial list */}
          <div className="mb-stack-md">
            {/* Column header */}
            <div className="hidden items-center gap-4 border-b border-warm pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted sm:flex">
              <span className="w-8 shrink-0">No.</span>
              <span className="flex-1">Manuscript</span>
              <span className="w-40 shrink-0">Language / Topic</span>
              <span className="w-12 shrink-0">Year</span>
              <span className="w-[6rem] shrink-0 text-right">Request</span>
            </div>

            {pageRows.length === 0 ? (
              <div className="border-b border-warm py-12 text-center text-text-muted">
                No books match your search.
              </div>
            ) : (
              <ul>
                {pageRows.map((b, i) => {
                  const inCart = has(b.id)
                  const num = String((currentPage - 1) * perPage + i + 1).padStart(2, '0')
                  return (
                    <li key={b.id} className="group border-b border-warm">
                      <div className="flex items-start gap-4 py-5">
                        <span className="hidden w-8 shrink-0 pt-1 text-sm tabular-nums text-text-muted sm:block">
                          {num}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-headline-md text-[19px] leading-snug text-ink transition-colors group-hover:text-oxblood">
                            {b.name}
                          </p>
                          <p className="mt-0.5 text-sm text-text-muted">
                            {[b.author, b.bhandar].filter(Boolean).join(' · ')}
                          </p>
                          <p className="mt-1 text-sm text-text-muted sm:hidden">
                            {b.language} · {b.topic} · {b.year}
                          </p>
                        </div>
                        <div className="hidden w-40 shrink-0 pt-1 text-sm text-text-muted sm:block">
                          {b.language} · {b.topic}
                        </div>
                        <div className="hidden w-12 shrink-0 pt-1 text-sm tabular-nums text-text-muted sm:block">
                          {b.year}
                        </div>
                        <div className="w-[6rem] shrink-0 text-right">
                          <button
                            type="button"
                            onClick={() => toggle(b)}
                            aria-pressed={inCart}
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-label-md text-label-md transition-colors ${
                              inCart
                                ? 'bg-primary text-white hover:bg-maroon-dark'
                                : 'border border-warm text-oxblood hover:border-oxblood hover:bg-cream-surface'
                            }`}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                              {inCart ? 'check' : 'add'}
                            </span>
                            {inCart ? 'Added' : 'Add'}
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
              className="rounded-lg border border-warm px-4 py-2 font-label-md text-label-md text-text-muted transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {pageNumbers.map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-10 w-10 rounded-lg font-label-md text-label-md ${
                  n === currentPage
                    ? 'bg-primary text-white shadow-sm'
                    : 'border border-warm text-on-surface transition-colors hover:bg-surface-container-low'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage(currentPage + 1)}
              className="rounded-lg border border-warm px-4 py-2 font-label-md text-label-md text-text-muted transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  )
}
