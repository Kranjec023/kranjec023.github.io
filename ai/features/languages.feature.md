# 🤖 AI_FEATURE — Languages (i18n)

---

## Feature Identity

- **Feature Name:** Languages — Internationalization (i18n)
- **Related Area:** Global / Design System / UX
- **Priority:** 🟡 Medium — enhances accessibility for French and German-speaking users
- **Scope:** Global — affects every page and component

---

## Feature Goal

Implement site-wide internationalization supporting English, French, and German. All user-facing text is translated via structured JSON files. The active language is persisted in `localStorage` and a language switcher is accessible on every page via the Header.

---

## Feature Scope

### In Scope (Included)

- English (EN), French (FR), and German (DE) support
- Structured JSON translation files per language
- `localStorage` persistence of language preference
- Language switcher button in the Header (visible on every page)
- All user-facing text translated: navigation, headings, paragraphs, buttons, labels
- `useLanguage` hook + `LanguageContext` for global access

### Out of Scope (Excluded)

- Right-to-left (RTL) language support
- Auto-detect language from browser `navigator.language`
- Per-page language overrides

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — At least 3 languages supported: English, French, German
- **SR-2** — Translation files are structured JSON files per language
- **SR-3** — Language preference is persisted in `localStorage`
- **SR-4** — On first load, defaults to English if no `localStorage` value
- **SR-5** — Language switcher is visible in the Header on every page
- **SR-6** — Clicking the switcher cycles through EN → FR → DE → EN
- **SR-7** — All navigation links are translated
- **SR-8** — All page headings, paragraphs, and labels are translated
- **SR-9** — All button text is translated
- **SR-10** — Active language is visually indicated in the switcher
- **SR-11** — `LanguageContext` provides `t()` function to all components
- **SR-12** — No hardcoded user-facing strings remain in any component

---

## Step-by-Step Build Instructions

### Step 1 — Create translation files

```
src/
└── i18n/
    ├── en.json
    ├── fr.json
    └── de.json
```

```json
// src/i18n/en.json
{
  "nav": {
    "home":      "Home",
    "portfolio": "Portfolio",
    "links":     "Links",
    "contact":   "Contact"
  },
  "home": {
    "label":    "Full-Stack Developer · Finance Professional",
    "headline": "Frédérick\nKranjec-Larose",
    "sub":      "Finance professional turned full-stack developer — combining 3+ years of client-facing experience with hands-on training in the MERN stack, Java, C#, Python, and more.",
    "cta":      "View Portfolio ↗",
    "contact":  "Get in Touch ↗"
  },
  "portfolio": {
    "label":          "01. Portfolio",
    "headline":       "Experience & Projects",
    "sub":            "Finance professional turned full-stack developer — combining 3+ years of client-facing experience with hands-on training in the MERN stack, Java, C#, Python, and more.",
    "downloadResume": "Download Resume ↗",
    "educationLabel": "02. Education",
    "educationTitle": "Academic Background",
    "certLabel":      "03. Certifications",
    "certTitle":      "Licences & Credentials",
    "workLabel":      "04. Work Experience",
    "workTitle":      "Professional History",
    "projectsLabel":  "05. Projects",
    "projectsTitle":  "What I've built"
  },
  "links": {
    "label":    "LINKS",
    "headline": "Everything in one place.",
    "sub":      "A curated list of my profiles, resources, and projects — all accessible from one page."
  },
  "contact": {
    "label":       "CONTACT",
    "headline":    "Let's work together.",
    "sub":         "Have a project in mind, a question, or just want to connect? Send me a message and I'll get back to you as soon as possible.",
    "directEmail": "Or reach me directly at",
    "name":        "Name",
    "email":       "Email",
    "message":     "Message",
    "namePH":      "Frédérick Kranjec-Larose",
    "emailPH":     "hello@example.com",
    "messagePH":   "Tell me about your project or opportunity...",
    "submit":      "Send Message ↗",
    "sending":     "Sending...",
    "success":     "Message sent! I'll get back to you soon.",
    "errorEmpty":  "Please fill in all fields.",
    "errorEmail":  "Please enter a valid email address.",
    "errorFail":   "Something went wrong. Please try again."
  },
  "backoffice": {
    "label":      "ADMIN",
    "headline":   "Back Office",
    "messages":   "Messages",
    "noMessages": "No messages yet.",
    "loading":    "Loading messages...",
    "colName":    "Name",
    "colEmail":   "Email",
    "colDate":    "Date",
    "colActions": "Actions",
    "view":       "View",
    "delete":     "Delete",
    "logout":     "Logout ↗",
    "from":       "From",
    "close":      "Close",
    "deleteMsg":  "Delete Message",
    "errorFetch": "Failed to load messages. Please try again.",
    "errorDel":   "Failed to delete message."
  },
  "login": {
    "label":    "ADMIN",
    "headline": "Back Office",
    "sub":      "This page is not publicly listed.",
    "email":    "Email",
    "password": "Password",
    "submit":   "Sign In ↗",
    "loading":  "Signing in...",
    "error":    "Invalid login credentials. Please try again."
  }
}
```

