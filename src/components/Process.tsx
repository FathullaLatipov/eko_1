import { Reveal } from './Reveal'
import { useI18n } from '../i18n/LanguageContext'

const phases = [
  { titleKey: 'process.1.t', textKey: 'process.1.d' },
  { titleKey: 'process.2.t', textKey: 'process.2.d' },
  { titleKey: 'process.3.t', textKey: 'process.3.d' },
  { titleKey: 'process.4.t', textKey: 'process.4.d' },
]

export function Process() {
  const { t } = useI18n()

  return (
    <section className="section process">
      <div className="container process-grid">
        <Reveal className="process-sticky">
          <span className="section-label">{t('process.label')}</span>
          <h2 className="section-title">{t('process.title')}</h2>
          <p className="section-lead">{t('process.lead')}</p>
        </Reveal>
        <div className="process-list">
          {phases.map((p, i) => (
            <div key={p.titleKey} className="process-item glass-plaque">
              <Reveal delay={i * 0.08}>
                <div className="process-item-inner">
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{t(p.titleKey)}</h3>
                    <p>{t(p.textKey)}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
