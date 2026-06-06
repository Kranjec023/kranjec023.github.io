# 🤖 AI_FEATURE — Light & Dark Mode

---

## Feature Identity

- **Feature Name:** Light & Dark Mode — Theme Toggle
- **Related Area:** Global / Design System / UX
- **Priority:** 🟡 Medium — enhances usability and accessibility across all pages
- **Scope:** Global — affects every page and component

---

## Feature Goal

Implement a site-wide light/dark theme toggle using CSS custom properties. The user's preference is persisted in `localStorage` and falls back to the OS `prefers-color-scheme`. A toggle button is accessible on every page via the Header. Switching themes applies a smooth CSS transition.

---

## Feature Scope

### In Scope (Included)

- CSS custom properties for all theme-dependent colors
- `localStorage` persistence of theme preference
- OS `prefers-color-scheme` as the default fallback
- Toggle button in the Header (visible on every page)
- Smooth CSS transition when switching themes
- All pages and components support both themes

### Out of Scope (Excluded)

- Per-page theme overrides
- Animated toggle switch (simple button only)

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — CSS custom properties defined for all theme-dependent colors
- **SR-2** — Dark theme variables defined on `:root` or `[data-theme="dark"]`
- **SR-3** — Light theme variables defined on `[data-theme="light"]`
- **SR-4** — Theme is applied via a `data-theme` attribute on `<html>`
- **SR-5** — On first load, OS `prefers-color-scheme` is used as default
- **SR-6** — If a preference exists in `localStorage`, it overrides the OS default
- **SR-7** — Clicking the toggle switches between `light` and `dark`
- **SR-8** — New preference is saved to `localStorage` on toggle
- **SR-9** — Toggle button is visible in the Header on every page
- **SR-10** — Toggle button shows the correct icon for the current theme (☀︎ / ☾)
- **SR-11** — Smooth CSS transition applies when switching themes
- **SR-12** — All components and pages use CSS variables — no hardcoded colors

---

## Step-by-Step Build Instructions

### Step 1 — Update CSS variables in `index.css`

```css
/* src/index.css */

/* ── DARK THEME (default) ── */
:root,
[data-theme="dark"] {
  --color-bg:           #0a0a0a;
  --color-surface:      #111111;
  --color-border:       #222222;
  --color-text-primary: #f0f0f0;
  --color-text-muted:   #666666;
  --color-accent:       #4caf50;
  --header-height:      64px;
}

/* ── LIGHT THEME ── */
[data-theme="light"] {
  --color-bg:           #ffffff;
  --color-surface:      #f5f5f5;
  --color-border:       #e0e0e0;
  --color-text-primary: #0a0a0a;
  --color-text-muted:   #888888;
  --color-accent:       #2e7d32;
}

/* ── GLOBAL TRANSITION ── */
*,
*::before,
*::after {
  transition:
    background-color 0.25s ease,
    border-color     0.25s ease,
    color            0.25s ease;
}
```

### Step 2 — Create `useTheme.js` hook

```js
// src/hooks/useTheme.js

import { useState, useEffect } from 'react'

export function useTheme() {
  function getInitialTheme() {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
```

### Step 3 — Create `ThemeContext.jsx`

```jsx
// src/context/ThemeContext.jsx

import { createContext, useContext } from 'react'
import { useTheme } from '../hooks/useTheme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  return useContext(ThemeContext)
}
```

### Step 4 — Wrap the app with `ThemeProvider` in `main.jsx`

```jsx
// src/main.jsx
import { StrictMode }   from 'react'
import { createRoot }   from 'react-dom/client'
import { HashRouter }   from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
)
```

### Step 5 — Add toggle button to `Header.jsx`

```jsx
// src/components/Header.jsx
// ...existing code...
import { useThemeContext } from '../context/ThemeContext'

export default function Header() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <header className="header">
      {/* ...existing code... */}

      <button
        className="header__theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀︎' : '☾'}
      </button>

      {/* ...existing code... */}
    </header>
  )
}
```

### Step 6 — Add toggle button styles to `header.css`

```css
/* src/styles/header.css */
/* ...existing code... */

/* ── THEME TOGGLE ── */
.header__theme-toggle {
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, color 0.2s;
  flex-shrink: 0;
}

.header__theme-toggle:hover {
  border-color: var(--color-text-primary);
  color: var(--color-text-primary);
}
```

---

## File Structure After Feature

```
src/
├── hooks/
│   └── useTheme.js
├── context/
│   └── ThemeContext.jsx
├── index.css          ← updated with light/dark variables + transition
├── main.jsx           ← wrapped with ThemeProvider
└── components/
    └── Header.jsx     ← toggle button added
```

---

## How It Works — Flow Diagram

```
App loads
   │
   ├── localStorage has 'theme'?
   │     YES → use stored value
   │     NO  → check prefers-color-scheme
   │               DARK  → theme = 'dark'
   │               LIGHT → theme = 'light'
   │
   ▼
document.documentElement.setAttribute('data-theme', theme)
   │
   ▼
CSS variables switch → all components re-paint with transition
   │
User clicks toggle
   │
   ▼
toggleTheme() → flips theme → saves to localStorage → re-applies data-theme
```

---

## Acceptance Criteria

- [ ] SR-1 through SR-12 are all implemented
- [ ] `:root` defines dark theme variables by default
- [ ] `[data-theme="light"]` overrides all variables for light theme
- [ ] On first load with no `localStorage`, OS preference is respected
- [ ] Stored `localStorage` value overrides OS preference on subsequent loads
- [ ] Toggle button is visible in the Header on every page
- [ ] Toggle shows ☀︎ in dark mode and ☾ in light mode
- [ ] Clicking toggle switches theme and saves to `localStorage`
- [ ] Theme switch applies a smooth 0.25s transition
- [ ] All pages look correct in both light and dark mode
- [ ] No hardcoded colors remain in any component CSS
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors

---

## Notes for the AI

- `data-theme` is set on `document.documentElement` (`<html>`) — CSS cascade applies to the entire page
- `getInitialTheme()` runs synchronously before first render — avoids theme flash on load
- The global `transition` on `*` covers all color/background/border changes — no per-component transitions needed
- `useThemeContext()` is the only hook components need — they never import `useTheme` directly
- Toggle button uses `aria-label` for screen reader accessibility
- Avoid `transition: all` — only transition `background-color`, `border-color`, and `color` to prevent layout jank