```json
// src/i18n/fr.json
{
  "nav": {
    "home":      "Accueil",
    "portfolio": "Portfolio",
    "links":     "Liens",
    "contact":   "Contact"
  },
  "home": {
    "label":    "Développeur Full-Stack · Professionnel en Finance",
    "headline": "Frédérick\nKranjec-Larose",
    "sub":      "Professionnel en finance reconverti en développeur full-stack — alliant plus de 3 ans d'expérience client avec une formation pratique en MERN, Java, C#, Python, et plus encore.",
    "cta":      "Voir le Portfolio ↗",
    "contact":  "Me Contacter ↗"
  },
  "portfolio": {
    "label":          "01. Portfolio",
    "headline":       "Expérience & Projets",
    "sub":            "Professionnel en finance reconverti en développeur full-stack — alliant plus de 3 ans d'expérience client avec une formation pratique en MERN, Java, C#, Python, et plus encore.",
    "downloadResume": "Télécharger le CV ↗",
    "educationLabel": "02. Formation",
    "educationTitle": "Parcours Académique",
    "certLabel":      "03. Certifications",
    "certTitle":      "Licences & Accréditations",
    "workLabel":      "04. Expérience Professionnelle",
    "workTitle":      "Historique Professionnel",
    "projectsLabel":  "05. Projets",
    "projectsTitle":  "Ce que j'ai construit"
  },
  "links": {
    "label":    "LIENS",
    "headline": "Tout en un seul endroit.",
    "sub":      "Une liste organisée de mes profils, ressources et projets — accessibles depuis une seule page."
  },
  "contact": {
    "label":       "CONTACT",
    "headline":    "Travaillons ensemble.",
    "sub":         "Vous avez un projet, une question ou souhaitez simplement échanger ? Envoyez-moi un message et je vous répondrai dès que possible.",
    "directEmail": "Ou rejoignez-moi directement à",
    "name":        "Nom",
    "email":       "Courriel",
    "message":     "Message",
    "namePH":      "Frédérick Kranjec-Larose",
    "emailPH":     "bonjour@exemple.com",
    "messagePH":   "Parlez-moi de votre projet ou opportunité...",
    "submit":      "Envoyer le message ↗",
    "sending":     "Envoi en cours...",
    "success":     "Message envoyé ! Je vous répondrai bientôt.",
    "errorEmpty":  "Veuillez remplir tous les champs.",
    "errorEmail":  "Veuillez entrer une adresse courriel valide.",
    "errorFail":   "Une erreur s'est produite. Veuillez réessayer."
  },
  "backoffice": {
    "label":      "ADMIN",
    "headline":   "Panneau d'Administration",
    "messages":   "Messages",
    "noMessages": "Aucun message pour l'instant.",
    "loading":    "Chargement des messages...",
    "colName":    "Nom",
    "colEmail":   "Courriel",
    "colDate":    "Date",
    "colActions": "Actions",
    "view":       "Voir",
    "delete":     "Supprimer",
    "logout":     "Déconnexion ↗",
    "from":       "De",
    "close":      "Fermer",
    "deleteMsg":  "Supprimer le message",
    "errorFetch": "Échec du chargement des messages. Veuillez réessayer.",
    "errorDel":   "Échec de la suppression du message."
  },
  "login": {
    "label":    "ADMIN",
    "headline": "Panneau d'Administration",
    "sub":      "Cette page n'est pas répertoriée publiquement.",
    "email":    "Courriel",
    "password": "Mot de passe",
    "submit":   "Se connecter ↗",
    "loading":  "Connexion en cours...",
    "error":    "Identifiants invalides. Veuillez réessayer."
  }
}
```

