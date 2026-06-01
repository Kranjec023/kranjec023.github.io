# 🤖 AI_FEATURE — Contact Page

---

## Feature Identity

- **Feature Name:** Contact Page — Contact Form & Supabase Submission
- **Related Area:** Pages / Forms / Database
- **Priority:** 🔴 High — primary way for recruiters to reach Frédérick
- **Route:** `/contact`

---

## Feature Goal

Build a Contact page with a validated form that submits name, email, and message to a Supabase `messages` table — with clear success/failure feedback and form reset on success.

---

## Feature Scope

### In Scope (Included)

- Form with name, email, and message fields
- Client-side validation (required fields + email format)
- Supabase INSERT to `messages` table on valid submission
- Success feedback (green, auto-dismisses after 4s)
- Failure feedback (red, stays until next interaction)
- Form reset after successful submission
- Responsive layout across desktop and mobile

### Out of Scope (Excluded)

- Email notification on submission (handled server-side if needed)
- Back office message management (handled in `back-office.feature.md`)
- reCAPTCHA / spam protection

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — Contact page is accessible at `/contact`
- **SR-2** — Form includes a text input for `name`
- **SR-3** — Form includes an email input for `email`
- **SR-4** — Form includes a textarea for `message`
- **SR-5** — All fields have visible labels or placeholders
- **SR-6** — All three fields are required — form cannot submit when empty
- **SR-7** — Email field validates for proper email format
- **SR-8** — Validation errors are displayed to the user
- **SR-9** — Submit button is disabled or form rejects submission when validation fails
- **SR-10** — On valid submission, an INSERT is made to the `messages` table in Supabase
- **SR-11** — Payload includes `name`, `email`, and `message` fields
- **SR-12** — Submission uses the Supabase client from `src/lib/supabaseClient.js`
- **SR-13** — Success message is displayed and visually distinct (green + ✓ icon)
- **SR-14** — Failure message is displayed and visually distinct (red + ✗ icon)
- **SR-15** — Form fields are cleared after successful submission
- **SR-16** — Success message auto-dismisses after 4 seconds
- **SR-17** — Page is fully responsive on desktop and mobile

---

## Supabase Setup

### Table: `messages`

```sql
create table messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamp with time zone default now()
);
```

> Run this in your Supabase SQL editor before testing the form.

---

## Step-by-Step Build Instructions

### Step 1 — Create the page files

```
src/
└── pages/
    └── Contact.jsx
└── styles/
    └── contact.css
```

### Step 2 — Register the route in `App.jsx`

```jsx
<Route path="/contact" element={<Contact />} />
```

### Step 3 — Build `Contact.jsx`

```jsx
// src/pages/Contact.jsx

import { useState } from 'react'
import '../styles/contact.css'
import { supabase } from '../lib/supabaseClient'

const INITIAL_FORM = { name: '', email: '', message: '' }

function validateForm({ name, email, message }) {
  if (!name.trim() || !email.trim() || !message.trim()) {
    return 'Please fill in all fields.'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.'
  }
  return null
}

export default function Contact() {
  const [form,    setForm]    = useState(INITIAL_FORM)
  const [error,   setError]   = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setError(null)
    setSuccess(false)
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const validationError = validateForm(form)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError(null)

    const { error: supabaseError } = await supabase
      .from('messages')
      .insert([{ name: form.name, email: form.email, message: form.message }])

    setLoading(false)

    if (supabaseError) {
      setError('Something went wrong. Please try again.')
      return
    }

    setSuccess(true)
    setForm(INITIAL_FORM)
    setTimeout(() => setSuccess(false), 4000)
  }

  const isDisabled = loading || !form.name || !form.email || !form.message

  return (
    <div className="contact">

      {/* ── HERO ── */}
      <section className="contact__hero">
        <div className="contact__hero-content">
          <p className="contact__label">CONTACT</p>
          <h1 className="contact__headline">Let's work<br />together.</h1>
          <p className="contact__sub">
            Have a project in mind, a question, or just want to connect?
            Send me a message and I'll get back to you as soon as possible.
          </p>
          <p className="contact__email">
            Or reach me directly at{' '}
            <a href="mailto:livewire023@gmail.com">livewire023@gmail.com</a>
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="contact__section">
        <form className="contact__form" onSubmit={handleSubmit} noValidate>

          {/* NAME */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-field__input"
              placeholder="Frédérick Kranjec-Larose"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-field__input"
              placeholder="hello@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* MESSAGE */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-field__textarea"
              placeholder="Tell me about your project or opportunity..."
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* VALIDATION ERROR */}
          {error && (
            <div className="form-feedback form-feedback--error">
              <span className="form-feedback__icon">✗</span>
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="form-feedback form-feedback--success">
              <span className="form-feedback__icon">✓</span>
              Message sent! I'll get back to you soon.
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn--primary contact__submit"
            disabled={isDisabled}
          >
            {loading ? 'Sending...' : 'Send Message ↗'}
          </button>

        </form>
      </section>

    </div>
  )
}
```

