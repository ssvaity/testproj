import { useEffect, useState } from 'react'

function getInitial() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* ignore */
  }
  // No saved choice → light. The OS preference is intentionally ignored so a
  // first visit always opens light, matching the pre-paint script in index.html.
  return 'light'
}

// `withLabel` renders a full-width menu row (icon + text) for the mobile
// dropdown; without it, the compact icon button used in the navbar.
export default function ThemeToggle({ withLabel = false, darkLabel = 'Dark mode', lightLabel = 'Light mode' }) {
  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
    // Let any other toggle instance (navbar ⇆ menu) mirror the change.
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
  }, [theme])

  useEffect(() => {
    const sync = (e) => {
      const next =
        e?.detail === 'dark' || e?.detail === 'light'
          ? e.detail
          : document.documentElement.classList.contains('dark')
            ? 'dark'
            : 'light'
      setTheme(next)
    }
    window.addEventListener('themechange', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('themechange', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const dark = theme === 'dark'
  const toggle = () => setTheme(dark ? 'light' : 'dark')
  const icon = dark ? 'light_mode' : 'dark_mode'
  const label = dark ? lightLabel : darkLabel

  if (withLabel) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-headline-md text-[17px] text-ink transition-colors hover:bg-cream-surface hover:text-oxblood"
      >
        <span className="material-symbols-outlined text-oxblood">{icon}</span>
        {label}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-surface hover:text-oxblood"
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  )
}
