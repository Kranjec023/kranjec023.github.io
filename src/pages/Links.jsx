import '../styles/links.css'
import '../styles/cards.css'
import Carousel from '../components/Carousel'
import { useLanguageContext } from '../context/LanguageContext'
import resumePDF from '../assets/resume/frederick-kranjec-larose-resume.pdf'

import imgGithub      from '../assets/link-github.png'
import imgLinkedin    from '../assets/link-linkedin.png'
import imgCodeboxx    from '../assets/link-codeboxx.png'
import imgResume      from '../assets/link-resume.png'
import imgPortfolio   from '../assets/network.png'
import imgFreecodecamp from '../assets/link-freecodecamp.png'
import imgZtm         from '../assets/link-ztm.png'

const linkItems = [
  { img: imgGithub,       name: 'GitHub',       description: 'My open-source projects, repositories, and code contributions.',                               url: 'https://github.com/Kranjec023',                                          external: true },
  { img: imgLinkedin,     name: 'LinkedIn',     description: 'Professional profile — full work history, certifications, and recommendations.',               url: 'https://linkedin.com/in/frédérick-kranjec-larose-052835110',             external: true },
  { img: imgCodeboxx,     name: 'CodeBoxx',     description: 'The bootcamp where I trained as a full-stack developer. Covers the MERN stack, DevOps, and more.', url: 'https://codeboxx.biz',                                               external: true },
  { img: imgResume,       name: 'Resume / CV',  description: 'Download my full resume as a PDF — experience, skills, and certifications.',                   url: resumePDF,                                                                external: true,  download: true },
  { img: imgPortfolio,    name: 'Portfolio',    description: 'A deep dive into my projects, work history, and academic background.',                         url: '#/portfolio',                                                            external: false },
  { img: imgFreecodecamp, name: 'freeCodeCamp', description: 'Platform where I completed certifications in JavaScript Algorithms & Data Structures.',        url: 'https://www.freecodecamp.org',                                           external: true },
  { img: imgZtm,          name: 'Zero to Mastery', description: 'Online platform where I completed the AI Machine Learning and Data Science Bootcamp.',     url: 'https://zerotomastery.io',                                               external: true },
]

function LinkCard({ img, name, description, url, external, download }) {
  return (
    <a
      className="link-card"
      href={url}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noopener noreferrer' : undefined}
      download={download || undefined}
    >
      <span className="link-card__icon">
        <img src={img} alt={name} className="link-card__img" />
      </span>
      <h3 className="link-card__name">{name}</h3>
      <p className="link-card__desc">{description}</p>
      <span className="link-card__arrow">↗</span>
    </a>
  )
}

export default function Links() {
  const { t } = useLanguageContext()

  return (
    <div className="links">
      <section className="links__hero">
        <p className="links__label">{t('links.label')}</p>
        <h1 className="links__headline">{t('links.headline')}</h1>
        <p className="links__sub">{t('links.sub')}</p>
      </section>

      <section className="links__section">
        <Carousel
          items={linkItems}
          visibleCount={3}
          renderCard={(item, i) => <LinkCard key={i} {...item} />}
        />
      </section>
    </div>
  )
}