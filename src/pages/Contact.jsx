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
          <h1 className="contact__headline">Let&apos;s work<br />together.</h1>
          <p className="contact__sub">
            Have a project in mind, a question, or just want to connect?
            Send me a message and I&apos;ll get back to you as soon as possible.
          </p>
          <p className="contact__email">
            Or reach me directly at{' '}
            <a href="mailto:fredkranjec@gmail.com">fredkranjec@gmail.com</a>
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
              Message sent! I&apos;ll get back to you soon.
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
