import { useState } from 'react'

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

// iPhone-style on-screen Hindi keyboard. Writes into the input referenced by
// `inputRef`, keeping cursor position in sync via `value` / `setValue`.
export default function HindiKeyboard({ inputRef, value, setValue, onClose }) {
  const [kbPage, setKbPage] = useState('letters')

  const insertChar = (ch) => {
    const el = inputRef.current
    const start = el?.selectionStart ?? value.length
    const end = el?.selectionEnd ?? value.length
    const next = value.slice(0, start) + ch + value.slice(end)
    setValue(next)
    requestAnimationFrame(() => {
      if (!el) return
      el.focus()
      const pos = start + ch.length
      el.setSelectionRange(pos, pos)
    })
  }

  const backspaceChar = () => {
    const el = inputRef.current
    const start = el?.selectionStart ?? value.length
    const end = el?.selectionEnd ?? value.length
    if (start === 0 && end === 0) return
    let next
    let pos
    if (start !== end) {
      next = value.slice(0, start) + value.slice(end)
      pos = start
    } else {
      next = value.slice(0, start - 1) + value.slice(start)
      pos = start - 1
    }
    setValue(next)
    requestAnimationFrame(() => {
      if (!el) return
      el.focus()
      el.setSelectionRange(pos, pos)
    })
  }

  return (
    <div className="mt-3 rounded-2xl bg-surface-container-high p-2 shadow-sm sm:p-2.5">
      <div className="mb-1.5 flex items-center justify-between px-1">
        <p className="indic font-label-md text-label-md text-sepia">हिन्दी कीबोर्ड</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close keyboard"
          className="flex h-7 w-7 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface/60 hover:text-oxblood"
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
                className="flex h-10 flex-1 items-center justify-center rounded-md bg-surface text-[19px] leading-none text-ink shadow-[0_1px_1px_rgba(47,36,24,0.28)] transition-colors active:bg-cream-surface sm:h-11"
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
            className="h-10 flex-1 rounded-md bg-surface font-label-md text-label-md text-text-muted shadow-[0_1px_1px_rgba(47,36,24,0.28)] transition-colors active:bg-cream-surface sm:h-11"
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
  )
}
