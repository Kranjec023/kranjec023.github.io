import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import '../styles/header.css'

const navLinks = [
  { label: '01. Home',      to: '/' },
  { label: '02. About',     to: '/about' },
  { label: '03. Portfolio', to: '/portfolio' },
  { label: '04. Links',     to: '/links' },
  { label: '05. Contact',   to: '/contact' },
]

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Frédérick Kranjec-Larose logo" />
      </Link>
      <nav className="header__nav">
        {navLinks.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <Link to="/contact" className="header__cta">Let&apos;s talk ↗</Link>
    </header>
  )
}
