# 🤖 AI_FEATURE — Project Layout

---

## Feature Identity

- **Feature Name:** Project Layout — Header, Footer & Responsive Shell
- **Related Area:** Global Layout / Navigation
- **Priority:** 🔴 High — must be completed before any page content is built

---

## Feature Goal

Create the global layout shell for the portfolio — a persistent `Header` with sticky navigation and AI-generated logo, a `Footer` with contact info and copyright, and a `Main` layout component that wraps all page content. The layout must be fully responsive: horizontal nav on desktop, icon-based bottom nav on mobile.

---

## Feature Scope

### In Scope (Included)

- `Layout` component wrapping all pages between Header and Footer
- `Header` component — sticky, with nav links and AI-generated logo
- `Footer` component — contact info, social links, copyright
- AI-generated personal logo integrated in the header
- Responsive behavior — desktop horizontal nav / mobile bottom icon nav
- Global CSS variables and reset applied across all pages

### Out of Scope (Excluded)

- Page content (handled in individual page feature files)
- Animations beyond simple CSS transitions
- Dark/light mode toggle
- Any backend or auth logic

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — A `Layout` component exists and wraps all page content between `<Header>` and `<Footer>`
- **SR-2** — `Header` renders at the top of every page
- **SR-3** — `Header` is sticky/fixed — remains visible while scrolling
- **SR-4** — `Header` contains navigation links to all main pages: Home, About, Portfolio, Links, Contact
- **SR-5** — `Header` has consistent background and styling across all pages
- **SR-6** — `Footer` renders at the bottom of every page
- **SR-7** — `Footer` includes contact information (email, social links)
- **SR-8** — `Footer` includes a copyright notice
- **SR-9** — An AI-generated logo image is visible in the `Header`
- **SR-10** — Clicking the logo navigates to the Home page
- **SR-11** — Logo has appropriate `alt` text for accessibility
- **SR-12** — On desktop (>768px): nav links are horizontal at the top
- **SR-13** — On mobile (≤768px): nav collapses to icons displayed at the bottom of the viewport
- **SR-14** — Logo scales appropriately and does not overflow on any screen size
- **SR-15** — Text is readable without horizontal scrolling on mobile
- **SR-16** — No content overflows the viewport on any screen size

---

## Component Breakdown

### `Layout.jsx`
- Wraps every page: `<Header />` → `<main>{children}</main>` → `<Footer />`
- Used in `App.jsx` as the outer shell for all routes

### `Header.jsx`
- Contains: AI logo (links to `/`) + nav links + optional CTA button (`Let's talk ↗`)
- Sticky positioning via CSS (`position: sticky; top: 0`)
- Nav links: `Home` `About` `Portfolio` `Links` `Contact`
- Active link highlighted based on current route
- Hidden on mobile — replaced by bottom mobile nav

### `Footer.jsx`
- 4-column layout on desktop (logo/tagline | navigation | connect | CTA)
- Stacks vertically on mobile
- Includes:
  - `FK` branding + tagline + copyright
  - Nav links (numbered)
  - Social links: GitHub, LinkedIn, Email
  - CTA block: `"Have a project in mind? Let's build something great together."`

### `MobileNav.jsx`
- Fixed bottom bar — visible only on mobile (≤768px)
- Displays nav items as **icons only** (no labels)
- Icons: Home, About, Briefcase (Portfolio), Link (Links), Mail (Contact)
- Active icon highlighted based on current route

---

## Step-by-Step Build Instructions

### Step 1 — Create the folder structure

```
src/
├── components/
│   ├── Layout.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── MobileNav.jsx
├── assets/
│   └── logo.png          ← AI-generated logo
├── styles/
│   ├── global.css        ← CSS reset + variables
│   ├── header.css
│   ├── footer.css
│   └── mobile-nav.css
```

### Step 2 — Set up global CSS variables & reset

```css
/* src/styles/global.css */
:root {
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --color-border: #222222;
  --color-text-primary: #ffffff;
  --color-text-muted: #888888;
  --font-main: 'Inter', sans-serif;
  --header-height: 64px;
  --mobile-nav-height: 60px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--color-bg); color: var(--color-text-primary); font-family: var(--font-main); }
```

### Step 3 — Build `Layout.jsx`

```jsx
// src/components/Layout.jsx
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
```

### Step 4 — Build `Header.jsx`

```jsx
// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

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
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
            {label}
          </NavLink>
        ))}
      </nav>
      <a href="/contact" className="header__cta">Let's talk ↗</a>
    </header>
  )
}
```

### Step 5 — Build `Footer.jsx`

