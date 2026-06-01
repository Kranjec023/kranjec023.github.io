# 🤖 AI_FEATURE — Back Office Page

---

## Feature Identity

- **Feature Name:** Back Office — Admin Message Dashboard
- **Related Area:** Pages / Auth / Database
- **Priority:** 🔴 High — admin-only page for managing contact form submissions
- **Route:** `/backoffice`

---

## Feature Goal

Build a protected Back Office page that displays all contact form submissions from the Supabase `messages` table. Requires an active session to access — unauthenticated users are redirected to `/login`. Admin can view full messages in a modal and delete entries.

---

## Feature Scope

### In Scope (Included)

- Auth guard — redirect to `/login` if not authenticated
- Fetch and display all messages from Supabase `messages` table
- Table with Name, Email, Date, and Actions columns
- Messages ordered by `created_at` descending
- View modal — full message with sender name, email, date, and message text
- Close modal on X button, outside click, or Escape key
- Delete message with instant UI removal
- Logout button — calls `supabase.auth.signOut()` and redirects
- Route hidden from header, footer, and mobile nav

### Out of Scope (Excluded)

- Pagination (all messages loaded at once)
- Reply functionality
- Message read/unread state

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — `/backoffice` renders the Back Office page when authenticated
- **SR-2** — `/backoffice` redirects to `/login` when not authenticated
- **SR-3** — Auth check runs before rendering any content
- **SR-4** — Route is NOT in header, footer, or mobile nav
- **SR-5** — All messages are fetched from Supabase `messages` table
- **SR-6** — If fetch fails, an error message is displayed
- **SR-7** — If table is empty, "No messages yet." is displayed
- **SR-8** — Table columns: Name, Email, Date, Actions
- **SR-9** — Each row corresponds to one message
- **SR-10** — Messages are ordered by `created_at` descending
- **SR-11** — A Delete button is present on each row
- **SR-12** — Deleting a message removes it from the UI instantly
- **SR-13** — Clicking a row or View button opens a modal
- **SR-14** — Modal shows sender name, email, date/time, and full message
- **SR-15** — Modal has a close button (X)
- **SR-16** — Clicking outside the modal closes it
- **SR-17** — Pressing Escape closes the modal
- **SR-18** — Logout button is visible on the page
- **SR-19** — Logout calls `supabase.auth.signOut()` and clears the session
- **SR-20** — After logout, user is redirected to `/`

---

## Step-by-Step Build Instructions

### Step 1 — Create the page files

```
src/
└── pages/
    └── BackOffice.jsx
└── styles/
    └── backoffice.css
```

### Step 2 — Register the route in `App.jsx`

```jsx
// src/App.jsx
// ...existing code...
import BackOffice from './pages/BackOffice'

<Route path="/backoffice" element={<BackOffice />} />
// Do NOT add to navLinks array
```

### Step 3 — Build `BackOffice.jsx`

```jsx
// src/pages/BackOffice.jsx

import { useState, useEffect, useCallback } from 'react'
import { useNavigate }                       from 'react-router-dom'
import '../styles/backoffice.css'
import { supabase } from '../lib/supabaseClient'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('en-CA', {
    year:   'numeric',
    month:  'short',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

export default function BackOffice() {
  const navigate = useNavigate()

  const [messages,  setMessages]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [selected,  setSelected]  = useState(null)   // message open in modal

  // ── Auth Guard ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login')
    })
  }, [navigate])

  // ── Fetch Messages ──
  const fetchMessages = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    setLoading(false)

    if (fetchError) {
      setError('Failed to load messages. Please try again.')
      return
    }

    setMessages(data)
  }, [])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  // ── Delete Message ──
  async function handleDelete(id) {
    const { error: deleteError } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (deleteError) {
      setError('Failed to delete message.')
      return
    }

    setMessages(prev => prev.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  // ── Close Modal on Escape ──
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // ── Logout ──
  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="backoffice">

      {/* ── HEADER ── */}
      <div className="backoffice__topbar">
        <div>
          <p className="backoffice__label">ADMIN</p>
          <h1 className="backoffice__headline">Back Office</h1>
        </div>
        <button className="btn btn--ghost backoffice__logout" onClick={handleLogout}>
          Logout ↗
        </button>
      </div>

      {/* ── MESSAGES SECTION ── */}
      <section className="backoffice__section">
        <h2 className="backoffice__section-title">
          Messages
          <span className="backoffice__count">{messages.length}</span>
        </h2>

        {/* LOADING */}
        {loading && <p className="backoffice__status">Loading messages...</p>}

        {/* ERROR */}
        {error && (
          <div className="form-feedback form-feedback--error">
            <span className="form-feedback__icon">✗</span>
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && messages.length === 0 && (
          <p className="backoffice__status">No messages yet.</p>
        )}

        {/* TABLE */}
        {!loading && messages.length > 0 && (
          <div className="backoffice__table-wrap">
            <table className="backoffice__table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => (
                  <tr
                    key={msg.id}
                    className="backoffice__row"
                    onClick={() => setSelected(msg)}
                  >
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{formatDate(msg.created_at)}</td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="backoffice__actions">
                        <button
                          className="backoffice__btn-view"
                          onClick={() => setSelected(msg)}
                        >
                          View
                        </button>
                        <button
                          className="backoffice__btn-delete"
                          onClick={() => handleDelete(msg.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── MODAL ── */}
      {selected && (
        <div
          className="modal__overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal__card"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal__header">
              <h3 className="modal__title">Message</h3>
              <button
                className="modal__close"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal__meta">
              <p><span>From</span> {selected.name}</p>
              <p><span>Email</span> {selected.email}</p>
              <p><span>Date</span> {formatDate(selected.created_at)}</p>
            </div>

            <div className="modal__body">
              <p>{selected.message}</p>
            </div>

            <div className="modal__footer">
              <button
                className="backoffice__btn-delete"
                onClick={() => handleDelete(selected.id)}
              >
                Delete Message
              </button>
              <button
                className="btn btn--ghost"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
```

