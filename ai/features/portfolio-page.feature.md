# 🤖 AI_FEATURE — Portfolio Page

---

## Feature Identity

- **Feature Name:** Portfolio Page — Education, Work Experience & Projects
- **Related Area:** Pages / Content
- **Priority:** 🔴 High — primary page for recruiters evaluating the candidate
- **Route:** `/portfolio`

---

## Feature Goal

Build the Portfolio page as a comprehensive resume/CV page presenting Frédérick Kranjec-Larose's education, work experience, and projects — with a downloadable PDF resume, AI-generated imagery, and a consistent dark minimal design system.

---

## Feature Scope

### In Scope (Included)

- Education section — institutions, degrees, dates (reverse chronological)
- Work Experience section — roles, organizations, dates, descriptions (reverse chronological)
- Projects section — project cards with name, tech stack, description, and image
- Downloadable PDF resume button
- At least 2 AI-generated images with proper `alt` text
- Visual section separation (spacing, backgrounds, or dividers)
- Responsive layout across desktop and mobile

### Out of Scope (Excluded)

- Contact form (handled in `contact.feature.md`)
- Back office (handled in `back-office.feature.md`)
- Animations beyond simple CSS transitions

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — Portfolio page is accessible at `/portfolio`
- **SR-2** — Education section lists at least one institution in reverse chronological order
- **SR-3** — Each education entry includes: institution name, degree/program, and dates
- **SR-4** — Work experience section lists at least one role in reverse chronological order
- **SR-5** — Each work entry includes: title/role, organization, dates, and description
- **SR-6** — Work descriptions mention responsibilities or achievements
- **SR-7** — Projects section lists at least one project
- **SR-8** — Each project entry includes: name, tech stack, description, and image
- **SR-9** — Project descriptions explain what the project is about and its purpose
- **SR-10** — A downloadable PDF resume button is present and functional
- **SR-11** — Page has at least 3 distinct, visually separated sections
- **SR-12** — At least 2 images on the page are AI-generated
- **SR-13** — All images have appropriate `alt` text
- **SR-14** — AI tool(s) used are documented in a comment in the component file
- **SR-15** — Page is fully responsive on desktop and mobile

---

## Page Sections Breakdown

### 1. 🎓 Education

| Field | Content |
|---|---|
| Institution | Collège Boréal |
| Degree | Techniques de l'informatique — Développement de logiciels |
| Dates | 2022 — 2025 |
| --- | --- |
| Institution | Université Laurentienne |
| Degree | Baccalauréat en Commerce — Comptabilité |
| Dates | 2015 — 2019 |

### 2. 💼 Work Experience

| Field | Content |
|---|---|
| Title | Full-Stack Developer — Internship |
| Organization | CodeBoxx Technology |
| Dates | 2024 — Present |
| Description | Built and deployed full-stack web applications using React, Node.js, and Supabase. Contributed to CI/CD pipelines with GitHub Actions. |
| --- | --- |
| Title | Financial Analyst |
| Organization | Laurentian Bank of Canada |
| Dates | 2019 — 2022 |
| Description | Analyzed financial data, prepared reports, and automated workflows using Excel and Python scripts. Supported decision-making for portfolio management. |

### 3. 🗂 Projects

| Field | Content |
|---|---|
| Name | AI Therapist Platform |
| Tech | React, Node.js, OpenAI API, PostgreSQL |
| Description | AI-powered platform providing personalized therapy through intelligent conversations. Built to help users reflect and improve mental well-being using large language model integrations. |
| Image | `project-ai-therapist.png` |
| --- | --- |
| Name | Market-Making System |
| Tech | Python, Alpaca API, PostgreSQL, React |
| Description | High-frequency market-making system with real-time analytics dashboard. Executes automated buy/sell orders based on configurable spread strategies. |
| Image | `project-market-making.png` |
| --- | --- |
| Name | Instagram Automation |
| Tech | Python, Instagram Graph API, Supabase |
| Description | Automation engine for content scheduling and engagement. Manages posting queues, hashtag strategies, and tracks engagement metrics through a dashboard. |
| Image | `project-instagram.png` |
| --- | --- |
| Name | Personal Portfolio Website |
| Tech | React, Vite, Supabase, GitHub Pages |
| Description | This portfolio — a dark minimal typographic website built to present Frédérick as a hireable full-stack developer with a private back office for managing contact submissions. |
| Image | `project-portfolio.png` |

