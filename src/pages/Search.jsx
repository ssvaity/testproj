import { useMemo, useState } from 'react'
import { sampleBooks } from '../data/sampleBooks.js'
import './Search.css'

const emptyFilters = {
  keyword: '',
  language: '',
  topic: '',
  author: '',
  publisher: '',
}

const languages = [...new Set(sampleBooks.map((b) => b.language))].sort()
const topics = [...new Set(sampleBooks.map((b) => b.topic))].sort()

export default function Search() {
  const [draft, setDraft] = useState(emptyFilters)
  const [filters, setFilters] = useState(emptyFilters)
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)

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
  const pageRows = results.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  const update = (key) => (e) => setDraft({ ...draft, [key]: e.target.value })

  const runSearch = (e) => {
    e.preventDefault()
    setFilters(draft)
    setPage(1)
  }

  const clearAll = () => {
    setDraft(emptyFilters)
    setFilters(emptyFilters)
    setPage(1)
  }

  return (
    <div className="search-page">
      <div className="search-head">
        <h1>Search the Collection</h1>
        <p className="search-sub">
          Find books by name, author, publisher, language, or topic.
        </p>
      </div>

      <form className="search-panel" onSubmit={runSearch}>
        <div className="search-fields">
          <input
            className="field field-main"
            type="text"
            placeholder="Search by book name or keyword…"
            value={draft.keyword}
            onChange={update('keyword')}
          />
          <select className="field" value={draft.language} onChange={update('language')}>
            <option value="">All Languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select className="field" value={draft.topic} onChange={update('topic')}>
            <option value="">All Topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <input
            className="field"
            type="text"
            placeholder="Author…"
            value={draft.author}
            onChange={update('author')}
          />
          <input
            className="field"
            type="text"
            placeholder="Publisher…"
            value={draft.publisher}
            onChange={update('publisher')}
          />
        </div>
        <div className="search-actions">
          <button type="submit" className="btn btn-primary">Search</button>
          <button type="button" className="btn btn-ghost" onClick={clearAll}>Clear</button>
        </div>
      </form>

      <div className="results-toolbar">
        <span className="results-count">
          <strong>{results.length}</strong> {results.length === 1 ? 'result' : 'results'}
        </span>
        <label className="per-page">
          Per page
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value))
              setPage(1)
            }}
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th>Book No</th>
              <th>Name</th>
              <th>Bhandar</th>
              <th>Language</th>
              <th>Topic</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={9} className="empty-row">No books match your search.</td>
              </tr>
            ) : (
              pageRows.map((b) => (
                <tr key={b.id}>
                  <td className="mono">{b.id}</td>
                  <td className="cell-name">{b.name}</td>
                  <td>{b.bhandar}</td>
                  <td>{b.language}</td>
                  <td>{b.topic}</td>
                  <td>{b.author || '—'}</td>
                  <td>{b.publisher}</td>
                  <td className="mono">{b.year}</td>
                  <td>
                    <a className="btn btn-source" href="#">View ↗</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage <= 1}
          onClick={() => setPage(currentPage - 1)}
        >
          ‹ Previous
        </button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button
          className="page-btn"
          disabled={currentPage >= totalPages}
          onClick={() => setPage(currentPage + 1)}
        >
          Next ›
        </button>
      </div>
    </div>
  )
}
