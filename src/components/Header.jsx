import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import '../styles/header.css'
import { useThemeContext } from '../context/ThemeContext'

const navLinks = [
  { label: '01. Home',      to: '/' },
  { label: '02. About',     to: '/about' },
  { label: '03. Portfolio', to: '/portfolio' },
  { label: '04. Links',     to: '/links' },
  { label: '05. Contact',   to: '/contact' },
]

export default function Header() {
  const { theme, toggleTheme } = useThemeContext()

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
      <div className="header__right">
        <button
          className="header__theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀︎' : '☾'}
        </button>
        <Link to="/contact" className="header__cta">Let&apos;s talk ↗</Link>
      </div>
    </header>
  )
}
