import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineUser, AiOutlineFolderOpen, AiOutlineLink, AiOutlineMail } from 'react-icons/ai'
import '../styles/mobile-nav.css'

const mobileLinks = [
  { icon: <AiOutlineHome />,        to: '/',         label: 'Home' },
  { icon: <AiOutlineUser />,        to: '/about',    label: 'About' },
  { icon: <AiOutlineFolderOpen />,  to: '/portfolio', label: 'Portfolio' },
  { icon: <AiOutlineLink />,        to: '/links',    label: 'Links' },
  { icon: <AiOutlineMail />,        to: '/contact',  label: 'Contact' },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      {mobileLinks.map(({ icon, to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          aria-label={label}
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          {icon}
        </NavLink>
      ))}
    </nav>
  )
}
