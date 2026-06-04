# 🤖 AI_FEATURE — UI/UX Improvements

---

## Feature Identity

- **Feature Name:** UI/UX Improvements — Readability, Navigation & Carousels
- **Related Area:** Global UI / About / Portfolio / Links / Contact / **Home** Pages
- **Priority:** 🟡 Medium — polish pass after core pages are built

---

## Feature Goal

Improve overall readability, clean up redundant numbering in the UI, introduce carousel-based sections on the Links, Portfolio, and About pages for a more dynamic and polished look, and ensure the language toggle works consistently across **all pages**.

---

## Feature Scope

### In Scope (Included)

- Increase font size and improve color contrast for muted/grey text across the app — **both dark and light themes**
- Remove number prefixes from nav links and section titles
- Links page: standalone icon links replaced by **full cards in a carousel** — icon + name + description + arrow
- Portfolio page: Licences & Credentials displayed as **full cards in a carousel** with icon + name + issuer + description
- About page: profile summary paragraph + languages/technologies as **full cards in a carousel** with icon + name + description
- All carousels auto-play and slide smoothly from right to left with CSS transitions
- **Language toggle applies to every page** — all user-facing strings on **Home**, About, Portfolio, Links, and Contact pages use the `t()` translation function

### Out of Scope (Excluded)

- New pages or routes
- Backend/data changes
- Carousel touch/drag support (basic prev/next arrows + auto-play only)

---

## Sub-Requirements

- **SR-1** — Muted/grey text (`--color-text-muted`) is updated to a readable color on **both** themes: `#bbbbbb` (dark) / `#555555` (light)
- **SR-2** — Muted text font size is increased to at least `0.95rem` where it was previously smaller
- **SR-3** — Number prefixes (e.g. `01.`, `02.`) are removed from nav link labels in `Header.jsx` and `MobileNav.jsx`
- **SR-4** — Number prefixes are removed from any section/page titles that use them
- **SR-5** — The "About" nav label is the plain string `"About"` — not driven by a translation key
- **SR-6** — Links page renders external links inside a horizontal **card carousel** — no standalone icon links
- **SR-7** — Each link card shows: **platform logo/icon** (always visible) + platform name + short description + clickable arrow
- **SR-8** — Portfolio page has a "Licences & Credentials" **card carousel** section
- **SR-9** — Each credential card shows: icon/logo + credential name + issuer + brief description
- **SR-10** — About page has a short profile summary paragraph at the top
- **SR-11** — About page has a "Skills & Technologies" **card carousel** section
- **SR-12** — Each skill card shows: technology icon + name + brief description
- **SR-13** — All carousels have prev/next navigation arrows
- **SR-14** — Carousels show 3 cards on desktop, 1 on mobile
- **SR-15** — Carousels **auto-play**: advance one card every 3 seconds automatically
- **SR-16** — Auto-play pauses on mouse hover, resumes on mouse leave
- **SR-17** — Carousel card transitions use a smooth CSS slide animation from right to left
- **SR-18** — Carousels clamp at boundaries (no infinite scroll required), auto-play resets to index 0 when it reaches the end
- **SR-19** — Skills array stores **component references** (not JSX elements) at module level — JSX is rendered inside `SkillCard` via `<Icon />` to avoid React rendering errors
- **SR-20** — About page skills carousel includes all **20 skills**: MongoDB, Express.js, React, Node.js, Git, Java, C#, Python, PHP, Bash, SQL / MySQL, React Native, HTML / CSS / JS, REST APIs, Bootstrap, Selenium IDE, Lighthouse, Tailwind CSS, JavaScript, React Native
- **SR-21** — Carousel `translateX` uses `items.length` in the percentage formula so all cards are reachable: `translateX(-${index * (100 / items.length)}%)`
- **SR-22** — Every page (`Home`, `About`, `Portfolio`, `Links`, `Contact`) imports and uses `useLanguageContext` + `t()` for **all user-facing strings** (headings, labels, descriptions, section titles, card text)
- **SR-23** — Translation keys are added to **all three locale files** (`en.json`, `fr.json`, `de.json`) for every new string introduced in SR-22
- **SR-24** — Switching language in the header updates text on the currently active page **immediately** with no reload
- **SR-25** — Skill card `nameKey` and `descKey` fields in `About.jsx` use translation keys so they update on language switch
- **SR-26** — Credential card `nameKey`, `issuerKey`, and `descKey` fields in `Portfolio.jsx` use translation keys
- **SR-27** — Link card `nameKey` and `descKey` fields in `Links.jsx` use translation keys
- **SR-28** — All pages that previously showed standalone icon links now show **cards inside a carousel** — no page uses bare icon-only links as its primary display format
- **SR-29** — `Home.jsx` imports and uses `useLanguageContext` + `t()` for **every** hardcoded user-facing string: hero label, headline, intro, CTA buttons, availability badge, section labels, section titles, and all skill card titles and descriptions
- **SR-30** — `Home.jsx` tech skill and soft skill arrays store **translation keys** (`titleKey`, `textKey`) instead of hardcoded strings — `t()` is called inside the card render, not at module level
- **SR-31** — All Home page translation keys (`home.*`) are present in `en.json`, `fr.json`, and `de.json`

