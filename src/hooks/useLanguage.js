import { useState } from 'react'
import en from '../i18n/en.json'
import fr from '../i18n/fr.json'
import de from '../i18n/de.json'

const translations = { en, fr, de }
const LANGUAGES    = ['en', 'fr', 'de']

function getInitialLanguage() {
  const stored = localStorage.getItem('language')
  if (stored && LANGUAGES.includes(stored)) return stored
  return 'en'
}

export function useLanguage() {
  const [language, setLanguage] = useState(getInitialLanguage)

  function toggleLanguage() {
    const next = LANGUAGES[(LANGUAGES.indexOf(language) + 1) % LANGUAGES.length]
    setLanguage(next)
    localStorage.setItem('language', next)
  }

  function setLang(lang) {
    if (!LANGUAGES.includes(lang)) return
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  // t('contact.submit') → looks up translations[language].contact.submit
  function t(key) {
    const keys   = key.split('.')
    let   result = translations[language]
    for (const k of keys) {
      result = result?.[k]
    }
    return result ?? key
  }

  return { language, toggleLanguage, setLang, t, LANGUAGES }
}
