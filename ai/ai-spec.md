# 🤖 AI_SPEC — Project Specification (Main)

## Project Identity

- **Project Name:** Frédérick Kranjec-Larose — Personal Portfolio Website
- **Short Description:**
  A dark, minimal, typographic personal portfolio website inspired by a clean black-and-white design system. Built to present Frédérick Kranjec-Larose as a hireable full-stack developer with a business background — with a secret back office to manage contact form submissions. Hosted on GitHub Pages.
- **Project Type:** Static Frontend Website + Lightweight Back Office (GitHub Pages)
- **Branding Initials:** `FK`
- **Live URL:** `https://your-username.github.io` *(update once deployed)*

---

## Goal and Scope

### Goal

Design and deploy a clean, minimal, dark-themed portfolio website modeled after the provided design reference — professional, typographic, and recruiter-ready — with a private back office to manage contact form submissions.

### In Scope (Build Now)

- **Home** — Hero with tagline, profile photo, availability badge, selected work preview, about summary
- **About** — Full background story, stats, technical skills, soft skills
- **Projects** — Full project cards with descriptions, images, tech tags, GitHub links + Resume PDF download
- **Links** — Curated useful resources with descriptions
- **Contact** — Contact form with name, email, message
- **Back Office Login** — Secret, password-protected entry point
- **Back Office Dashboard** — Table to manage contact form submissions
- Responsive design (mobile + desktop)
- Deployment to GitHub Pages

### Out of Scope (Do NOT Build)

- Real-time notifications
- CMS or blog engine
- Payment or subscription systems
- Mobile native app
- Full cloud backend / database
- Paid hosting or custom domain *(optional upgrade later)*

---

## Design System (Based on Template)

### Color Palette
```css
:root {
  --color-bg: #0a0a0a;           /* Near black background */
  --color-surface: #111111;      /* Card / section surfaces */
  --color-border: #222222;       /* Subtle borders */
  --color-text-primary: #ffffff; /* Main text */
  --color-text-muted: #888888;   /* Labels, captions */
  --color-accent: #ffffff;       /* CTA buttons, highlights */
  --font-main: 'Inter', sans-serif;
}
```

### Typography
| Element | Style |
|---|---|
| Logo / Initials | Bold, large — `FK` |
| Hero headline | Large, bold, left-aligned — 2–3 lines max |
| Section labels | Small caps, muted, numbered — `01. Home` |
| Body text | Regular weight, muted color |
| CTA Buttons | Outlined white with arrow icon `↗` |

### Layout Principles
- **Dark background** — `#0a0a0a` base
- **Numbered sections** — `01.` `02.` `03.` `04.`
- **Left-aligned typography** — no centered text except footer CTA
- **Minimal UI** — no decorative elements, let content speak
- **Arrow CTAs** — all links/buttons use `↗` icon
- **Availability badge** — `● AVAILABLE FOR WORK` top right of hero

---

## Pages Map

| Page | Route | Description |
|---|---|---|
| Home | `/index.html` | Hero, selected work preview, about summary, footer |
| About | `/about.html` | Full story, stats, skills |
| Projects | `/projects.html` | All project cards + resume download |
| Links | `/links.html` | Curated resources with descriptions |
| Contact | `/contact.html` | Contact form |
| Back Office Login | `/admin/login.html` | Secret login — not linked publicly |
| Back Office Dashboard | `/admin/dashboard.html` | Table of contact submissions |

---

## Section Breakdown

### 🏠 Home (`index.html`)

**Navbar**
- Top left: `FK` logo/initials
- Top center: `01. Home` `02. About` `03. Projects` `04. Contact`
- Top right: `Let's talk ↗` CTA button

**Hero**
- Label: `FULL-STACK DEVELOPER`
- Headline: Large bold tagline (e.g. *"I build systems that create impact."*)
- Subtext: One-liner description
- CTA buttons: `View my work ↗` and `Get in touch ↗`
- Right side: Profile photo (high contrast, dark tone)
- Bottom right: `● AVAILABLE FOR WORK` + `hello@fredkranjec.com`
- Bottom left: `SCROLL` with vertical line indicator

**Selected Work** *(preview — 4 cards)*
- Section label: `02. Selected work`
- Right CTA: `View all projects ↗`
- Cards: numbered `01` `02` `03` `04`, project screenshot, title, short description, `↗`

**About Me** *(summary)*
- Section label: `03. About me`
- Short paragraph
- Stats row: `5+ Years coding` | `15+ Projects built` | `3+ Years full-stack` | `∞ Passion`
- CTA: `More about me ↗`

**Footer**
- Left: `FK` + tagline + copyright
- Center: Navigation links (numbered)
- Right: Connect — GitHub, LinkedIn, Email
- Far right: `LET'S BUILD SOMETHING` CTA block

---

### 👤 About (`about.html`)
- Full background story (IT → Accounting → Finance → Full-Stack)
- Languages: French, English, German
- Technical Skills grid with icons
- Soft Skills list

