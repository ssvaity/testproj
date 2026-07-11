import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Footer from './Footer.jsx'
import FlowingMenu from './FlowingMenu.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import LanguageModal from './LanguageModal.jsx'
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

  // Replace the option for the page you're already on with Home, so there is
  // never a dead menu item that does nothing when clicked.
  const homeItem = { link: '/', text: t.nav.home, image: '/images/hero-garden.jpg' }
  const menuItems = [
    { link: '/about', text: t.nav.about, image: '/images/manuscript-texture.png' },
    { link: '/search', text: 'Archive', image: '/images/pages/p1.jpg' },
    { link: '/library', text: t.nav.library, image: '/images/manuscript-cover.jpg' },
    {
      link: '/requests',
      text: count > 0 ? `Request list (${count})` : 'Request list',
      image: '/images/manuscript-cover.jpg',
    },
    { link: '/contact', text: t.nav.contact, image: '/images/garden-strip.jpg' },
  ].map((it) => (it.link === pathname ? homeItem : it))

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
      <nav className="z-50 w-full border-b border-warm bg-white">
        <div className="mx-auto flex max-w-container-max items-center px-margin-mobile py-3">
          {/* Left: logo video + wordmark */}
          <Link to="/" aria-label="Shrutsanjeevan" className="flex items-center gap-3">
            <video
              src="/logo-video.mp4"
              poster="/logo.png"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="h-12 w-auto"
            />
            <span className="font-headline-lg text-[24px] leading-none text-sepia">Shrutsanjeevan</span>
          </Link>

          {/* Right: actions + menu */}
          <div className="ml-auto flex items-center gap-3">
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
            className="fixed inset-0 z-[200] flex flex-col bg-[#faf7f1]"
          >
            <div className="flex items-center justify-between border-b border-warm px-margin-mobile py-4">
              <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
                <img src="/logo.png" alt="Shrutsanjeevan" className="h-9 w-auto" />
                <span className="font-headline-md text-[18px] text-sepia">Shrutsanjeevan</span>
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-surface hover:text-oxblood"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1">
              <FlowingMenu
                items={menuItems}
                speed={18}
                bgColor="#faf7f1"
                textColor="#2f2418"
                marqueeBgColor="#8a1f1c"
                marqueeTextColor="#f3e9d6"
                borderColor="#e7dcc7"
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
