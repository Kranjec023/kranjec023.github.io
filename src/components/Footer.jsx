import { Link } from 'react-router-dom'
import '../styles/footer.css'

const navLinks = [
  { label: 'Home',      to: '/' },
  { label: 'About',     to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Links',     to: '/links' },
  { label: 'Contact',   to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="footer__initials">FK</span>
        <p>Building systems that solve real problems.</p>
        <small>&copy; {new Date().getFullYear()} Frédérick Kranjec-Larose</small>
      </div>
      <div className="footer__nav">
        <p className="footer__label">Navigation</p>
        {navLinks.map(({ label, to }) => (
          <Link key={to} to={to}>{label}</Link>
        ))}
      </div>
      <div className="footer__connect">
        <p className="footer__label">Connect</p>
        <a href="https://github.com/kranjec023" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="https://linkedin.com/in/frédérick-kranjec-larose-052835110" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href="mailto:fredkranjec@gmail.com">Email ↗</a>
      </div>
      <div className="footer__cta">
        <p className="footer__label">Let&apos;s build something</p>
        <p>Have a project in mind?<br />Let&apos;s create something great together.</p>
        <Link to="/contact">Get in touch ↗</Link>
      </div>
    </footer>
  )
}
