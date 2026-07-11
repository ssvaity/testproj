import { useLanguage, LANGUAGES } from '../context/LanguageContext.jsx'

// Navbar language button — opens the language popup for selection.
export default function LanguageSwitcher() {
  const { lang, openPicker } = useLanguage()
  const current = LANGUAGES.find((l) => l.code === (lang || 'en'))

  return (
    <button
      type="button"
      onClick={openPicker}
      aria-label="Change language"
      className="flex h-10 items-center rounded-full px-3 text-sm font-bold text-ink/80 transition-colors hover:text-oxblood"
    >
      {current.short}
    </button>
  )
}
