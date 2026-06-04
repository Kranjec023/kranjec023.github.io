import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import '../styles/header.css'
import { useThemeContext }    from '../context/ThemeContext'
import { useLanguageContext } from '../context/LanguageContext'

const LANG_LABELS = { en: 'EN', fr: 'FR', de: 'DE' }

export default function Header() {
  const { theme, toggleTheme }       = useThemeContext()
  const { language, toggleLanguage, t } = useLanguageContext()

  const navLinks = [
    { label: t('nav.home'),      to: '/' },
    { label: t('nav.about'),     to: '/about' },
    { label: t('nav.portfolio'), to: '/portfolio' },
    { label: t('nav.links'),     to: '/links' },
    { label: t('nav.contact'),   to: '/contact' },
  ]

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
          className="header__lang-toggle"
          onClick={toggleLanguage}
          aria-label={`Switch language — current: ${language.toUpperCase()}`}
          title="Switch language"
        >
          {LANG_LABELS[language]}
        </button>
        <button
          className="header__theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀︎' : '☾'}
        </button>
        <Link to="/contact" className="header__cta">{t('nav.contact')} ↗</Link>
      </div>
    </header>
  )
}
