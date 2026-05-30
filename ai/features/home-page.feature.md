# 🤖 AI_FEATURE — Home Page

---

## Feature Identity

- **Feature Name:** Home Page — Introduction, Technical Skills & Soft Skills
- **Related Area:** Pages / Content
- **Priority:** 🔴 High — first visible page, primary impression for recruiters
- **Route:** `/` (root path — default landing page)

---

## Feature Goal

Build the Home page as the default landing page of the portfolio. It must present Frédérick Kranjec-Larose with a compelling introduction, a structured technical skills section, and a soft skills section — all organized into clear visual sections with AI-generated imagery, consistent with the dark minimal design system.

---

## Feature Scope

### In Scope (Included)

- Home page accessible at the root path `/`
- Hero / Introduction section — name, title, tagline, intro paragraph
- Technical Skills section — at least 3 skills, each with icon + supporting text
- Soft Skills section — at least 3 talents, each with icon + supporting text
- At least 2 AI-generated images on the page with proper `alt` text
- Visual section separation (spacing, backgrounds, or dividers)
- Responsive layout across desktop and mobile

### Out of Scope (Excluded)

- Selected Work / Projects preview (handled in `portfolio.feature.md`)
- Contact form (handled in `contact.feature.md`)
- Back office (handled in `back-office.feature.md`)
- Animations beyond simple CSS transitions

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — Home page is accessible at `/` and is the default landing page
- **SR-2** — Student's name is prominently displayed in the hero section
- **SR-3** — A role/title or tagline is visible (e.g. `Full-Stack Developer`)
- **SR-4** — A brief introductory paragraph describes who Frédérick is
- **SR-5** — Technical skills section contains at least 3 skills
- **SR-6** — Each technical skill has an icon and supporting descriptive text
- **SR-7** — Technical skills are visually organized (grid or card layout)
- **SR-8** — Soft skills section contains at least 3 talents
- **SR-9** — Each soft skill has an icon and supporting descriptive text
- **SR-10** — Soft skills are visually organized (grid or card layout)
- **SR-11** — Page has at least 3 distinct, visually separated sections
- **SR-12** — At least 2 images on the page are AI-generated
- **SR-13** — All images have appropriate `alt` text
- **SR-14** — AI tool(s) used are documented in a comment in the component file
- **SR-15** — Page is fully responsive on desktop and mobile

---

## Page Sections Breakdown

### 1. 🦸 Hero / Introduction

| Element | Content |
|---|---|
| Label | `FULL-STACK DEVELOPER` |
| Name | `Frédérick Kranjec-Larose` |
| Tagline | `"I build systems that create impact."` |
| Intro paragraph | Background story: IT → Accounting → Finance → Full-Stack |
| CTA buttons | `View my work ↗` (→ `/portfolio`) and `Get in touch ↗` (→ `/contact`) |
| Availability badge | `● AVAILABLE FOR WORK` + `hello@fredkranjec.com` |
| AI Image | Profile photo — high-contrast dark-toned portrait (AI-generated) |

### 2. 🛠 Technical Skills

| Skill | Icon | Supporting Text |
|---|---|---|
| Full-Stack Development | `<FaCode />` | Building end-to-end web applications with React, Node.js, and REST APIs |
| Data & Databases | `<FaDatabase />` | Designing schemas and querying relational (PostgreSQL) and NoSQL databases |
| Cloud & DevOps | `<FaCloud />` | Deploying and automating workflows using GitHub Actions and cloud platforms |
| Programming Languages | `<FaLaptopCode />` | Proficient in JavaScript, Python, Java, C#, and more |
| AI & Automation | `<FaRobot />` | Integrating AI tools and building automation pipelines for real-world problems |

### 3. 🤝 Soft Skills & Talents

| Skill | Icon | Supporting Text |
|---|---|---|
| Team Collaboration | `<FaUsers />` | Thrived in cross-functional teams across finance desks and dev squads |
| Business Acumen | `<FaBriefcase />` | Bachelor's in accounting + 3 years in finance — I write code that makes business sense |
| Multilingual | `<FaGlobe />` | Fluent in French, English, and German — I can debug in three languages |
| Problem Solving | `<FaPuzzlePiece />` | Drawn to clean logic and elegant solutions — whether in code or on a bouldering wall |
| Adaptability | `<FaBolt />` | Transitioned from finance to tech — I learn fast and deliver under pressure |

---

## Step-by-Step Build Instructions

### Step 1 — Create the page file

```
src/
└── pages/
    └── Home.jsx
    └── home.css
```

### Step 2 — Register the route in `App.jsx`

```jsx
// Already configured from Layout feature — verify this route exists:
<Route path="/" element={<Home />} />
```

### Step 3 — Build `Home.jsx` structure

