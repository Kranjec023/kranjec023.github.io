# 🤖 AI_FEATURE — Login Page

---

## Feature Identity

- **Feature Name:** Login Page — Secret Admin Authentication
- **Related Area:** Pages / Auth / Supabase
- **Priority:** 🔴 High — gateway to the Back Office
- **Route:** `/login`

---

## Feature Goal

Build a secret login page that authenticates the admin using Supabase Auth `signInWithPassword`. The route is hidden from all navigation — accessible only by manually typing the URL or a secret keyboard shortcut. On success, the user is redirected to `/backoffice`.

---

## Feature Scope

### In Scope (Included)

- Email + password login form
- Supabase Auth `signInWithPassword`
- Redirect to `/backoffice` on success
- Error message on failed login
- Session persistence (no logout on refresh)
- Redirect to `/backoffice` if session already exists
- Secret keyboard shortcut to navigate to `/login`
- Route hidden from header, footer, and mobile nav

### Out of Scope (Excluded)

- User registration (admin is pre-created in Supabase dashboard)
- Password reset flow
- Back Office content (handled in `back-office.feature.md`)

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — Login page is accessible at `/login`
- **SR-2** — Route is NOT listed in header, footer, or mobile bottom nav
- **SR-3** — Page is reachable by manually typing `/login` in the URL
- **SR-4** — Page is reachable via a secret keyboard shortcut
- **SR-5** — Form includes an email input with `type="email"`
- **SR-6** — Form includes a password input with `type="password"`
- **SR-7** — A submit/login button is present
- **SR-8** — On submission, `supabase.auth.signInWithPassword()` is called
- **SR-9** — Uses the Supabase client from `src/lib/supabaseClient.js`
- **SR-10** — Admin user is pre-created in Supabase dashboard (not via the app)
- **SR-11** — On success, user is redirected to `/backoffice`
- **SR-12** — Session persists across page refreshes
- **SR-13** — If a valid session exists on load, user is redirected to `/backoffice`
- **SR-14** — On failed login, an error message is displayed
- **SR-15** — Error message is visually distinct (red)

---

## Supabase Setup

### Create Admin User

1. Go to your Supabase project
2. Navigate to **Authentication → Users**
3. Click **Invite user** or **Add user**
4. Enter your admin email and password
5. Confirm — no code changes needed

---

## Step-by-Step Build Instructions

### Step 1 — Create the page files

```
src/
└── pages/
    └── Login.jsx
└── styles/
    └── login.css
```

### Step 2 — Register the route in `App.jsx`

```jsx
// src/App.jsx
// ...existing code...

// ── import Login ──
import Login from './pages/Login'

// ── Add route (NOT in nav) ──
<Route path="/login"      element={<Login />} />
<Route path="/backoffice" element={<BackOffice />} />
```

> Do NOT add `/login` to the `navLinks` array in your Header, Footer, or mobile nav.

### Step 3 — Add secret keyboard shortcut in `App.jsx`

```jsx
// src/App.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Inside your App component:
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
```

> Typing `login` anywhere on the keyboard will navigate to `/login`.

### Step 4 — Build `Login.jsx`

```jsx
// src/pages/Login.jsx

import { useState, useEffect } from 'react'
import { useNavigate }         from 'react-router-dom'
import '../styles/login.css'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState(null)
  const [loading,  setLoading]  = useState(false)

  // ── Redirect if already logged in ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/backoffice')
    })
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (authError) {
      setError('Invalid login credentials. Please try again.')
      return
    }

    navigate('/backoffice')
  }

  const isDisabled = loading || !email || !password

  return (
    <div className="login">
      <div className="login__card">

        <p className="login__label">ADMIN</p>
        <h1 className="login__headline">Back Office</h1>
        <p className="login__sub">This page is not publicly listed.</p>

        <form className="login__form" onSubmit={handleSubmit} noValidate>

          {/* EMAIL */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-field__input"
              placeholder="admin@example.com"
              value={email}
              onChange={e => { setError(null); setEmail(e.target.value) }}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-field__input"
              placeholder="••••••••"
              value={password}
              onChange={e => { setError(null); setPassword(e.target.value) }}
              required
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="form-feedback form-feedback--error">
              <span className="form-feedback__icon">✗</span>
              {error}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn--primary login__submit"
            disabled={isDisabled}
          >
            {loading ? 'Signing in...' : 'Sign In ↗'}
          </button>

        </form>
      </div>
    </div>
  )
}
```

### Step 5 — Build `login.css`

```css
/* src/styles/login.css */

.login {
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login__card {
  width: 100%;
  max-width: 420px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 3rem 2.5rem;
}

.login__label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.login__headline {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.login__sub {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.login__submit {
  width: 100%;
  text-align: center;
  cursor: pointer;
  border: none;
  margin-top: 0.5rem;
}

.login__submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .login__card { padding: 2rem 1.5rem; }
}
```

---

## File Structure After Feature

```
src/
├── pages/
│   └── Login.jsx
├── styles/
│   └── login.css
```

---

## Acceptance Criteria

- [ ] SR-1 through SR-15 are all implemented
- [ ] `/login` is NOT in header, footer, or mobile nav
- [ ] Typing `login` on the keyboard navigates to `/login`
- [ ] Form has email and password fields with labels
- [ ] Submit button is present and disabled when fields are empty
- [ ] `supabase.auth.signInWithPassword()` is called on submit
- [ ] Uses `supabase` client from `src/lib/supabaseClient.js`
- [ ] Admin user was created via Supabase dashboard
- [ ] Successful login redirects to `/backoffice`
- [ ] Session persists after page refresh
- [ ] Visiting `/login` with an active session redirects to `/backoffice`
- [ ] Wrong credentials show a red error message
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors

---

## Notes for the AI

- The secret shortcut listens for the sequence `l-o-g-i-n` typed anywhere on the page
- `useEffect` on mount checks for an existing session — avoids showing the form to logged-in admin
- `noValidate` disables browser native validation — custom validation handles it
- Reuses `.form-field`, `.form-feedback`, and `.btn` classes from the existing design system
- The admin account is **never created via the app** — always via Supabase dashboard