# 🤖 AI_FEATURE — Links Page

---

## Feature Identity

- **Feature Name:** Links Page — External Links & Resources
- **Related Area:** Pages / Content
- **Priority:** 🟡 Medium — secondary page for sharing curated external links
- **Route:** `/links`

---

## Feature Goal

Build a Links page that presents a curated collection of external links relevant to Frédérick's work, profile, and resources — displayed as structured cards with image, title, description, and a clickable URL opening in a new tab.

---

## Feature Scope

### In Scope (Included)

- At least 3 link cards, each with image, title, description, and clickable URL
- At least 1 AI-generated image on the page with proper `alt` text
- Visual card layout (grid or list)
- Links open in a new tab (`target="_blank"`)
- Responsive layout across desktop and mobile

### Out of Scope (Excluded)

- Back office link management (handled in `back-office.feature.md`)
- Contact form (handled in `contact.feature.md`)

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — Links page is accessible at `/links`
- **SR-2** — At least 3 links are displayed on the page
- **SR-3** — Each link card includes an image (thumbnail or preview)
- **SR-4** — Each link card includes a title or name
- **SR-5** — Each link card includes a short description (1–3 sentences)
- **SR-6** — Each link card includes a clickable URL that opens in a new tab
- **SR-7** — At least 1 image on the page is AI-generated
- **SR-8** — All images have appropriate `alt` text
- **SR-9** — AI tool(s) used are documented in a comment in the component file
- **SR-10** — Page is fully responsive on desktop and mobile

---

## Page Links Content

| Image | Title | Description | URL |
|---|---|---|---|
| `link-github.png` | GitHub Profile | Explore my repositories, open-source contributions, and project source code. | `https://github.com/Kranjec023` |
| `link-linkedin.png` | LinkedIn | My professional profile — work history, recommendations, and network. | `https://linkedin.com/in/frédérick-kranjec-larose-052835110` |
| `link-codeboxx.png` | CodeBoxx Technology | The bootcamp where I trained as a full-stack developer — MERN stack, DevOps, and more. | `https://codeboxx.biz` |
| `link-resume.png` *(AI-generated)* | Resume / CV | Download or view my full resume as a PDF — education, experience, and skills. | `/assets/resume/frederick-kranjec-larose-resume.pdf` |
| `link-portfolio.png` | Portfolio Page | A deep dive into my projects, work history, and academic background. | `#/portfolio` |

---

## Step-by-Step Build Instructions

### Step 1 — Create the page files

```
src/
└── pages/
    └── Links.jsx
└── styles/
    └── links.css
└── assets/
    ├── link-github.png
    ├── link-linkedin.png
    ├── link-codeboxx.png
    ├── link-resume.png       ← AI-generated (Image 1)
    └── link-portfolio.png
```

### Step 2 — Register the route in `App.jsx`

```jsx
<Route path="/links" element={<Links />} />
```

### Step 3 — Build `Links.jsx`

```jsx
// src/pages/Links.jsx

// AI-generated images used in this component:
//
// Image 1 — link-resume.png
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Minimalist dark document icon, glowing white paper on black
//            background, clean, professional, no text, soft light"

import '../styles/links.css'

import githubImg    from '../assets/link-github.png'
import linkedinImg  from '../assets/link-linkedin.png'
import codeboxxImg  from '../assets/link-codeboxx.png'
import resumeImg    from '../assets/link-resume.png'
import portfolioImg from '../assets/link-portfolio.png'

const links = [
  {
    image:       githubImg,
    alt:         'GitHub logo on dark background',
    title:       'GitHub Profile',
    description: 'Explore my repositories, open-source contributions, and project source code. All my major projects are publicly available.',
    url:         'https://github.com/fredkranjec',
    external:    true,
  },
  {
    image:       linkedinImg,
    alt:         'LinkedIn logo on dark background',
    title:       'LinkedIn',
    description: 'My professional profile — full work history, certifications, and recommendations from colleagues and managers.',
    url:         'https://linkedin.com/in/frédérickkranjec-larose-052835110',
    external:    true,
  },
  {
    image:       codeboxxImg,
    alt:         'CodeBoxx Technology logo on dark background',
    title:       'CodeBoxx Technology',
    description: 'The bootcamp where I trained as a full-stack developer. Covers the MERN stack, DevOps, CI/CD, cloud deployment, and more.',
    url:         'https://codeboxx.biz',
    external:    true,
  },
  {
    image:       resumeImg,
    alt:         'Minimalist document icon representing a resume — AI-generated',
    title:       'Resume / CV',
    description: 'Download or view my full resume as a PDF. Includes education, professional experience, technical skills, and certifications.',
    url:         '/assets/resume/frederick-kranjec-larose-resume.pdf',
    external:    true,
  },
  {
    image:       portfolioImg,
    alt:         'Preview of the portfolio page',
    title:       'Portfolio Page',
    description: 'A deep dive into my projects, work history, and academic background — all in one place.',
    url:         '#/portfolio',
    external:    false,
  },
]

export default function Links() {
  return (
    <div className="links">

      {/* ── HERO ── */}
      <section className="links__hero">
        <p className="links__label">LINKS</p>
        <h1 className="links__headline">Everything<br />in one place.</h1>
        <p className="links__sub">
          A curated list of my profiles, resources, and projects —
          all accessible from one page.
        </p>
      </section>

      {/* ── LINKS GRID ── */}
      <section className="links__section">
        <div className="links__grid">
          {links.map(({ image, alt, title, description, url, external }) => (
            <a
              key={title}
              href={url}
              target={external ? '_blank' : '_self'}
              rel={external ? 'noopener noreferrer' : undefined}
              className="link-card"
            >
              <div className="link-card__image-wrap">
                <img src={image} alt={alt} className="link-card__image" />
              </div>
              <div className="link-card__body">
                <h3 className="link-card__title">{title} ↗</h3>
                <p className="link-card__desc">{description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
```