### 💼 Projects (`projects.html`)
- All project cards (image, title, description, tech tags, GitHub link)
- Resume download button → `assets/resume/frederick-kranjec-larose-resume.pdf`

### 🔗 Links (`links.html`)
- Curated resources: title, description, URL with `↗`

### 📬 Contact (`contact.html`)
- Fields: Name, Email, Message, Submit `↗`
- Stores submissions to localStorage
- Success/error feedback on submit

### 🔐 Back Office Login (`admin/login.html`)
- Simple username + password form
- Not linked from any public page
- Redirects to dashboard on success

### 📋 Back Office Dashboard (`admin/dashboard.html`)
- Table: `#` | `Name` | `Email` | `Message` | `Date` | `Actions`
- Actions: Mark as read, Delete
- Redirects to login if not authenticated

---

## Project File Structure

```
portfolio/
├── index.html                        ← Home
├── about.html                        ← About
├── projects.html                     ← Projects + Resume
├── links.html                        ← Useful Links
├── contact.html                      ← Contact Form
├── admin/
│   ├── login.html                    ← Back Office Login
│   └── dashboard.html                ← Back Office Table
├── css/
│   ├── style.css                     ← Global styles + design system
│   ├── home.css                      ← Home-specific styles
│   ├── projects.css                  ← Project cards
│   └── admin.css                     ← Back office styles
├── js/
│   ├── main.js                       ← Global nav, scroll behavior
│   ├── contact.js                    ← Form handling + localStorage
│   ├── admin-login.js                ← Auth logic
│   └── admin-dashboard.js            ← Table rendering + actions
├── assets/
│   ├── img/
│   │   ├── profile.jpg               ← Profile photo (high contrast)
│   │   └── projects/                 ← Project screenshots
│   └── resume/
│       └── frederick-kranjec-larose-resume.pdf
├── favicon.ico
└── README.md
```

---

## Tech Stack and Tools

### Frontend
| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Dark design system, responsive layout |
| JavaScript (Vanilla) | Interactions, form handling, back office |
| Google Fonts — Inter | Primary typeface |
| Font Awesome / Devicons | Skill icons and UI arrows |

### Data Storage
| Option | Purpose |
|---|---|
| `localStorage` | Store contact form submissions |

### Hosting & Deployment
| Tool | Purpose |
|---|---|
| GitHub Pages | Free static site hosting |
| Git + GitHub | Version control and deployment |

---

## Constraints

| Constraint | Detail |
|---|---|
| 🆓 No paid services | GitHub Pages only |
| 🎨 Design language | Dark, minimal, typographic — follow template strictly |
| 📱 Responsive | Mobile-first, tested 320px–1440px |
| ⚡ Performance | Lighthouse 90+ |
| 📦 No frameworks | No React, no Bootstrap |
| 🔒 Back office | Not linked publicly |
| 🔒 No sensitive data | No credentials in repo |

---

## Rules for the AI

- Follow the dark minimal design system — do not deviate without instruction
- Use numbered section labels (`01.` `02.`) consistently across all pages
- All CTAs use arrow icon `↗`
- Only use confirmed personal details — never invent content
- Semantic HTML only — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- CSS variables for all colors and fonts — no hardcoded values
- Back office pages must not appear in public navigation or footer
- Commit after each page is complete

---

## Coding Standards & Conventions

### File Naming
```
kebab-case only               → index.html, style.css, admin-login.js
descriptive asset names       → project-codebloggs.png, frederick-resume.pdf
```

### CSS Conventions
- Mobile-first media queries
- No `!important`
- Grouped by: reset → variables → layout → components → utilities

### Git Commit Conventions
```
Types: init | feat | style | fix | deploy | docs

Examples:
  init: scaffold project structure and design system
  feat: add home hero and selected work sections
  feat: add projects page with cards and resume download
  feat: add back office login and dashboard
  style: refine dark theme and typography
  deploy: publish to GitHub Pages
```

---

## Definition of Done

- [ ] Design matches dark minimal template reference
- [ ] `FK` branding consistent across all pages
- [ ] Numbered nav (`01.` `02.` `03.` `04.`) on all pages
- [ ] **Home** — Hero, Selected Work, About summary, Footer complete
- [ ] **About** — Full story, stats, skills complete
- [ ] **Projects** — All cards complete + resume downloadable
- [ ] **Links** — All resources listed with descriptions
- [ ] **Contact** — Form submits and stores correctly, feedback shown
- [ ] **Back Office Login** — Auth and redirect working
- [ ] **Back Office Dashboard** — Table renders all submissions with actions
- [ ] Fully responsive (320px–1440px)
- [ ] Lighthouse 90+ on Performance, Accessibility, SEO
- [ ] No broken images, no missing `alt` attributes
- [ ] No console errors
- [ ] Back office not linked from public navigation
- [ ] Live at `https://your-username.github.io`
- [ ] README updated with live URL