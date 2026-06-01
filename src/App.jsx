import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home       from './pages/Home'
import About      from './pages/About'
import Portfolio  from './pages/Portfolio'
import Links      from './pages/Links'
import Contact    from './pages/Contact'
import Login      from './pages/Login'
import BackOffice from './pages/BackOffice'

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const keys = []
    const SECRET = ['l', 'o', 'g', 'i', 'n']

    function handleKeyDown(e) {
      keys.push(e.key.toLowerCase())
      if (keys.length > SECRET.length) keys.shift()
      if (keys.join('') === SECRET.join('')) {
        navigate('/login')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  return (
    <Layout>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/portfolio"  element={<Portfolio />} />
        <Route path="/links"      element={<Links />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/backoffice" element={<BackOffice />} />
      </Routes>
    </Layout>
  )
}
