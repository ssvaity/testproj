import { NavLink, Outlet, Link } from 'react-router-dom'
import Footer from './Footer.jsx'
import '../App.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/search', label: 'Search' },
  { to: '/library', label: 'Library' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="nav-brand">
          <img src="/logo.png" alt="Shrutsanjeevan" />
        </Link>
        <nav>
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
