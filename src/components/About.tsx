import { Reveal } from './Reveal'
import { clinic } from '../data/clinic'
import { useI18n } from '../i18n/LanguageContext'
import './sections.css'

export function About() {
  const { t } = useI18n()

  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <Reveal>
          <span className="section-label">{t('about.label')}</span>
          <h2 className="section-title">
            {t('about.title1')}
            <br />
            {t('about.title2')}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-lead about-lead">
            {t('about.lead', { name: clinic.fullName })}
          </p>
          <div className="about-stats">
            <div>
              <strong>17+</strong>
              <span>{t('about.s1')}</span>
            </div>
            <div>
              <strong>7</strong>
              <span>{t('about.s2')}</span>
            </div>
            <div className="about-stat-accent">
              <strong>TR × UZ</strong>
              <span>{t('about.s3')}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container about-gallery">
        <Reveal className="about-img about-img-lg" delay={0.1} blur>
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
            alt=""
          />
        </Reveal>
        <Reveal className="about-img about-img-sm" delay={0.25} blur>
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80"
            alt=""
          />
          <div className="about-caption glass">
            {t('about.cap')}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