---

## Step-by-Step Build Instructions

### Step 1 — Create the page files

```
src/
└── pages/
    └── Portfolio.jsx
└── styles/
    └── portfolio.css
└── assets/
    ├── resume/
    │   └── frederick-kranjec-larose-resume.pdf
    ├── portfolio-banner.png        ← AI-generated (Image 1)
    ├── project-ai-therapist.png
    ├── project-market-making.png
    ├── project-instagram.png
    └── project-portfolio.png
```

### Step 2 — Register the route in `App.jsx`

```jsx
// Already configured from Layout feature — verify this route exists:
<Route path="/portfolio" element={<Portfolio />} />
```

### Step 3 — Build `Portfolio.jsx`

```jsx
// src/pages/Portfolio.jsx

// AI-generated images used in this component:
//
// Image 1 — portfolio-banner.png
//   Tool: Adobe Firefly (https://firefly.adobe.com)
//   Prompt: "Minimalist dark abstract banner, glowing geometric shapes,
//            professional, clean, black background, white accents"
//
// Image 2 — projects-visual.png
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Abstract code and data visualization, dark background,
//            glowing lines and nodes, minimal, professional, cinematic"

import '../styles/portfolio.css'
import bannerImage   from '../assets/portfolio-banner.png'
import projectsImage from '../assets/projects-visual.png'
import resumePDF     from '../assets/resume/frederick-kranjec-larose-resume.pdf'

import aiTherapistImg  from '../assets/project-ai-therapist.png'
import marketMakingImg from '../assets/project-market-making.png'
import instagramImg    from '../assets/project-instagram.png'
import portfolioImg    from '../assets/project-portfolio.png'

const education = [
  {
    institution: 'Collège Boréal',
    degree:      'Techniques de l\'informatique — Développement de logiciels',
    dates:       '2022 — 2025',
  },
  {
    institution: 'Université Laurentienne',
    degree:      'Baccalauréat en Commerce — Comptabilité',
    dates:       '2015 — 2019',
  },
]

const work = [
  {
    title:        'Full-Stack Developer — Internship',
    organization: 'CodeBoxx Technology',
    dates:        '2024 — Present',
    description:  'Built and deployed full-stack web applications using React, Node.js, and Supabase. Contributed to CI/CD pipelines with GitHub Actions and collaborated in an agile development environment.',
  },
  {
    title:        'Financial Analyst',
    organization: 'Laurentian Bank of Canada',
    dates:        '2019 — 2022',
    description:  'Analyzed financial data and prepared executive-level reports. Automated repetitive workflows using Excel and Python scripts, reducing reporting time by 40%. Supported portfolio management decisions.',
  },
]

const projects = [
  {
    name:        'AI Therapist Platform',
    tech:        ['React', 'Node.js', 'OpenAI API', 'PostgreSQL'],
    description: 'AI-powered platform providing personalized therapy through intelligent conversations. Built to help users reflect and improve mental well-being using large language model integrations.',
    image:       aiTherapistImg,
    alt:         'Screenshot of AI Therapist Platform dashboard',
  },
  {
    name:        'Market-Making System',
    tech:        ['Python', 'Alpaca API', 'PostgreSQL', 'React'],
    description: 'High-frequency market-making system with real-time analytics dashboard. Executes automated buy/sell orders based on configurable spread strategies.',
    image:       marketMakingImg,
    alt:         'Screenshot of Market-Making System analytics dashboard',
  },
  {
    name:        'Instagram Automation',
    tech:        ['Python', 'Instagram Graph API', 'Supabase'],
    description: 'Automation engine for content scheduling and engagement. Manages posting queues, hashtag strategies, and tracks engagement metrics through a dashboard.',
    image:       instagramImg,
    alt:         'Screenshot of Instagram Automation dashboard',
  },
  {
    name:        'Personal Portfolio Website',
    tech:        ['React', 'Vite', 'Supabase', 'GitHub Pages'],
    description: 'This portfolio — a dark minimal typographic website presenting Frédérick as a hireable full-stack developer, with a private back office for managing contact form submissions.',
    image:       portfolioImg,
    alt:         'Screenshot of Personal Portfolio Website',
  },
]

export default function Portfolio() {
  return (
    <div className="portfolio">

      {/* ── HERO BANNER ── */}
      <section className="portfolio__hero">
        <div className="portfolio__hero-content">
          <p className="portfolio__label">01. Portfolio</p>
          <h1 className="portfolio__headline">Experience &<br />Projects</h1>
          <p className="portfolio__sub">
            A record of my academic background, professional experience,
            and the projects I've built along the way.
          </p>
          <a href={resumePDF} download className="btn btn--primary">
            Download Resume ↗
          </a>
        </div>
        <div className="portfolio__hero-image">
          <img src={bannerImage} alt="Abstract geometric banner representing professional experience" />
        </div>
      </section>

      {/* ── SECTION 1: EDUCATION ── */}
      <section className="portfolio__section" id="education">
        <p className="portfolio__section-label">02. Education</p>
        <h2 className="portfolio__section-title">Academic Background</h2>
        <div className="portfolio__timeline">
          {education.map(({ institution, degree, dates }) => (
            <div className="timeline-entry" key={institution}>
              <div className="timeline-entry__dates">{dates}</div>
              <div className="timeline-entry__content">
                <h3 className="timeline-entry__title">{institution}</h3>
                <p className="timeline-entry__sub">{degree}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: WORK EXPERIENCE ── */}
      <section className="portfolio__section" id="work">
        <p className="portfolio__section-label">03. Work Experience</p>
        <h2 className="portfolio__section-title">Professional History</h2>
        <div className="portfolio__timeline">
          {work.map(({ title, organization, dates, description }) => (
            <div className="timeline-entry" key={title}>
              <div className="timeline-entry__dates">{dates}</div>
              <div className="timeline-entry__content">
                <h3 className="timeline-entry__title">{title}</h3>
                <p className="timeline-entry__sub">{organization}</p>
                <p className="timeline-entry__desc">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: PROJECTS ── */}
      <section className="portfolio__section" id="projects">
        <p className="portfolio__section-label">04. Projects</p>
        <h2 className="portfolio__section-title">What I've built</h2>
        <img
          src={projectsImage}
          alt="Abstract visualization representing software projects and code"
          className="portfolio__projects-visual"
        />
        <div className="portfolio__projects-grid">
          {projects.map(({ name, tech, description, image, alt }, i) => (
            <div className="project-card" key={name}>
              <div className="project-card__number">0{i + 1}</div>
              <img src={image} alt={alt} className="project-card__image" />
              <div className="project-card__body">
                <h3 className="project-card__title">{name}</h3>
                <div className="project-card__tech">
                  {tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <p className="project-card__desc">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
```