```jsx
// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="footer__initials">FK</span>
        <p>Building systems that solve real problems.</p>
        <small>© {new Date().getFullYear()} Frédérick Kranjec-Larose</small>
      </div>
      <div className="footer__nav">
        <p className="footer__label">NAVIGATION</p>
        {/* numbered nav links */}
      </div>
      <div className="footer__connect">
        <p className="footer__label">CONNECT</p>
        <a href="https://github.com/Kranjec023" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href="mailto:hello@fredkranjec.com">Email ↗</a>
      </div>
      <div className="footer__cta">
        <p className="footer__label">LET'S BUILD SOMETHING</p>
        <p>Have a project in mind?<br />Let's create something great together.</p>
        <a href="/contact">Get in touch ↗</a>
      </div>
    </footer>
  )
}
```

### Step 6 — Build `MobileNav.jsx`

```jsx
// src/components/MobileNav.jsx
import { NavLink } from 'react-router-dom'
// Use any icon library — e.g. react-icons
import { AiOutlineHome, AiOutlineUser, AiOutlineFolderOpen, AiOutlineLink, AiOutlineMail } from 'react-icons/ai'

const mobileLinks = [
  { icon: <AiOutlineHome />,       to: '/' },
  { icon: <AiOutlineUser />,       to: '/about' },
  { icon: <AiOutlineFolderOpen />, to: '/portfolio' },
  { icon: <AiOutlineLink />,       to: '/links' },
  { icon: <AiOutlineMail />,       to: '/contact' },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      {mobileLinks.map(({ icon, to }) => (
        <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
          {icon}
        </NavLink>
      ))}
    </nav>
  )
}
```

### Step 7 — Responsive CSS rules

```css
/* Desktop — header nav visible, mobile nav hidden */
.mobile-nav { display: none; }

@media (max-width: 768px) {
  /* Hide desktop header nav links */
  .header__nav, .header__cta { display: none; }

  /* Show mobile bottom nav */
  .mobile-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--mobile-nav-height);
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    justify-content: space-around;
    align-items: center;
    z-index: 100;
  }

  /* Pad page content so it doesn't hide behind mobile nav */
  main { padding-bottom: var(--mobile-nav-height); }
}
```

### Step 8 — Generate AI Logo

1. Go to an AI image generator (e.g. [Adobe Firefly](https://firefly.adobe.com), [Midjourney](https://midjourney.com), [DALL·E](https://openai.com/dall-e))
2. Prompt suggestion:
   ```
   Minimalist monogram logo "FK", dark background, white letterform,
   clean modern typography, professional, geometric, no decorations
   ```
3. Export as `logo.png` (ideally SVG for sharpness)
4. Place in `src/assets/logo.png`

### Step 9 — Wire Layout into `App.jsx`

```jsx
// src/App.jsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
// import other pages...

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/links"     element={<Links />} />
          <Route path="/contact"   element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
```

---

## File Structure After Feature

```
src/
├── components/
│   ├── Layout.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── MobileNav.jsx
├── assets/
│   └── logo.png
├── styles/
│   ├── global.css
│   ├── header.css
│   ├── footer.css
│   └── mobile-nav.css
├── pages/
│   └── (empty placeholder files — built in later features)
├── App.jsx
└── main.jsx
```

---

## Tech Constraints (Feature-Level)

- Use `react-router-dom` `NavLink` for active link highlighting
- Use `HashRouter` — already configured in `main.jsx`
- Use `react-icons` for mobile nav icons — `npm install react-icons`
- No external UI framework — custom CSS only
- Logo must be a local asset (`src/assets/`) — not an external URL
- Mobile nav must use `position: fixed; bottom: 0` — not relative positioning

---

## Acceptance Criteria

- [ ] SR-1 through SR-16 are all implemented
- [ ] `Layout.jsx` wraps all pages with Header and Footer
- [ ] Header is visible and sticky on all pages
- [ ] Header nav links navigate correctly to all 5 pages
- [ ] AI-generated logo is visible in the header and links to Home
- [ ] Logo has descriptive `alt` text
- [ ] Footer appears on all pages with social links and copyright
- [ ] On desktop (>768px): nav links displayed horizontally in header
- [ ] On mobile (≤768px): header nav hidden, bottom icon nav visible and functional
- [ ] No content overflows the viewport on any screen size
- [ ] Active nav item is visually highlighted on both desktop and mobile
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors

---

## Notes for the AI

- Always use `NavLink` (not `Link`) for nav items — enables active state styling
- The mobile nav must be `position: fixed` at the bottom — not part of the normal document flow
- Add `padding-bottom: var(--mobile-nav-height)` to `<main>` on mobile to prevent content hiding behind the nav
- The `Layout` component takes `children` as a prop — it does not import pages directly
- Logo `alt` text should describe the person/brand: `"Frédérick Kranjec-Larose logo"`
- `HashRouter` is already set up — do not change routing strategy in this feature