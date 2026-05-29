import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Links from './pages/Links'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/links"     element={<Links />} />
        <Route path="/contact"   element={<Contact />} />
      </Routes>
    </Layout>
  )
}