### Step 4 — Build `links.css`

```css
/* src/styles/links.css */

/* ── HERO ── */
.links__hero {
  padding: 5rem 6rem 3rem;
  border-bottom: 1px solid var(--color-border);
}

.links__label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.links__headline {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.links__sub {
  max-width: 480px;
  color: var(--color-text-muted);
  line-height: 1.7;
}

/* ── SECTION ── */
.links__section {
  padding: 4rem 6rem;
}

/* ── GRID ── */
.links__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* ── LINK CARD ── */
.link-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, transform 0.2s;
}

.link-card:hover {
  border-color: var(--color-text-primary);
  transform: translateY(-2px);
}

.link-card__image-wrap {
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.link-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.link-card:hover .link-card__image {
  opacity: 1;
}

.link-card__body {
  padding: 1.25rem 1.5rem 1.5rem;
}

.link-card__title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.link-card__desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .links__hero    { padding: 3rem 1.5rem 2rem; }
  .links__section { padding: 2rem 1.5rem; }
  .links__grid    { grid-template-columns: 1fr; }
}
```

### Step 5 — Generate AI Image

**Image 1 — link-resume.png**
- Tool: [Midjourney](https://midjourney.com)
- Prompt:
  ```
  Minimalist dark document icon, glowing white paper on black
  background, clean, professional, no text, soft light, square format
  ```
- Save as: `src/assets/link-resume.png`

---

## File Structure After Feature

```
src/
├── pages/
│   └── Links.jsx
├── styles/
│   └── links.css
├── assets/
│   ├── link-github.png
│   ├── link-linkedin.png
│   ├── link-codeboxx.png
│   ├── link-resume.png       ← AI-generated (Image 1)
│   └── link-portfolio.png
```

---

## AI Image Documentation

```jsx
// AI-generated images used in this component:
//
// Image 1 — link-resume.png
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Minimalist dark document icon, glowing white paper on black
//            background, clean, professional, no text, soft light, square format"
```

---

## Acceptance Criteria

- [ ] SR-1 through SR-10 are all implemented
- [ ] Links page loads at `/links`
- [ ] At least 5 link cards are displayed
- [ ] Each card has an image, title, description, and clickable URL
- [ ] All links open in a new tab (`target="_blank"`)
- [ ] At least 1 AI-generated image is present with `alt` text
- [ ] AI tool is documented in a comment in `Links.jsx`
- [ ] Page is fully responsive (desktop + mobile)
- [ ] Hover state is visible on cards
- [ ] `npm run dev` runs without errors
- [ ] `npm run build` completes without errors

---

## Notes for the AI

- The entire card is wrapped in an `<a>` tag — no nested buttons
- Use `rel="noopener noreferrer"` on all external links for security
- Section label follows the numbered convention from the design system
- `link-resume.png` is the AI-generated image — document it in `Links.jsx`
- Card hover lifts slightly with `translateY(-2px)` — consistent with design system feel
- For thumbnails without a screenshot, use logo images saved locally in `src/assets/`