### Step 4 — Build `contact.css`

```css
/* src/styles/contact.css */

/* ── HERO ── */
.contact__hero {
  padding: 5rem 6rem 3rem;
  border-bottom: 1px solid var(--color-border);
}

.contact__label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.contact__headline {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.contact__sub {
  max-width: 480px;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.contact__email {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.contact__email a {
  color: var(--color-text-primary);
  text-decoration: underline;
}

/* ── SECTION ── */
.contact__section {
  padding: 4rem 6rem;
}

/* ── FORM ── */
.contact__form {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── FORM FIELDS ── */
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-field__label {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.form-field__input,
.form-field__textarea {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  border-radius: 4px;
  font-family: inherit;
  transition: border-color 0.2s;
  resize: none;
}

.form-field__input:focus,
.form-field__textarea:focus {
  outline: none;
  border-color: var(--color-text-primary);
}

.form-field__input::placeholder,
.form-field__textarea::placeholder {
  color: var(--color-text-muted);
  opacity: 0.6;
}

/* ── FEEDBACK ── */
.form-feedback {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.form-feedback--success {
  background: rgba(76, 175, 80, 0.12);
  border: 1px solid rgba(76, 175, 80, 0.4);
  color: #4caf50;
}

.form-feedback--error {
  background: rgba(239, 83, 80, 0.12);
  border: 1px solid rgba(239, 83, 80, 0.4);
  color: #ef5350;
}

.form-feedback__icon {
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* ── SUBMIT BUTTON ── */
.contact__submit {
  align-self: flex-start;
  cursor: pointer;
  border: none;
}

.contact__submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .contact__hero    { padding: 3rem 1.5rem 2rem; }
  .contact__section { padding: 2rem 1.5rem; }
  .contact__submit  { width: 100%; text-align: center; }
}
```

---

## File Structure After Feature

```
src/
├── pages/
│   └── Contact.jsx
├── styles/
│   └── contact.css
└── lib/
    └── supabaseClient.js   ← must already exist
```

---

## Acceptance Criteria

- [ ] SR-1 through SR-17 are all implemented
- [ ] Contact page loads at `/contact`
- [ ] Form has name, email, and message fields with labels
- [ ] Form cannot submit with empty fields
- [ ] Email field rejects invalid email format
- [ ] Validation error message is displayed in red with ✗ icon
- [ ] On valid submit, INSERT is made to `messages` table in Supabase
- [ ] Payload includes `name`, `email`, `message`
- [ ] Uses `supabase` client from `src/lib/supabaseClient.js`
- [ ] Success message is displayed in green with ✓ icon
- [ ] Form fields are cleared after successful submission
- [ ] Success message auto-dismisses after 4 seconds
- [ ] Submit button is disabled when fields are empty or loading
- [ ] Page is fully responsive (desktop + mobile)
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors

---

## Notes for the AI

- `validateForm()` is a pure function — easy to unit test
- `INITIAL_FORM` constant is used for both initial state and reset after success
- `noValidate` on the `<form>` disables browser native validation — custom validation handles it
- `isDisabled` checks both loading state AND empty fields — button is disabled in both cases
- `setTimeout(() => setSuccess(false), 4000)` auto-dismisses the success banner after 4s
- The `handleChange` handler clears both `error` and `success` on any field change
- Supabase RLS (Row Level Security) must allow `INSERT` for `anon` role on the `messages` table