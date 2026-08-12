import { Reveal } from './Reveal'
import { useI18n } from '../i18n/LanguageContext'

export function WhyChoose() {
  const { t } = useI18n()
  const reasons = [
    { title: t('why.1.t'), text: t('why.1.d'), icon: '01' },
    { title: t('why.2.t'), text: t('why.2.d'), icon: '02' },
    { title: t('why.3.t'), text: t('why.3.d'), icon: '03' },
    { title: t('why.4.t'), text: t('why.4.d'), icon: '04' },
  ]

  return (
    <section className="section why">
      <div className="container">
        <Reveal>
          <span className="section-label">{t('why.label')}</span>
          <h2 className="section-title">{t('why.title')}</h2>
          <p className="section-lead">{t('why.lead')}</p>
        </Reveal>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <div key={r.title} className="why-card glass-plaque">
              <Reveal delay={i * 0.08}>
                <span className="why-num">{r.icon}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                <div className="why-line" aria-hidden />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
