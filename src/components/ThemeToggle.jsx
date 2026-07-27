import { useEffect, useState } from 'react'

function getInitial() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* ignore */
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-surface hover:text-oxblood"
    >
      <span className="material-symbols-outlined">{dark ? 'light_mode' : 'dark_mode'}</span>
    </button>
  )
}