```json
// src/i18n/de.json
{
  "nav": {
    "home":      "Startseite",
    "portfolio": "Portfolio",
    "links":     "Links",
    "contact":   "Kontakt"
  },
  "home": {
    "label":    "Full-Stack Entwickler · Finanzfachmann",
    "headline": "Frédérick\nKranjec-Larose",
    "sub":      "Finanzfachmann, der zum Full-Stack-Entwickler wurde — 3+ Jahre Kundenerfahrung kombiniert mit praxisnaher Ausbildung in MERN, Java, C#, Python und mehr.",
    "cta":      "Portfolio ansehen ↗",
    "contact":  "Kontakt aufnehmen ↗"
  },
  "portfolio": {
    "label":          "01. Portfolio",
    "headline":       "Erfahrung & Projekte",
    "sub":            "Finanzfachmann, der zum Full-Stack-Entwickler wurde — 3+ Jahre Kundenerfahrung kombiniert mit praxisnaher Ausbildung in MERN, Java, C#, Python und mehr.",
    "downloadResume": "Lebenslauf herunterladen ↗",
    "educationLabel": "02. Ausbildung",
    "educationTitle": "Akademischer Werdegang",
    "certLabel":      "03. Zertifizierungen",
    "certTitle":      "Lizenzen & Zeugnisse",
    "workLabel":      "04. Berufserfahrung",
    "workTitle":      "Beruflicher Werdegang",
    "projectsLabel":  "05. Projekte",
    "projectsTitle":  "Was ich gebaut habe"
  },
  "links": {
    "label":    "LINKS",
    "headline": "Alles an einem Ort.",
    "sub":      "Eine kuratierte Liste meiner Profile, Ressourcen und Projekte — alles von einer Seite aus zugänglich."
  },
  "contact": {
    "label":       "KONTAKT",
    "headline":    "Lass uns zusammenarbeiten.",
    "sub":         "Haben Sie ein Projekt, eine Frage oder möchten Sie sich einfach vernetzen? Schicken Sie mir eine Nachricht und ich melde mich so schnell wie möglich.",
    "directEmail": "Oder erreichen Sie mich direkt unter",
    "name":        "Name",
    "email":       "E-Mail",
    "message":     "Nachricht",
    "namePH":      "Frédérick Kranjec-Larose",
    "emailPH":     "hallo@beispiel.com",
    "messagePH":   "Erzählen Sie mir von Ihrem Projekt oder Ihrer Anfrage...",
    "submit":      "Nachricht senden ↗",
    "sending":     "Wird gesendet...",
    "success":     "Nachricht gesendet! Ich melde mich bald.",
    "errorEmpty":  "Bitte füllen Sie alle Felder aus.",
    "errorEmail":  "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    "errorFail":   "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
  },
  "backoffice": {
    "label":      "ADMIN",
    "headline":   "Verwaltungsbereich",
    "messages":   "Nachrichten",
    "noMessages": "Noch keine Nachrichten.",
    "loading":    "Nachrichten werden geladen...",
    "colName":    "Name",
    "colEmail":   "E-Mail",
    "colDate":    "Datum",
    "colActions": "Aktionen",
    "view":       "Ansehen",
    "delete":     "Löschen",
    "logout":     "Abmelden ↗",
    "from":       "Von",
    "close":      "Schließen",
    "deleteMsg":  "Nachricht löschen",
    "errorFetch": "Nachrichten konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
    "errorDel":   "Nachricht konnte nicht gelöscht werden."
  },
  "login": {
    "label":    "ADMIN",
    "headline": "Verwaltungsbereich",
    "sub":      "Diese Seite ist nicht öffentlich gelistet.",
    "email":    "E-Mail",
    "password": "Passwort",
    "submit":   "Anmelden ↗",
    "loading":  "Anmeldung läuft...",
    "error":    "Ungültige Anmeldedaten. Bitte versuchen Sie es erneut."
  }
}
```

### Step 2 — Create `useLanguage.js` hook

```js
// src/hooks/useLanguage.js

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
```

### Step 3 — Create `LanguageContext.jsx`

```jsx
// src/context/LanguageContext.jsx

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
```

### Step 4 — Wrap the app in `main.jsx`

```jsx
// src/main.jsx
import { StrictMode }      from 'react'
import { createRoot }      from 'react-dom/client'
import { HashRouter }      from 'react-router-dom'
import { ThemeProvider }    from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
)
```

### Step 5 — Add language switcher to `Header.jsx`

