import { Link } from 'react-router-dom'

const links = [
  { label: 'Contact', to: '/contact' },
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'X', href: '#' },
]

const itemClass =
  'text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-oxblood'

export default function Footer() {
  return (
    <footer className="border-t border-warm bg-surface-container-low/60">
      <div className="mx-auto flex w-full max-w-container-max flex-col items-center gap-4 px-margin-mobile py-6 sm:flex-row sm:justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
          © 2026 Shrutsanjeevan. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className={itemClass}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className={itemClass}>
                {l.label}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  )
}
