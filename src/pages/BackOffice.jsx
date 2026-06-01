import { useState, useEffect, useCallback } from 'react'
import { useNavigate }                       from 'react-router-dom'
import '../styles/backoffice.css'
import { supabase } from '../lib/supabaseClient'
import { useLanguageContext } from '../context/LanguageContext'

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
  const { t } = useLanguageContext()

  const [messages,  setMessages]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [selected,  setSelected]  = useState(null)

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
      setError(t('backoffice.errorFetch'))
      return
    }

    setMessages(data)
  }, [t])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  // ── Delete Message ──
  async function handleDelete(id) {
    const { error: deleteError } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (deleteError) {
      setError(t('backoffice.errorDel'))
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
          <p className="backoffice__label">{t('backoffice.label')}</p>
          <h1 className="backoffice__headline">{t('backoffice.headline')}</h1>
        </div>
        <button className="btn btn--ghost backoffice__logout" onClick={handleLogout}>
          {t('backoffice.logout')}
        </button>
      </div>

      {/* ── MESSAGES SECTION ── */}
      <section className="backoffice__section">
        <h2 className="backoffice__section-title">
          {t('backoffice.messages')}
          <span className="backoffice__count">{messages.length}</span>
        </h2>

        {loading && <p className="backoffice__status">{t('backoffice.loading')}</p>}

        {error && (
          <div className="form-feedback form-feedback--error">
            <span className="form-feedback__icon">✗</span>
            {error}
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <p className="backoffice__status">{t('backoffice.noMessages')}</p>
        )}

        {!loading && messages.length > 0 && (
          <div className="backoffice__table-wrap">
            <table className="backoffice__table">
              <thead>
                <tr>
                  <th>{t('backoffice.colName')}</th>
                  <th>{t('backoffice.colEmail')}</th>
                  <th>{t('backoffice.colDate')}</th>
                  <th>{t('backoffice.colActions')}</th>
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
                          {t('backoffice.view')}
                        </button>
                        <button
                          className="backoffice__btn-delete"
                          onClick={() => handleDelete(msg.id)}
                        >
                          {t('backoffice.delete')}
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
              <p><span>{t('backoffice.from')}</span> {selected.name}</p>
              <p><span>Email</span> {selected.email}</p>
              <p><span>{t('backoffice.colDate')}</span> {formatDate(selected.created_at)}</p>
            </div>

            <div className="modal__body">
              <p>{selected.message}</p>
            </div>

            <div className="modal__footer">
              <button
                className="backoffice__btn-delete"
                onClick={() => handleDelete(selected.id)}
              >
                {t('backoffice.deleteMsg')}
              </button>
              <button
                className="btn btn--ghost"
                onClick={() => setSelected(null)}
              >
                {t('backoffice.close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