### Step 4 — Build `backoffice.css`

```css
/* src/styles/backoffice.css */

/* ── LAYOUT ── */
.backoffice {
  min-height: calc(100vh - var(--header-height));
  padding: 4rem 6rem;
}

/* ── TOPBAR ── */
.backoffice__topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.backoffice__label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

.backoffice__headline {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
}

.backoffice__logout {
  cursor: pointer;
  border: 1px solid var(--color-border);
  background: none;
}

/* ── SECTION ── */
.backoffice__section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.backoffice__section-title {
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.backoffice__count {
  font-size: 0.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  padding: 0.1rem 0.5rem;
  border-radius: 2px;
}

.backoffice__status {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  padding: 2rem 0;
}

/* ── TABLE ── */
.backoffice__table-wrap {
  overflow-x: auto;
}

.backoffice__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.backoffice__table th {
  text-align: left;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.backoffice__table td {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}

.backoffice__row {
  cursor: pointer;
  transition: background 0.15s;
}

.backoffice__row:hover {
  background: var(--color-surface);
}

/* ── ACTION BUTTONS ── */
.backoffice__actions {
  display: flex;
  gap: 0.5rem;
}

.backoffice__btn-view {
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--color-border);
  background: none;
  color: var(--color-text-primary);
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.backoffice__btn-view:hover {
  border-color: var(--color-text-primary);
}

.backoffice__btn-delete {
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  border: 1px solid rgba(239, 83, 80, 0.4);
  background: none;
  color: #ef5350;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.backoffice__btn-delete:hover {
  border-color: #ef5350;
}

/* ── MODAL ── */
.modal__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1.5rem;
}

.modal__card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal__title {
  font-size: 1.1rem;
  font-weight: 600;
}

.modal__close {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s;
}

.modal__close:hover {
  color: var(--color-text-primary);
}

.modal__meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.modal__meta span {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-right: 0.5rem;
  color: var(--color-text-muted);
  opacity: 0.6;
}

.modal__body {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-primary);
  white-space: pre-wrap;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .backoffice         { padding: 2rem 1.5rem; }
  .backoffice__topbar { flex-direction: column; gap: 1rem; }
  .modal__footer      { flex-direction: column; }
}
```

---

## File Structure After Feature

```
src/
├── pages/
│   └── BackOffice.jsx
├── styles/
│   └── backoffice.css
```

---

## Acceptance Criteria

- [ ] SR-1 through SR-20 are all implemented
- [ ] `/backoffice` redirects to `/login` when not authenticated
- [ ] `/backoffice` renders correctly when authenticated
- [ ] Route is NOT in header, footer, or mobile nav
- [ ] All messages fetched from Supabase ordered by `created_at` DESC
- [ ] Error message shown if fetch fails
- [ ] "No messages yet." shown if table is empty
- [ ] Table has Name, Email, Date, Actions columns
- [ ] Delete button removes message from UI instantly
- [ ] Clicking row or View button opens modal
- [ ] Modal shows name, email, date, and full message
- [ ] Modal closes on X button, outside click, or Escape key
- [ ] Logout button calls `supabase.auth.signOut()` and redirects to `/`
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors

---

## Notes for the AI

- Auth guard runs in a `useEffect` on mount — renders nothing until session is confirmed
- `e.stopPropagation()` on the Actions cell prevents row click from opening the modal when clicking Delete
- `formatDate()` is a pure utility function — uses `en-CA` locale for clean date formatting
- `useCallback` on `fetchMessages` prevents unnecessary re-renders
- Modal overlay uses `position: fixed; inset: 0` to cover the full viewport
- Clicking outside the modal hits the overlay div — `e.stopPropagation()` on the card prevents bubble-up
- Reuses `.form-feedback`, `.btn`, and `.btn--ghost` classes from the existing design system