```jsx
// src/pages/Home.jsx
// AI-generated images used in this component:
// - heroImage: generated with Adobe Firefly — prompt: "professional developer dark minimal portrait"
// - skillsImage: generated with DALL·E — prompt: "abstract tech network dark background minimal"

import '../styles/home.css'
import heroImage from '../assets/hero-portrait.png'
import skillsImage from '../assets/skills-visual.png'
import { FaCode, FaDatabase, FaCloud, FaLaptopCode, FaRobot } from 'react-icons/fa'
import { FaUsers, FaBriefcase, FaGlobe, FaPuzzlePiece, FaBolt } from 'react-icons/fa'

const techSkills = [
  { icon: <FaCode />,        title: 'Full-Stack Development', text: 'Building end-to-end web applications with React, Node.js, and REST APIs.' },
  { icon: <FaDatabase />,    title: 'Data & Databases',       text: 'Designing schemas and querying PostgreSQL and NoSQL databases.' },
  { icon: <FaCloud />,       title: 'Cloud & DevOps',         text: 'Deploying and automating workflows using GitHub Actions and cloud platforms.' },
  { icon: <FaLaptopCode />,  title: 'Languages',              text: 'Proficient in JavaScript, Python, Java, C#, and more.' },
  { icon: <FaRobot />,       title: 'AI & Automation',        text: 'Integrating AI tools and building automation pipelines for real-world problems.' },
]

const softSkills = [
  { icon: <FaUsers />,       title: 'Team Collaboration', text: 'Thrived in cross-functional teams across finance desks and dev squads.' },
  { icon: <FaBriefcase />,   title: 'Business Acumen',    text: "Bachelor's in accounting + 3 years in finance — I write code that makes business sense." },
  { icon: <FaGlobe />,       title: 'Multilingual',       text: 'Fluent in French, English, and German — I can debug in three languages.' },
  { icon: <FaPuzzlePiece />, title: 'Problem Solving',    text: 'Drawn to clean logic and elegant solutions — in code and on the bouldering wall.' },
  { icon: <FaBolt />,        title: 'Adaptability',       text: 'Transitioned from finance to tech — I learn fast and deliver under pressure.' },
]

export default function Home() {
  return (
    <div className="home">

      {/* ── SECTION 1: HERO ── */}
      <section className="home__hero" id="hero">
        <div className="home__hero-content">
          <p className="home__label">FULL-STACK DEVELOPER</p>
          <h1 className="home__headline">I build systems<br />that create impact.</h1>
          <p className="home__intro">
            Full-stack developer with a background in accounting and finance.
            I transitioned from 3 years in the financial industry to building
            real applications — because I write code that makes business sense.
          </p>
          <div className="home__ctas">
            <a href="#/portfolio" className="btn btn--primary">View my work ↗</a>
            <a href="#/contact"   className="btn btn--ghost">Get in touch ↗</a>
          </div>
          <p className="home__availability">
            <span className="home__dot">●</span> AVAILABLE FOR WORK &nbsp;·&nbsp; hello@fredkranjec.com
          </p>
        </div>
        <div className="home__hero-image">
          <img src={heroImage} alt="Frédérick Kranjec-Larose — Full-Stack Developer portrait" />
        </div>
      </section>

      {/* ── SECTION 2: TECHNICAL SKILLS ── */}
      <section className="home__skills" id="skills">
        <p className="home__section-label">02. Technical Skills</p>
        <h2 className="home__section-title">What I build with</h2>
        <img
          src={skillsImage}
          alt="Abstract representation of a tech skill network"
          className="home__skills-visual"
        />
        <div className="home__skills-grid">
          {techSkills.map(({ icon, title, text }) => (
            <div className="skill-card" key={title}>
              <span className="skill-card__icon">{icon}</span>
              <h3 className="skill-card__title">{title}</h3>
              <p className="skill-card__text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: SOFT SKILLS ── */}
      <section className="home__soft" id="soft-skills">
        <p className="home__section-label">03. Soft Skills & Talents</p>
        <h2 className="home__section-title">What I bring to the team</h2>
        <div className="home__skills-grid">
          {softSkills.map(({ icon, title, text }) => (
            <div className="skill-card" key={title}>
              <span className="skill-card__icon">{icon}</span>
              <h3 className="skill-card__title">{title}</h3>
              <p className="skill-card__text">{text}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
```

### Step 4 — CSS for `home.css`