### Step 4 — Build `portfolio.css`

```css
/* src/styles/portfolio.css */

/* ── HERO ── */
.portfolio__hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5rem 6rem;
  gap: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.portfolio__label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.portfolio__headline {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.portfolio__sub {
  max-width: 420px;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.portfolio__hero-image img {
  max-width: 380px;
  width: 100%;
  border-radius: 4px;
  opacity: 0.75;
}

/* ── SECTIONS ── */
.portfolio__section {
  padding: 5rem 6rem;
  border-top: 1px solid var(--color-border);
}

.portfolio__section-label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.portfolio__section-title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 3rem;
}

/* ── TIMELINE ── */
.portfolio__timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-entry {
  display: flex;
  gap: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.timeline-entry:last-child {
  border-bottom: none;
}

.timeline-entry__dates {
  flex-shrink: 0;
  width: 140px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  padding-top: 0.25rem;
}

.timeline-entry__title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.timeline-entry__sub {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.timeline-entry__desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 620px;
}

/* ── PROJECTS VISUAL ── */
.portfolio__projects-visual {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
  opacity: 0.5;
  margin-bottom: 3rem;
}

/* ── PROJECT CARDS ── */
.portfolio__projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.project-card__number {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 0.1em;
}

.project-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  opacity: 0.85;
}

.project-card__body {
  padding: 1.5rem;
}

.project-card__title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.tech-tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-card__desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .portfolio__hero {
    flex-direction: column;
    padding: 3rem 1.5rem;
  }

  .portfolio__hero-image { display: none; }

  .portfolio__section { padding: 3rem 1.5rem; }

  .timeline-entry {
    flex-direction: column;
    gap: 0.5rem;
  }

  .timeline-entry__dates { width: auto; }

  .portfolio__projects-grid {
    grid-template-columns: 1fr;
  }
}
```

