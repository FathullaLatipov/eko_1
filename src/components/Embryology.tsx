import { Reveal } from './Reveal'
import { useI18n } from '../i18n/LanguageContext'

export function Embryology() {
  const { t } = useI18n()

  return (
    <section className="section embryology">
      <div className="container embryology-shell">
        <Reveal className="embryology-media" blur>
          <img
            src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1000&q=80"
            alt={t('embryo.alt')}
          />
          <div className="embryology-orb" aria-hidden />
        </Reveal>
        <Reveal delay={0.15} className="embryology-copy">
          <span className="section-label">{t('embryo.label')}</span>
          <h2 className="section-title">{t('embryo.title')}</h2>
          <p className="section-lead">{t('embryo.lead')}</p>
          <ul className="embryology-list">
            <li>{t('embryo.1')}</li>
            <li>{t('embryo.2')}</li>
            <li>{t('embryo.3')}</li>
            <li>{t('embryo.4')}</li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