```css
/* ── HERO ── */
.home__hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - var(--header-height));
  padding: 4rem 6rem;
  gap: 2rem;
}
.home__label       { font-size: 0.75rem; letter-spacing: 0.15em; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 1rem; }
.home__headline    { font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 700; line-height: 1.1; margin-bottom: 1.5rem; }
.home__intro       { max-width: 480px; color: var(--color-text-muted); line-height: 1.7; margin-bottom: 2rem; }
.home__ctas        { display: flex; gap: 1rem; margin-bottom: 2rem; }
.home__availability{ font-size: 0.75rem; color: var(--color-text-muted); }
.home__dot         { color: #4caf50; }
.home__hero-image img { max-width: 420px; width: 100%; border-radius: 4px; filter: brightness(0.85); }

/* ── BUTTONS ── */
.btn               { padding: 0.75rem 1.5rem; font-size: 0.9rem; text-decoration: none; transition: opacity 0.2s; }
.btn--primary      { background: var(--color-text-primary); color: var(--color-bg); }
.btn--ghost        { border: 1px solid var(--color-text-primary); color: var(--color-text-primary); }
.btn:hover         { opacity: 0.8; }

/* ── SECTIONS ── */
.home__skills,
.home__soft {
  padding: 5rem 6rem;
  border-top: 1px solid var(--color-border);
}
.home__section-label { font-size: 0.75rem; letter-spacing: 0.15em; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 0.5rem; }
.home__section-title { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 2.5rem; }
.home__skills-visual { max-width: 100%; margin-bottom: 2.5rem; border-radius: 4px; opacity: 0.6; }

/* ── SKILL CARDS ── */
.home__skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
.skill-card        { background: var(--color-surface); border: 1px solid var(--color-border); padding: 1.5rem; border-radius: 4px; }
.skill-card__icon  { font-size: 1.5rem; color: var(--color-text-muted); display: block; margin-bottom: 0.75rem; }
.skill-card__title { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; }
.skill-card__text  { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .home__hero      { flex-direction: column; padding: 3rem 1.5rem; text-align: left; }
  .home__hero-image{ display: none; }   /* optional: hide or show below text */
  .home__skills,
  .home__soft      { padding: 3rem 1.5rem; }
  .home__ctas      { flex-wrap: wrap; }
}
```

### Step 5 — Generate AI Images

**Image 1 — Hero Portrait**
- Tool: [Adobe Firefly](https://firefly.adobe.com) or [DALL·E](https://openai.com/dall-e)
- Prompt:
  ```
  Professional male developer, side profile, high contrast,
  dark background, black and white, minimal, cinematic lighting
  ```
- Save as: `src/assets/hero-portrait.png`

**Image 2 — Skills Visual**
- Tool: [Midjourney](https://midjourney.com) or [DALL·E](https://openai.com/dall-e)
- Prompt:
  ```
  Abstract tech network, dark background, white glowing nodes
  and connections, minimal, clean, professional
  ```
- Save as: `src/assets/skills-visual.png`

---

## File Structure After Feature

```
src/
├── pages/
│   └── Home.jsx              ← Home page component
├── styles/
│   └── home.css              ← Home page styles
├── assets/
│   ├── hero-portrait.png     ← AI-generated (Image 1)
│   └── skills-visual.png     ← AI-generated (Image 2)
```

---

## Tech Constraints (Feature-Level)

- Use `react-icons` for all skill icons — already installed from Layout feature
- Use `clamp()` for responsive font sizes — no fixed px for headlines
- Images must be local assets in `src/assets/` — not external URLs
- AI tool used must be documented in a comment at the top of `Home.jsx`
- Do not use any external UI libraries — custom CSS only
- Buttons use `href="#/portfolio"` and `href="#/contact"` — `HashRouter` hash prefix required

---

## AI Image Documentation

```jsx
// AI-generated images used in this component:
// Image 1 — hero-portrait.png
//   Tool: Adobe Firefly (https://firefly.adobe.com)
//   Prompt: "Professional male developer, side profile, high contrast,
//            dark background, black and white, minimal, cinematic lighting"
//
// Image 2 — skills-visual.png
//   Tool: DALL·E (https://openai.com/dall-e)
//   Prompt: "Abstract tech network, dark background, white glowing nodes
//            and connections, minimal, clean, professional"
```

---

## Acceptance Criteria

- [ ] SR-1 through SR-15 are all implemented
- [ ] Home page loads at `/` as the default landing page
- [ ] Name `Frédérick Kranjec-Larose` is prominently displayed
- [ ] Role label `FULL-STACK DEVELOPER` and tagline are visible
- [ ] Introductory paragraph describes the student's background
- [ ] At least 5 technical skills shown, each with icon + supporting text
- [ ] At least 5 soft skills shown, each with icon + supporting text
- [ ] Both skill sections use a grid/card layout
- [ ] Page has 3+ visually separated sections (Hero, Technical, Soft)
- [ ] At least 2 AI-generated images are present with `alt` text
- [ ] AI tool used is documented in a comment in `Home.jsx`
- [ ] Page is fully responsive (desktop + mobile)
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors

---

## Notes for the AI

- Use `clamp()` for headline font sizes — ensures scaling without media queries
- The hero image is hidden on mobile via CSS — this is intentional to save space
- Availability badge uses a green dot `●` — color `#4caf50`
- All CTA links use `href="#/portfolio"` format because `HashRouter` is used — not `<Link>`
- Document AI tool name and prompt directly in the JSX file as a comment — not in a separate file
- Section labels follow the numbered convention from the design system: `01.` `02.` `03.`