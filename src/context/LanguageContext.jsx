import { createContext, useContext } from 'react'
import { useLanguage } from '../hooks/useLanguage'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const value = useLanguage()
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  return useContext(LanguageContext)
}