### Step 5 — Generate AI Images

**Image 1 — Portfolio Banner**
- Tool: [Adobe Firefly](https://firefly.adobe.com)
- Prompt:
  ```
  Minimalist dark abstract banner, glowing geometric shapes,
  professional, clean, black background, white accents, wide format
  ```
- Save as: `src/assets/portfolio-banner.png`

**Image 2 — Projects Visual**
- Tool: [Midjourney](https://midjourney.com)
- Prompt:
  ```
  Abstract code and data visualization, dark background,
  glowing lines and nodes, minimal, professional, cinematic, wide
  ```
- Save as: `src/assets/projects-visual.png`

### Step 6 — Add Resume PDF

1. Export your resume as a PDF
2. Name it: `frederick-kranjec-larose-resume.pdf`
3. Place it at: `src/assets/resume/frederick-kranjec-larose-resume.pdf`

> The `download` attribute on the `<a>` tag will trigger a browser download automatically.

---

## File Structure After Feature

```
src/
├── pages/
│   └── Portfolio.jsx
├── styles/
│   └── portfolio.css
├── assets/
│   ├── portfolio-banner.png        ← AI-generated (Image 1)
│   ├── projects-visual.png         ← AI-generated (Image 2)
│   ├── project-ai-therapist.png
│   ├── project-market-making.png
│   ├── project-instagram.png
│   ├── project-portfolio.png
│   └── resume/
│       └── frederick-kranjec-larose-resume.pdf
```

---

## Tech Constraints (Feature-Level)

- Use `react-icons` for any icons needed
- Use `clamp()` for responsive font sizes
- Images must be local assets in `src/assets/` — not external URLs
- AI tools used must be documented in a comment at the top of `Portfolio.jsx`
- Resume PDF must use `download` attribute on the anchor tag
- Do not use any external UI libraries — custom CSS only
- Buttons use `href="#/contact"` format — `HashRouter` hash prefix required

---

## AI Image Documentation

```jsx
// AI-generated images used in this component:
//
// Image 1 — portfolio-banner.png
//   Tool: Adobe Firefly (https://firefly.adobe.com)
//   Prompt: "Minimalist dark abstract banner, glowing geometric shapes,
//            professional, clean, black background, white accents, wide format"
//
// Image 2 — projects-visual.png
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Abstract code and data visualization, dark background,
//            glowing lines and nodes, minimal, professional, cinematic, wide"
```

---

## Acceptance Criteria

- [ ] SR-1 through SR-15 are all implemented
- [ ] Portfolio page loads at `/portfolio`
- [ ] Education section lists at least 2 entries in reverse chronological order
- [ ] Each education entry shows institution, degree/program, and dates
- [ ] Work experience section lists at least 2 entries in reverse chronological order
- [ ] Each work entry shows title, organization, dates, and description
- [ ] Work descriptions mention responsibilities or achievements
- [ ] Projects section lists at least 4 projects
- [ ] Each project card shows name, tech tags, description, and image
- [ ] Resume PDF downloads correctly via the `Download Resume ↗` button
- [ ] Page has 3+ visually separated sections (Education, Work, Projects)
- [ ] At least 2 AI-generated images are present with `alt` text
- [ ] AI tools used are documented in a comment in `Portfolio.jsx`
- [ ] Page is fully responsive (desktop + mobile)
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors

---

## Notes for the AI

- Timeline entries use a two-column layout (dates left, content right) — collapses to single column on mobile
- Project cards use `object-fit: cover` on images to maintain consistent card heights
- The `download` attribute on `<a href={resumePDF} download>` triggers a file download — no JS needed
- Section labels follow the numbered convention: `01.` `02.` `03.` `04.`
- All CTA links use `href="#/contact"` format because `HashRouter` is used
- AI tool name and prompt must be documented directly in `Portfolio.jsx` as a comment