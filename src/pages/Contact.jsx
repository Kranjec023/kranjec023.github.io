import { useState } from 'react'
import '../styles/contact.css'
import { supabase } from '../lib/supabaseClient'
import { useLanguageContext } from '../context/LanguageContext'

const INITIAL_FORM = { name: '', email: '', message: '' }

function validateForm({ name, email, message }) {
  if (!name.trim() || !email.trim() || !message.trim()) return 'contact.errorEmpty'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'contact.errorEmail'
  return null
}

export default function Contact() {
  const { t } = useLanguageContext()

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

    const validationKey = validateForm(form)
    if (validationKey) {
      setError(t(validationKey))
      return
    }

    setLoading(true)
    setError(null)

    const { error: supabaseError } = await supabase
      .from('messages')
      .insert([{ name: form.name, email: form.email, message: form.message }])

    setLoading(false)

    if (supabaseError) {
      setError(t('contact.errorFail'))
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
          <p className="contact__label">{t('contact.label')}</p>
          <h1 className="contact__headline">{t('contact.headline')}</h1>
          <p className="contact__sub">{t('contact.sub')}</p>
          <p className="contact__email">
            {t('contact.directEmail')}{' '}
            <a href="mailto:fredkranjec@gmail.com">fredkranjec@gmail.com</a>
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="contact__section">
        <form className="contact__form" onSubmit={handleSubmit} noValidate>

          {/* NAME */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="name">{t('contact.name')}</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-field__input"
              placeholder={t('contact.namePH')}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="email">{t('contact.email')}</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-field__input"
              placeholder={t('contact.emailPH')}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* MESSAGE */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="message">{t('contact.message')}</label>
            <textarea
              id="message"
              name="message"
              className="form-field__textarea"
              placeholder={t('contact.messagePH')}
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
              {t('contact.success')}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn--primary contact__submit"
            disabled={isDisabled}
          >
            {loading ? t('contact.sending') : t('contact.submit')}
          </button>

        </form>
      </section>

    </div>
  )
}
