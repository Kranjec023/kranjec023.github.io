// AI-generated images used in this component:
//
// Image 1 — hero-portrait.png
//   Tool: Adobe Firefly (https://firefly.adobe.com)
//   Prompt: "Professional male developer, side profile, high contrast,
//            dark background, black and white, minimal, cinematic lighting"
//
// Image 2 — network.png
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Abstract tech network, dark background, white glowing nodes
//            and connections, minimal, clean, professional"
//
// Image 3 — human.png
//   Tool: Midjourney (https://midjourney.com)
//   Prompt: "Abstract human connection network, dark background, white silhouettes
//            of people connected by glowing lines, minimal, professional, cinematic"

import '../styles/home.css'
import heroImage   from '../assets/hero-portrait.png'
import skillsImage from '../assets/network.png'
import skillsImage2 from '../assets/human.png'
import { FaCode, FaDatabase, FaCloud, FaLaptopCode, FaRobot } from 'react-icons/fa'
import { FaUsers, FaBriefcase, FaGlobe, FaPuzzlePiece, FaBolt } from 'react-icons/fa'
import { useLanguageContext } from '../context/LanguageContext'

const techSkills = [
  { icon: <FaCode />,       title: 'Full-Stack Development', text: 'Building end-to-end web applications with React, Node.js, and REST APIs.' },
  { icon: <FaDatabase />,   title: 'Data & Databases',       text: 'Designing schemas and querying PostgreSQL and NoSQL databases.' },
  { icon: <FaCloud />,      title: 'Cloud & DevOps',         text: 'Deploying and automating workflows using GitHub Actions and cloud platforms.' },
  { icon: <FaLaptopCode />, title: 'Languages',              text: 'Proficient in JavaScript, Python, Java, C#, and more.' },
  { icon: <FaRobot />,      title: 'AI & Automation',        text: 'Integrating AI tools and building automation pipelines for real-world problems.' },
]

const softSkills = [
  { icon: <FaUsers />,       title: 'Team Collaboration', text: 'Thrived in cross-functional teams across finance desks and dev squads.' },
  { icon: <FaBriefcase />,   title: 'Business Acumen',    text: "Bachelor's in accounting + 3 years in finance — I write code that makes business sense." },
  { icon: <FaGlobe />,       title: 'Multilingual',       text: 'Fluent in French, English, and German — I can debug in three languages.' },
  { icon: <FaPuzzlePiece />, title: 'Problem Solving',    text: 'Drawn to clean logic and elegant solutions — in code and on the bouldering wall.' },
  { icon: <FaBolt />,        title: 'Adaptability',       text: 'Transitioned from finance to tech — I learn fast and deliver under pressure.' },
]

export default function Home() {
  const { t } = useLanguageContext()

  return (
    <div className="home">

      {/* ── SECTION 1: HERO ── */}
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
            <span className="home__dot">●</span> {t('home.available')} &nbsp;
          </p>
        </div>
        <div className="home__hero-image">
          <img src={heroImage} alt="Frédérick Kranjec-Larose — Full-Stack Developer portrait" />
        </div>
      </section>

      {/* ── SECTION 2: TECHNICAL SKILLS ── */}
      <section className="home__skills" id="skills">
        <p className="home__section-label">{t('home.techLabel')}</p>
        <h2 className="home__section-title">{t('home.techTitle')}</h2>
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
        <p className="home__section-label">{t('home.softLabel')}</p>
        <h2 className="home__section-title">{t('home.softTitle')}</h2>
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

      {/* ── IMAGES ── */}
      <section className="home__images-row">
        <img src={skillsImage}  alt="Abstract tech network - Technical Skills" />
      </section>

    </div>
  )
}