---

## Known Bugs Fixed

### ⚠️ Blank Page Bug — JSX at Module Level

**Problem:** Defining JSX elements (e.g. `<FaReact />`) directly inside a module-level `const skills = [...]` array causes a React rendering error and blank page.

**Root Cause:** JSX must be created inside a React component or function — not at module scope.

**Fix:** Store the **component reference** (e.g. `FaReact`) in the array, then render it as `<Icon />` inside the card component:

```jsx
// ❌ Wrong — JSX at module level
const skills = [
  { icon: <FaReact />, name: 'React', ... },
]

// ✅ Correct — component reference + translation keys, rendered inside card
const skills = [
  { icon: FaReact, nameKey: 'about.skills.react.name', descKey: 'about.skills.react.desc' },
]

function SkillCard({ icon: Icon, nameKey, descKey }) {
  const { t } = useLanguageContext()
  return (
    <div className="skill-card">
      <span className="skill-card__icon"><Icon /></span>
      <h3 className="skill-card__name">{t(nameKey)}</h3>
      <p className="skill-card__desc">{t(descKey)}</p>
    </div>
  )
}
```

> This same pattern applies to `LinkCard`, `CredentialCard`, `SkillCard`, and Home page skill cards.

---

### ⚠️ Carousel Overshooting Bug — Wrong `translateX` Formula

**Problem:** Not all cards are visible/reachable when scrolling the carousel — cards past a certain index are never shown.

**Root Cause:** `translateX` percentages are relative to the **element's own width** (the track), not the window. Each card is `100% / visibleCount` of the **window** width, making the track `items.length / visibleCount * 100%` wide. Using `visibleCount` in the formula massively overshoots each step.

**Fix:** Use `items.length` in the denominator:

```jsx
// ❌ Wrong — overshoots, hides cards
style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}

// ✅ Correct — moves exactly one card width per step
style={{ transform: `translateX(-${index * (100 / items.length)}%)` }}
```

---

### ⚠️ Language Toggle Only Works on Home Page

**Problem:** Switching language in the header has no effect on About, Portfolio, Links, or Contact pages — all text stays in the default language.

**Root Cause:** Page components were using hardcoded strings instead of `t()` from `useLanguageContext`. The context updates correctly but the strings are never re-evaluated.

**Fix:** Every page must:
1. Import `useLanguageContext`
2. Destructure `t` from it
3. Replace every hardcoded user-facing string with `t('some.key')`
4. Add the corresponding key to all three locale JSON files

```jsx
// ❌ Wrong — hardcoded, ignores language toggle
export default function About() {
  return <h1>About Me</h1>
}

// ✅ Correct — reacts to language toggle
export default function About() {
  const { t } = useLanguageContext()
  return <h1>{t('about.heading')}</h1>
}
```

> This applies to **all pages** — including `Home.jsx` (SR-29 to SR-31).

---

### ⚠️ Home Page Skill Arrays Using Hardcoded Strings (SR-29)

**Problem:** `techSkills` and `softSkills` arrays in `Home.jsx` use hardcoded `title` and `text` strings — switching language has no effect on the Home page skill cards.

**Root Cause:** Strings are defined at module level outside any component, so `t()` is never called on them.

**Fix:** Replace `title`/`text` with `titleKey`/`textKey` translation keys, and call `t()` inside the card render:

```jsx
// ❌ Wrong — hardcoded, won't update on language switch
const techSkills = [
  { icon: FaCode, title: 'Full-Stack Development', text: 'Building end-to-end web applications...' },
]

// ✅ Correct — translation keys, t() called inside render
const techSkills = [
  { icon: FaCode, titleKey: 'home.skills.fullstack.title', textKey: 'home.skills.fullstack.text' },
]

function TechCard({ icon: Icon, titleKey, textKey }) {
  const { t } = useLanguageContext()
  return (
    <div className="skill-card">
      <span className="skill-card__icon"><Icon /></span>
      <h3 className="skill-card__title">{t(titleKey)}</h3>
      <p className="skill-card__text">{t(textKey)}</p>
    </div>
  )
}
```