```jsx
// src/components/Header.jsx
// ...existing code...
import { useLanguageContext } from '../context/LanguageContext'

export default function Header() {
  const { theme, toggleTheme }       = useThemeContext()
  const { language, toggleLanguage } = useLanguageContext()

  const LANG_LABELS = { en: 'EN', fr: 'FR', de: 'DE' }

  return (
    <header className="header">
      {/* ...existing code... */}

      {/* LANGUAGE SWITCHER */}
      <button
        className="header__lang-toggle"
        onClick={toggleLanguage}
        aria-label={`Switch language — current: ${language.toUpperCase()}`}
        title="Switch language"
      >
        {LANG_LABELS[language]}
      </button>

      {/* THEME TOGGLE */}
      <button
        className="header__theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀︎' : '☾'}
      </button>

      {/* ...existing code... */}
    </header>
  )
}
```

### Step 6 — Add language switcher styles to `header.css`

```css
/* src/styles/header.css */
/* ...existing code... */

/* ── LANGUAGE TOGGLE ── */
.header__lang-toggle {
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  width: 2.5rem;
  height: 2rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, color 0.2s;
  flex-shrink: 0;
}

.header__lang-toggle:hover {
  border-color: var(--color-text-primary);
  color: var(--color-text-primary);
}
```

### Step 7 — Use `t()` in every page

**Example — `Contact.jsx`:**
```jsx
// src/pages/Contact.jsx
// ...existing code...
import { useLanguageContext } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguageContext()
  // ...existing code...

  return (
    <div className="contact">
      <section className="contact__hero">
        <p className="contact__label">{t('contact.label')}</p>
        <h1 className="contact__headline">{t('contact.headline')}</h1>
        <p className="contact__sub">{t('contact.sub')}</p>
      </section>

      <section className="contact__section">
        <form className="contact__form" onSubmit={handleSubmit} noValidate>

          <div className="form-field">
            <label htmlFor="name">{t('contact.name')}</label>
            <input placeholder={t('contact.namePH')} {/* ...existing code... */} />
          </div>

          <div className="form-field">
            <label htmlFor="email">{t('contact.email')}</label>
            <input placeholder={t('contact.emailPH')} {/* ...existing code... */} />
          </div>

          <div className="form-field">
            <label htmlFor="message">{t('contact.message')}</label>
            <textarea placeholder={t('contact.messagePH')} {/* ...existing code... */} />
          </div>

          <button type="submit" disabled={isDisabled}>
            {loading ? t('contact.sending') : t('contact.submit')}
          </button>

        </form>
      </section>
    </div>
  )
}
```

> Apply the same `t()` pattern to **every** page: `Home`, `Portfolio`, `Links`, `Login`, `BackOffice`.

---

## File Structure After Feature

```
src/
├── i18n/
│   ├── en.json
│   ├── fr.json
│   └── de.json
├── hooks/
│   └── useLanguage.js
├── context/
│   └── LanguageContext.jsx
├── main.jsx           ← wrapped with LanguageProvider
└── components/
    └── Header.jsx     ← language switcher added
```

---

## How It Works — Flow Diagram

```
App loads
   │
   ├── localStorage has 'language'?
   │     YES → use stored value (en / fr / de)
   │     NO  → default to 'en'
   │
   ▼
LanguageContext provides t() to all components
   │
   ▼
t('contact.submit') → translations[language].contact.submit
   │
User clicks language toggle
   │
   ▼
toggleLanguage() → cycles EN → FR → DE → EN
                → saves to localStorage
                → all t() calls re-render with new language
```

---

## Acceptance Criteria

- [ ] SR-1 through SR-12 are all implemented
- [ ] `en.json`, `fr.json`, `de.json` exist with all keys
- [ ] Language defaults to `en` on first load
- [ ] `localStorage` preference is respected on subsequent loads
- [ ] Language switcher is visible in the Header on every page
- [ ] Clicking the switcher cycles EN → FR → DE → EN
- [ ] All nav links, headings, paragraphs, buttons, and labels are translated
- [ ] `t()` function is used in every page — no hardcoded user-facing strings
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors

---

## Notes for the AI

- `t('nav.home')` uses dot notation — `key.split('.')` traverses the JSON tree
- If a key is missing, `t()` returns the key itself as a fallback — easy to spot missing translations
- `toggleLanguage()` cycles through the `LANGUAGES` array using modulo — adding a 4th language later is a one-line change
- `LanguageProvider` wraps inside `ThemeProvider` in `main.jsx` — order does not matter but must be inside `HashRouter`
- Every page imports `useLanguageContext` and destructures `t` — no prop drilling needed
- Translation keys are namespaced by page (`contact.*`, `portfolio.*`, etc.) — easy to find and update