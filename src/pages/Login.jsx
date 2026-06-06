import { useState, useEffect } from 'react'
import { useNavigate }         from 'react-router-dom'
import '../styles/login.css'
import { supabase } from '../lib/supabaseClient'
import { useLanguageContext } from '../context/LanguageContext'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useLanguageContext()

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
      setError(t('login.error'))
      return
    }

    navigate('/backoffice')
  }

  const isDisabled = loading || !email || !password

  return (
    <div className="login">
      <div className="login__card">

        <p className="login__label">{t('login.label')}</p>
        <h1 className="login__headline">{t('login.headline')}</h1>
        <p className="login__sub">{t('login.sub')}</p>

        <form className="login__form" onSubmit={handleSubmit} noValidate>

          {/* EMAIL */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="email">{t('login.email')}</label>
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
            <label className="form-field__label" htmlFor="password">{t('login.password')}</label>
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
            {loading ? t('login.loading') : t('login.submit')}
          </button>

        </form>
      </div>
    </div>
  )
}
