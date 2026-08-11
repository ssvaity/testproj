import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Footer from './Footer.jsx'
import FlowingMenu from './FlowingMenu.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import LanguageModal from './LanguageModal.jsx'
// Theme toggle temporarily disabled (dark/light feature paused).
// import ThemeToggle from './ThemeToggle.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Layout() {
  const { count } = useCart()
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isArchivePage = pathname.startsWith('/search')
  const reduce = useReducedMotion()

  // Primary inline links shown on desktop. Archive is not here — it lives as an
  // icon on the right (and swaps to the request list while on the archive page).
  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/library', label: t.nav.library },
    { to: '/contact', label: t.nav.contact },
  ]
  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

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

  // On navigation, close the menu and jump to the top of the new page.
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  // Lock body scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Hide the glass navbar on scroll-down, reveal it on scroll-up
  // (always shown near the top and whenever the menu is open). `scrolled`
  // drives the Aceternity-style shrink, matching ViramTech's navbar.
  const [navHidden, setNavHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      // Stay visible until we've scrolled past one full viewport; after that,
      // hide on scroll-down and reveal on scroll-up.
      if (y < window.innerHeight) {
        setNavHidden(false)
      } else if (y > lastScrollY.current + 4) {
        setNavHidden(true) // scrolling down
      } else if (y < lastScrollY.current - 4) {
        setNavHidden(false) // scrolling up
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navbar — floating glass pill, exact ViramTech dimensions (max-w 80rem,
          shrinking to 64rem on scroll); hides on scroll-down, returns on scroll-up. */}
      <motion.nav
        initial={false}
        animate={{
          maxWidth: scrolled ? '64rem' : '80rem',
          top: scrolled ? '1rem' : '0.75rem',
          y: navHidden && !menuOpen ? '-140%' : '0%',
          opacity: navHidden && !menuOpen ? 0 : 1,
          paddingTop: scrolled ? '0.5rem' : '0.75rem',
          paddingBottom: scrolled ? '0.5rem' : '0.75rem',
          paddingLeft: scrolled ? '1.25rem' : '1.75rem',
          paddingRight: scrolled ? '1.25rem' : '1.75rem',
          boxShadow: scrolled ? '0 12px 32px rgba(0,0,0,0.12)' : '0 6px 20px rgba(0,0,0,0.08)',
        }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 50 }}
        className="fixed inset-x-0 z-50 mx-auto flex w-[calc(100%-2rem)] items-center gap-8 rounded-full border border-warm/60 bg-surface/70 backdrop-blur-md supports-[backdrop-filter]:bg-surface/60"
      >
        {/* Left: logo + wordmark */}
        <Link
          to="/"
          aria-label="Shrutsanjeevan"
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          {/* Logo video: white background dropped via multiply on the light glass;
              in dark mode it rides a small cream plate so the white never shows. */}
          <span className="flex h-8 shrink-0 items-center overflow-hidden rounded-md sm:h-9 dark:bg-[#fffdf8] dark:px-1.5 dark:py-0.5">
            <video
              src="/nav-logo.mp4"
              className="h-full w-auto mix-blend-multiply"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          </span>
          <span className="whitespace-nowrap font-headline-lg text-[20px] leading-none text-sepia sm:text-[24px]">
            Shrutsanjeevan
          </span>
        </Link>

        {/* Center: primary links (desktop only) */}
        <ul className="hidden items-center gap-1 text-sm font-normal lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-3 py-2 transition-colors ${
                  isActive(link.to)
                    ? 'text-oxblood'
                    : 'text-ink/80 hover:text-oxblood'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: contextual archive/request icon, controls, mobile menu */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {isArchivePage ? (
            // On the archive page the icon becomes the request list, badged with its count.
            <Link
              to="/requests"
              aria-label={`${t.requestCart}${count > 0 ? ` (${count})` : ''}`}
              title={t.requestCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-surface hover:text-oxblood"
            >
              <span className="material-symbols-outlined">list_alt</span>
              {count > 0 && (
                <sup className="absolute right-0.5 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-oxblood px-1 text-[10px] font-bold leading-none text-straw">
                  {count}
                </sup>
              )}
            </Link>
          ) : (
            <Link
              to="/search"
              aria-label={t.nav.archive}
              title={t.nav.archive}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-surface hover:text-oxblood"
            >
              <span className="material-symbols-outlined">search</span>
            </Link>
          )}
          {/* <ThemeToggle /> temporarily disabled */}
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-surface hover:text-oxblood lg:hidden"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </motion.nav>

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
                  {/* <ThemeToggle /> temporarily disabled */}
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
            ? 'w-full flex-1 pt-[5rem]'
            : 'mx-auto w-full max-w-container-max flex-1 px-margin-mobile pb-10 pt-[calc(5rem+2.5rem)]'
        }
      >
        <Outlet />
      </main>

      <Footer />

      {/* First-visit language chooser */}
      <LanguageModal />
    </div>
  )
}
