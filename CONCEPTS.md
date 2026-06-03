# 🧠 CONCEPTS.md — Challenging Technical Concepts

## Module 16 — Frédérick Kranjec-Larose Portfolio

---

## Concept 1 — Row Level Security (RLS) with Supabase

### Purpose in the Project
Protects the `messages` table so that anonymous users (public visitors) can only **insert** new messages via the contact form, while only authenticated users (the admin) can **read** and **delete** them.

### Why It Was Challenging
RLS is not a frontend concept — it lives at the database level and is invisible until it fails. Understanding the difference between `anon` and `authenticated` roles, writing correct policies, and debugging silent permission errors required learning Supabase's policy system from scratch. A misconfigured policy blocks all data silently with no clear error message.

### Usage Location
- **Supabase SQL Editor** — policies applied directly on the `messages` table
- [`src/lib/supabaseClient.js`](src/lib/supabaseClient.js) — client uses the `anon` key, which respects RLS
- [`src/pages/Contact.jsx`](src/pages/Contact.jsx) — anonymous `INSERT`
- [`src/pages/BackOffice.jsx`](src/pages/BackOffice.jsx) — authenticated `SELECT` and `DELETE`

---

## Concept 2 — React Context API with Custom Hooks

### Purpose in the Project
Powers both the **theme system** (light/dark) and the **i18n language system** (EN/FR/DE) across every page and component — without prop drilling. Any component can call `useThemeContext()` or `useLanguageContext()` to access global state instantly.

### Why It Was Challenging
Splitting responsibilities correctly across three layers — the **hook** (logic), the **context** (sharing), and the **provider** (injection) — was non-obvious at first. Wrapping providers in the correct order in `main.jsx`, avoiding stale closures in `useEffect`, and ensuring `localStorage` is read synchronously before the first render (to avoid theme/language flash) required careful implementation.

### Usage Location
- [`src/hooks/useTheme.js`](src/hooks/useTheme.js) — theme logic
- [`src/hooks/useLanguage.js`](src/hooks/useLanguage.js) — language logic + `t()` translation function
- [`src/context/ThemeContext.jsx`](src/context/ThemeContext.jsx) — theme provider
- [`src/context/LanguageContext.jsx`](src/context/LanguageContext.jsx) — language provider
- [`src/main.jsx`](src/main.jsx) — providers wrap the entire app
- Every page and `Header.jsx` — consumers via `useThemeContext()` / `useLanguageContext()`

---

## Concept 3 — Authentication Guards with Supabase Auth

### Purpose in the Project
Protects the `/backoffice` route from unauthenticated access. On every load of the Back Office page, the app checks for an active Supabase session before rendering any content — redirecting to `/login` if none exists. The session also persists across page refreshes.

### Why It Was Challenging
Client-side auth guards in a static GitHub Pages app have no server to enforce them. The guard must run **before** any sensitive data is fetched or rendered — which requires careful use of `useEffect` with a session check, handling the async delay gracefully, and ensuring the redirect fires before the component displays anything. Additionally, using `HashRouter` meant routing behavior differed from standard `BrowserRouter`, requiring adjustments in how redirects were handled.

### Usage Location
- [`src/pages/BackOffice.jsx`](src/pages/BackOffice.jsx) — `useEffect` session check at mount, redirects to `/login` if no session
- [`src/pages/Login.jsx`](src/pages/Login.jsx) — `useEffect` redirects to `/backoffice` if session already exists
- [`src/lib/supabaseClient.js`](src/lib/supabaseClient.js) — `supabase.auth.getSession()` and `supabase.auth.signInWithPassword()`