---

## Step-by-Step Build Instructions

### Step 1 — Fix muted text readability for both themes (global.css)

```css
/* filepath: src/styles/global.css */
:root[data-theme='dark'], :root {
  --color-text-muted: #bbbbbb;
}
:root[data-theme='light'] {
  --color-text-muted: #555555;
}
```

### Step 2 — Add Home page translation keys to all locale files (SR-29 to SR-31)

```json
// filepath: src/locales/en.json — add these keys
{
  "home.label":                           "Full-Stack Developer",
  "home.headline":                        "Frédérick\nKranjec-Larose",
  "home.sub":                             "I build clean, functional systems — from database to UI.",
  "home.cta":                             "View My Work",
  "home.contact":                         "Get In Touch",
  "home.availability":                    "Available for work",

  "home.skills.label":                    "Technical Skills",
  "home.skills.title":                    "What I build with",
  "home.skills.fullstack.title":          "Full-Stack Development",
  "home.skills.fullstack.text":           "Building end-to-end web applications with React, Node.js, and REST APIs.",
  "home.skills.data.title":               "Data & Databases",
  "home.skills.data.text":                "Designing schemas and querying PostgreSQL and NoSQL databases.",
  "home.skills.cloud.title":              "Cloud & DevOps",
  "home.skills.cloud.text":               "Deploying and automating workflows using GitHub Actions and cloud platforms.",
  "home.skills.languages.title":          "Languages",
  "home.skills.languages.text":           "Proficient in JavaScript, Python, Java, C#, and more.",
  "home.skills.ai.title":                 "AI & Automation",
  "home.skills.ai.text":                  "Integrating AI tools and building automation pipelines for real-world problems.",

  "home.soft.label":                      "Soft Skills & Talents",
  "home.soft.title":                      "What I bring to the team",
  "home.soft.collab.title":               "Team Collaboration",
  "home.soft.collab.text":                "Thrived in cross-functional teams across finance desks and dev squads.",
  "home.soft.business.title":             "Business Acumen",
  "home.soft.business.text":              "Bachelor's in accounting + 3 years in finance — I write code that makes business sense.",
  "home.soft.multilingual.title":         "Multilingual",
  "home.soft.multilingual.text":          "Fluent in French, English, and German — I can debug in three languages.",
  "home.soft.problem.title":              "Problem Solving",
  "home.soft.problem.text":              "Drawn to clean logic and elegant solutions — in code and on the bouldering wall.",
  "home.soft.adapt.title":                "Adaptability",
  "home.soft.adapt.text":                 "Transitioned from finance to tech — I learn fast and deliver under pressure."
}
```

> ⚠️ Add the equivalent translated values for every key above in `fr.json` and `de.json`.

### Step 3 — Update `Home.jsx` to use `t()` everywhere (SR-29 to SR-31)

