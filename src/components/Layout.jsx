import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Footer from './Footer.jsx'
import FlowingMenu from './FlowingMenu.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import LanguageModal from './LanguageModal.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { FolioSweep } from './PageTransition.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Layout() {
  const { count } = useCart()
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const reduce = useReducedMotion()

  // Full menu — all pages, always shown.
  const menuItems = [
    { link: '/', text: t.nav.home, image: '/images/hero-garden.jpg' },
    { link: '/about', text: t.nav.about, image: '/images/manuscript-texture.png' },
    { link: '/search', text: t.nav.archive, image: '/images/pages/p1.jpg' },
    { link: '/library', text: t.nav.library, image: '/images/manuscript-cover.jpg' },
    {
      link: '/requests',
      text: count > 0 ? `${t.requestCart} (${count})` : t.requestCart,
      image: '/images/manuscript-cover.jpg',
    },
    { link: '/contact', text: t.nav.contact, image: '/images/garden-strip.jpg' },
  ]

  // Replay the folio sweep on real navigations (not the initial page load).
  const prev = useRef(pathname)
  const [sweepKey, setSweepKey] = useState(0)
  const [sweeping, setSweeping] = useState(false)
  useEffect(() => {
    if (prev.current !== pathname) {
      prev.current = pathname
      setSweepKey((k) => k + 1)
      setSweeping(true)
      setMenuOpen(false)
      window.scrollTo(0, 0)
    }
  }, [pathname])

  // Unmount the sweep once it has finished so a stray folio can never linger
  // (e.g. if rAF was paused mid-animation by a background tab).
  useEffect(() => {
    if (!sweeping) return undefined
    const t = setTimeout(() => setSweeping(false), 2400)
    return () => clearTimeout(t)
  }, [sweeping, sweepKey])

  // Lock body scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navbar — scrolls away with the page (not sticky) */}
      <nav className="z-50 w-full border-b border-warm bg-surface">
        <div className="relative flex w-full items-stretch">
          {/* Left: logo + wordmark — position matched to shrutsanjeevan.vercel.app */}
          <Link
            to="/"
            aria-label="Shrutsanjeevan"
            className="flex min-w-0 items-center gap-3 py-4 pl-margin-mobile pr-6 lg:pl-8"
          >
            <img src="/logo.png" alt="" aria-hidden="true" className="h-8 w-auto shrink-0 sm:h-9" />
            <span className="whitespace-nowrap font-headline-lg text-[20px] leading-none text-sepia sm:text-[24px]">
              Shrutsanjeevan
            </span>
          </Link>

          {/* Right: actions + menu */}
          <div className="ml-auto flex shrink-0 items-center gap-3 pr-margin-mobile lg:pr-8">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-surface hover:text-oxblood"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen flowing menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[200] flex flex-col bg-surface"
          >
            <div className="border-b border-warm bg-surface">
              <div className="relative flex w-full items-stretch">
                <Link
                  to="/"
                  className="flex min-w-0 items-center gap-3 py-4 pl-margin-mobile pr-6 lg:pl-8"
                  onClick={() => setMenuOpen(false)}
                >
                  <img src="/logo.png" alt="" aria-hidden="true" className="h-8 w-auto shrink-0 sm:h-9" />
                  <span className="whitespace-nowrap font-headline-lg text-[20px] leading-none text-sepia sm:text-[24px]">
                    Shrutsanjeevan
                  </span>
                </Link>
                <div className="ml-auto flex shrink-0 items-center gap-3 pr-margin-mobile lg:pr-8">
                  <ThemeToggle />
                  <LanguageSwitcher />
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-surface hover:text-oxblood"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMenuOpen(false)}>
              <FlowingMenu
                items={menuItems}
                speed={18}
                bgColor="var(--surface)"
                textColor="var(--ink)"
                marqueeBgColor="var(--oxblood)"
                marqueeTextColor="#f3e9d6"
                borderColor="var(--line)"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className={
          isHome
            ? 'w-full flex-1'
            : 'mx-auto w-full max-w-container-max flex-1 px-margin-mobile py-10'
        }
      >
        <motion.div
          key={pathname}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : 0.62, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />

      {/* Manuscript folios sweep across on each route change */}
      {!reduce && sweeping && <FolioSweep key={sweepKey} />}

      {/* First-visit language chooser */}
      <LanguageModal />
    </div>
  )
}
