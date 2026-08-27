import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

// A small site guide that answers "where do I find…" questions. It posts to
// /api/chat, which holds the OpenRouter key and the assistant's brief — this
// component only carries the conversation and the UI.
export default function ChatWidget() {
  const { lang, t } = useLanguage()
  const c = t.chat
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Keep the newest message in view as the thread grows.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, busy])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Escape closes the panel, matching the site's other overlays.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function send(text) {
    const question = text.trim()
    if (!question || busy) return

    const next = [...messages, { role: 'user', content: question }]
    setMessages(next)
    setDraft('')
    setError(null)
    setBusy(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        // The proxy distinguishes "too many questions" and "not set up yet"
        // from a generic fault, so the visitor gets a useful sentence.
        setError(
          data.error === 'rate_limited'
            ? c.errorBusy
            : data.error === 'not_configured'
              ? c.errorUnavailable
              : c.error,
        )
        return
      }
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setError(c.errorNetwork)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? c.close : c.open}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-oxblood text-white shadow-lg transition hover:bg-oxblood-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          {open ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.5a8.4 8.4 0 01-9 8.4 9 9 0 01-3.6-.7L3 21l1.9-5A8.2 8.2 0 014 11.5 8.4 8.4 0 0112.5 3 8.4 8.4 0 0121 11.5z"
            />
          )}
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={c.title}
          className="fixed bottom-24 right-5 z-[90] flex max-h-[min(32rem,calc(100dvh-8rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-rule bg-parchment shadow-2xl sm:right-6"
        >
          <header className="shrink-0 border-b border-rule px-4 py-3">
            <p className="font-medium text-ink">{c.title}</p>
            <p className="text-xs text-text-muted">{c.subtitle}</p>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-text-muted">{c.greeting}</p>
                <div className="flex flex-wrap gap-2">
                  {c.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-rule px-3 py-1.5 text-xs text-sepia transition hover:border-olive hover:text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'ml-auto bg-oxblood text-white'
                    : 'mr-auto bg-cream-surface text-ink'
                }`}
              >
                {m.content}
              </div>
            ))}

            {busy && (
              <p className="mr-auto text-sm text-text-muted" aria-live="polite">
                {c.thinking}
              </p>
            )}
            {error && (
              <p className="mr-auto text-sm text-oxblood" role="alert">
                {error}
              </p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(draft)
            }}
            className="flex shrink-0 items-center gap-2 border-t border-rule px-3 py-3"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={c.placeholder}
              maxLength={1000}
              aria-label={c.placeholder}
              className="min-w-0 flex-1 rounded-full border border-rule bg-straw px-4 py-2 text-sm text-ink placeholder:text-text-muted focus:border-olive focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label={c.send}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-oxblood text-white transition hover:bg-oxblood-dark disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>

          <p className="shrink-0 border-t border-rule px-4 py-2 text-[11px] text-text-muted">{c.disclaimer}</p>
        </div>
      )}
    </>
  )
}
