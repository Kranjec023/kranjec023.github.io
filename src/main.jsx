import { StrictMode }      from 'react'
import { createRoot }      from 'react-dom/client'
import { HashRouter }      from 'react-router-dom'
import { ThemeProvider }    from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
