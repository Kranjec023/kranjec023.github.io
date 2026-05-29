import Header from './Header'
import Footer from './Footer'
import MobileNav from './MobileNav'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileNav />
    </>
  )
}
