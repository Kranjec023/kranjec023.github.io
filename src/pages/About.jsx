import '../styles/about.css'
import '../styles/cards.css'
import Carousel from '../components/Carousel'
import { useLanguageContext } from '../context/LanguageContext'
import { FaReact, FaNodeJs, FaDatabase, FaJava } from 'react-icons/fa'
import { SiJavascript, SiPython, SiMongodb, SiMysql } from 'react-icons/si'
import skillsImage from '../assets/network.png'

const skills = [
  { icon: <FaReact />,       name: 'React',       description: 'Building dynamic UIs with hooks, context, and component architecture.' },
  { icon: <FaNodeJs />,      name: 'Node.js',     description: 'Server-side JavaScript for REST APIs and backend logic.' },
  { icon: <SiJavascript />,  name: 'JavaScript',  description: 'Core language for all front-end and full-stack development.' },
  { icon: <SiPython />,      name: 'Python',      description: 'Scripting, automation, and data processing tasks.' },
  { icon: <FaJava />,        name: 'Java',        description: 'Object-oriented programming and backend application development.' },
  { icon: <FaDatabase />,    name: 'SQL',         description: 'Relational database design, queries, and optimization.' },
  { icon: <SiMongodb />,     name: 'MongoDB',     description: 'Document-based NoSQL database for flexible data storage.' },
  { icon: <SiMysql />,       name: 'MySQL',       description: 'Structured relational database management and querying.' },
]

function SkillCard({ icon, name, description }) {
  return (
    <div className="skill-card">
      <span className="skill-card__icon">{icon}</span>
      <h3 className="skill-card__name">{name}</h3>
      <p className="skill-card__desc">{description}</p>
    </div>
  )
}

export default function About() {
  const { t } = useLanguageContext()

  return (
    <div className="about">

      {/* ── PROFILE SUMMARY ── */}
      <section className="about__hero">
        <div className="about__hero-content">
          <p className="about__label">{t('about.label')}</p>
          <h1 className="about__headline">{t('about.headline')}</h1>
          <div className="about__summary">
            <p>{t('about.summary')}</p>
          </div>
        </div>
        <div className="about__hero-image">                        
          <img src={skillsImage} alt="Abstract tech network" />
        </div>
      </section>

      {/* ── SKILLS & TECHNOLOGIES ── */}
      <section className="about__section">
        <p className="about__section-label">{t('about.skillsLabel')}</p>
        <h2 className="about__section-title">{t('about.skillsTitle')}</h2>
        <Carousel
          items={skills}
          visibleCount={3}
          renderCard={(item, i) => <SkillCard key={i} {...item} />}
        />
      </section>

    </div>
  )
}