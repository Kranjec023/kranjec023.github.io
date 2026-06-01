// AI-generated images used in this component:
//
// Image 1 — link-resume.png
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Minimalist dark document icon, glowing white paper on black
//            background, clean, professional, no text, soft light, square format"
//
// Image 2 — network.png (used as Portfolio Page thumbnail)
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Abstract human connection network, dark background, white silhouettes
//            of people connected by glowing lines, minimal, professional, cinematic"

import '../styles/links.css'

import githubImg       from '../assets/link-github.png'
import linkedinImg     from '../assets/link-linkedin.png'
import codeboxxImg     from '../assets/link-codeboxx.png'
import resumeImg       from '../assets/link-resume.png'
import resumePDF       from '../assets/resume/frederick-kranjec-larose-resume.pdf'
import portfolioImg    from '../assets/network.png'
import freecodecampImg from '../assets/link-freecodecamp.png'
import ztmImg          from '../assets/link-ztm.png'

import { useLanguageContext } from '../context/LanguageContext'

const links = [
  {
    image:    githubImg,
    alt:      'GitHub logo on dark background',
    title:    'GitHub Profile',
    description: 'Explore my repositories, open-source contributions, and project source code. All my major projects are publicly available.',
    url:      'https://github.com/Kranjec023',
    external: true,
  },
  {
    image:    linkedinImg,
    alt:      'LinkedIn logo on dark background',
    title:    'LinkedIn',
    description: 'My professional profile — full work history, certifications, and recommendations from colleagues and managers.',
    url:      'https://linkedin.com/in/frédérick-kranjec-larose-052835110',
    external: true,
  },
  {
    image:    codeboxxImg,
    alt:      'CodeBoxx Technology logo on dark background',
    title:    'CodeBoxx Technology',
    description: 'The bootcamp where I trained as a full-stack developer. Covers the MERN stack, DevOps, CI/CD, cloud deployment, and more.',
    url:      'https://codeboxx.biz',
    external: true,
  },
  {
    image:    resumeImg,
    alt:      'Minimalist document icon representing a resume — AI-generated with Midjourney',
    title:    'Resume / CV',
    description: 'Download or view my full resume as a PDF. Includes education, professional experience, technical skills, and certifications.',
    url:      resumePDF,
    external: true,
    download: true,
  },
  {
    image:    portfolioImg,
    alt:      'Abstract human network visualization representing the portfolio page — AI-generated with Midjourney',
    title:    'Portfolio Page',
    description: 'A deep dive into my projects, work history, and academic background — all in one place.',
    url:      '#/portfolio',
    external: false,
  },
  {
    image:    freecodecampImg,
    alt:      'freeCodeCamp logo — white flame on dark background',
    title:    'freeCodeCamp',
    description: 'Free online platform where I completed certifications in JavaScript Algorithms & Data Structures. Thousands of coding challenges and projects.',
    url:      'https://www.freecodecamp.org',
    external: true,
  },
  {
    image:    ztmImg,
    alt:      'Zero to Mastery (ZTM) logo',
    title:    'Zero to Mastery',
    description: 'Online learning platform where I completed the AI Machine Learning and Data Science Bootcamp. Industry-level courses taught by senior developers.',
    url:      'https://zerotomastery.io',
    external: true,
  },
]

export default function Links() {
  const { t } = useLanguageContext()

  return (
    <div className="links">

      {/* ── HERO ── */}
      <section className="links__hero">
        <p className="links__label">{t('links.label')}</p>
        <h1 className="links__headline">{t('links.headline')}</h1>
        <p className="links__sub">{t('links.sub')}</p>
      </section>

      {/* ── LINKS GRID ── */}
      <section className="links__section">
        <div className="links__grid">
          {links.map(({ image, alt, title, description, url, external, download }) => (
            <a
              key={title}
              href={url}
              target={external ? '_blank' : '_self'}
              rel={external ? 'noopener noreferrer' : undefined}
              download={download || undefined}
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
