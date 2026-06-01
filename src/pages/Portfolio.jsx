// AI-generated images used in this component:
//
// Image 1 — heroPortfolio.png
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Minimalist dark abstract banner, glowing geometric shapes,
//            professional, clean, black background, white accents, wide format"
//
// Image 2 — projectBanner.png
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Abstract code and data visualization, dark background,
//            glowing lines and nodes, minimal, professional, cinematic, wide"

import '../styles/portfolio.css'
import bannerImage   from '../assets/heroPortfolio.png'
import projectsImage from '../assets/projectBanner.png'
import resumePDF     from '../assets/resume/frederick-kranjec-larose-resume.pdf'

import codeBloggsImg from '../assets/project-codebloggs.png'
import portfolioImg  from '../assets/project-portfolio.png'

import { useLanguageContext } from '../context/LanguageContext'

const education = [
  {
    institution: 'CodeBoxx',
    degree:      'Full-Stack Web Development Bootcamp',
    dates:       '2025 — 2026',
    tech:        'HTML/CSS · JavaScript · Java · Node.js · React · React Native · SQL/MySQL · MongoDB',
  },
  {
    institution: 'ESG UQAM',
    degree:      "Bachelor's Degree, Accounting Sciences",
    dates:       '2019 — 2022',
    tech:        null,
  },
]

const certifications = [
  'Legacy JavaScript Algorithms & Data Structures',
  'AI Machine Learning and Data Science Bootcamp 2024',
  'Bloomberg BMC',
  'Derivatives Fundamentals & Options Licensing (DFOL)',
  'Canadian Securities Course (CSC)',
]

const work = [
  {
    title:        'Investment Representative',
    organization: 'Aviso Wealth',
    dates:        'March 2026 — Present · Montreal, QC',
    description:  'Advise clients on investment products, portfolio management strategies, and financial planning. Leverage analytical skills to assess client needs and recommend appropriate financial solutions. Collaborate with cross-functional teams to ensure seamless client onboarding and service delivery.',
  },
  {
    title:        'Investment Service Representative',
    organization: 'RBC Direct Investing',
    dates:        'August 2024 — March 2026 · Montreal, QC',
    description:  'Supported self-directed investors with account management, trading execution, and product inquiries. Handled complex financial transactions and resolved client issues in a fast-paced environment. Consistently met service quality targets while managing a high volume of client interactions.',
  },
  {
    title:        'Banking Advisor',
    organization: 'RBC',
    dates:        'May 2023 — August 2024 · Montreal, QC',
    description:  'Provided personalized financial advice across banking, credit, and investment product lines. Built and maintained client relationships, contributing to branch sales and retention targets. Identified client needs through discovery conversations and matched solutions to financial goals.',
  },
]

const projects = [
  {
    name:        'CodeBloggs — Full-Stack Blogging Platform',
    tech:        ['MERN Stack', 'REST API', 'Selenium IDE', 'Google Lighthouse', 'DevOps'],
    description: 'Full-stack blogging platform with user authentication, profile management, post creation, and a social network feature. Built a REST API with Node.js and Express connected to MongoDB. Wrote automated integration tests using Selenium IDE and conducted Lighthouse performance audits. Deployed using CI/CD and AWS tooling.',
    image:       codeBloggsImg,
    alt:         'Screenshot of CodeBloggs full-stack blogging platform',
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
  const { t } = useLanguageContext()

  return (
    <div className="portfolio">

      {/* ── HERO BANNER ── */}
      <section className="portfolio__hero">
        <div className="portfolio__hero-content">
          <p className="portfolio__label">{t('portfolio.label')}</p>
          <h1 className="portfolio__headline">{t('portfolio.headline')}</h1>
          <p className="portfolio__sub">{t('portfolio.sub')}</p>
          <a href={resumePDF} download className="btn btn--primary">
            {t('portfolio.downloadResume')}
          </a>
        </div>
        <div className="portfolio__hero-image">
          <img src={bannerImage} alt="Abstract geometric banner representing professional experience" />
        </div>
      </section>

      {/* ── SECTION 1: EDUCATION ── */}
      <section className="portfolio__section" id="education">
        <p className="portfolio__section-label">{t('portfolio.educationLabel')}</p>
        <h2 className="portfolio__section-title">{t('portfolio.educationTitle')}</h2>
        <div className="portfolio__timeline">
          {education.map(({ institution, degree, dates, tech }) => (
            <div className="timeline-entry" key={institution}>
              <div className="timeline-entry__dates">{dates}</div>
              <div className="timeline-entry__content">
                <h3 className="timeline-entry__title">{institution}</h3>
                <p className="timeline-entry__sub">{degree}</p>
                {tech && <p className="timeline-entry__tech">{tech}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: CERTIFICATIONS ── */}
      <section className="portfolio__section" id="certifications">
        <p className="portfolio__section-label">{t('portfolio.certLabel')}</p>
        <h2 className="portfolio__section-title">{t('portfolio.certTitle')}</h2>
        <ul className="portfolio__certifications">
          {certifications.map(cert => (
            <li key={cert} className="certification-item">
              <span className="certification-item__dot">- </span>
              {cert}
            </li>
          ))}
        </ul>
      </section>

      {/* ── SECTION 3: WORK EXPERIENCE ── */}
      <section className="portfolio__section" id="work">
        <p className="portfolio__section-label">{t('portfolio.workLabel')}</p>
        <h2 className="portfolio__section-title">{t('portfolio.workTitle')}</h2>
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

      {/* ── SECTION 4: PROJECTS ── */}
      <section className="portfolio__section" id="projects">
        <p className="portfolio__section-label">{t('portfolio.projectsLabel')}</p>
        <h2 className="portfolio__section-title">{t('portfolio.projectsTitle')}</h2>
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
                  {tech.map(tag => <span key={tag} className="tech-tag">{tag}</span>)}
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