```jsx
// filepath: src/pages/Home.jsx
import { useLanguageContext } from '../context/LanguageContext'
import { FaCode, FaDatabase, FaCloud, FaLaptopCode, FaRobot } from 'react-icons/fa'
import { FaUsers, FaBriefcase, FaGlobe, FaPuzzlePiece, FaBolt } from 'react-icons/fa'

// ✅ Icon refs + translation keys — no hardcoded strings
const techSkills = [
  { icon: FaCode,       titleKey: 'home.skills.fullstack.title', textKey: 'home.skills.fullstack.text' },
  { icon: FaDatabase,   titleKey: 'home.skills.data.title',      textKey: 'home.skills.data.text' },
  { icon: FaCloud,      titleKey: 'home.skills.cloud.title',     textKey: 'home.skills.cloud.text' },
  { icon: FaLaptopCode, titleKey: 'home.skills.languages.title', textKey: 'home.skills.languages.text' },
  { icon: FaRobot,      titleKey: 'home.skills.ai.title',        textKey: 'home.skills.ai.text' },
]

const softSkills = [
  { icon: FaUsers,       titleKey: 'home.soft.collab.title',       textKey: 'home.soft.collab.text' },
  { icon: FaBriefcase,   titleKey: 'home.soft.business.title',     textKey: 'home.soft.business.text' },
  { icon: FaGlobe,       titleKey: 'home.soft.multilingual.title', textKey: 'home.soft.multilingual.text' },
  { icon: FaPuzzlePiece, titleKey: 'home.soft.problem.title',      textKey: 'home.soft.problem.text' },
  { icon: FaBolt,        titleKey: 'home.soft.adapt.title',        textKey: 'home.soft.adapt.text' },
]

// ✅ t() called inside the card component — not at module level
function SkillCard({ icon: Icon, titleKey, textKey }) {
  const { t } = useLanguageContext()
  return (
    <div className="skill-card">
      <span className="skill-card__icon"><Icon /></span>
      <h3 className="skill-card__title">{t(titleKey)}</h3>
      <p className="skill-card__text">{t(textKey)}</p>
    </div>
  )
}

export default function Home() {
  const { t } = useLanguageContext()

  return (
    <div className="home">
      <section className="home__hero" id="hero">
        <div className="home__hero-content">
          <p className="home__label">{t('home.label')}</p>
          <h1 className="home__headline">{t('home.headline')}</h1>
          <p className="home__intro">{t('home.sub')}</p>
          <div className="home__ctas">
            <a href="#/portfolio" className="btn btn--primary">{t('home.cta')}</a>
            <a href="#/contact"   className="btn btn--ghost">{t('home.contact')}</a>
          </div>
          <p className="home__availability">
            <span className="home__dot">●</span> {t('home.availability')}
          </p>
        </div>
        <div className="home__hero-image">
          <img src={heroImage} alt="Frédérick Kranjec-Larose — Full-Stack Developer portrait" />
        </div>
      </section>

      <section className="home__skills" id="skills">
        <p className="home__section-label">{t('home.skills.label')}</p>
        <h2 className="home__section-title">{t('home.skills.title')}</h2>
        <div className="home__skills-grid">
          {techSkills.map((item, i) => <SkillCard key={i} {...item} />)}
        </div>
      </section>

      <section className="home__soft" id="soft-skills">
        <p className="home__section-label">{t('home.soft.label')}</p>
        <h2 className="home__section-title">{t('home.soft.title')}</h2>
        <div className="home__skills-grid">
          {softSkills.map((item, i) => <SkillCard key={i} {...item} />)}
        </div>
      </section>
    </div>
  )
}
```

---

## File Changes Summary

| File | Change |
|---|---|
| `src/styles/global.css` | `--color-text-muted` per theme (dark + light), bump font size |
| `src/components/Header.jsx` | `'About'` plain string, remove number prefixes |
| `src/components/MobileNav.jsx` | `'About'` plain string, remove number prefixes |
| `src/components/Carousel.jsx` | **New** — reusable carousel with auto-play + smooth slide + SR-21 fix |
| `src/styles/carousel.css` | **New** — sliding track styles, responsive |
| `src/styles/cards.css` | **New** — shared card styles for both themes |
| `src/locales/en.json` | **Add** all new translation keys for **Home**, About, Portfolio, Links, Contact |
| `src/locales/fr.json` | **Add** French translations for all new keys |
| `src/locales/de.json` | **Add** German translations for all new keys |
| `src/pages/Home.jsx` | **All strings via `t()`** — skill arrays use `titleKey`/`textKey` (SR-29 to SR-31) |
| `src/pages/Links.jsx` | **Cards in carousel** — no bare icon links (SR-28) — all strings via `t()` |
| `src/pages/Portfolio.jsx` | **Cards in carousel** — credentials section — all strings via `t()` |
| `src/pages/About.jsx` | **Cards in carousel** — profile summary + 20 skills — all strings via `t()` |
| `src/pages/Contact.jsx` | **All strings via `t()`** — form labels, placeholders, feedback messages |

---

## Acceptance Criteria

- [ ] SR-1 through SR-31 are all implemented
- [ ] Muted text is clearly legible on **both dark and light themes**
- [ ] `'About'` appears as a plain label — no translation key
- [ ] No `01.` / `02.` prefixes appear anywhere in nav or titles
- [ ] All carousels auto-play every 3 s and pause on hover
- [ ] Cards slide smoothly right-to-left via CSS `transform` transition
- [ ] **No page uses bare icon links** — all icons are inside cards, all cards are inside carousels (SR-28)
- [ ] Each card shows: icon + name + description (+ issuer for credentials, + arrow for links)
- [ ] Carousels show 3 cards on desktop, 1 on mobile
- [ ] Prev/Next arrows disable correctly at boundaries; auto-play loops back to 0
- [ ] All 20 skills are reachable and visible in the carousel (SR-21 fix applied)
- [ ] **Switching language updates text on ALL pages immediately — no reload required**
- [ ] All three locale files (`en`, `fr`, `de`) have translations for every new key on every page
- [ ] No blank page — all icon arrays use component references, not JSX elements
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors