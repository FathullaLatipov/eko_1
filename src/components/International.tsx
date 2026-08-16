import { Reveal } from './Reveal'
import { useI18n } from '../i18n/LanguageContext'

const serviceKeys = ['intl.1', 'intl.2', 'intl.3', 'intl.4', 'intl.5', 'intl.6'] as const

export function International() {
  const { t } = useI18n()

  return (
    <section className="section international" id="international">
      <div className="container">
        <Reveal>
          <span className="section-label">{t('intl.label')}</span>
          <h2 className="section-title">{t('intl.title')}</h2>
          <p className="section-lead">{t('intl.lead')}</p>
          <ul className="intl-services">
            {serviceKeys.map((key) => (
              <li key={key}>
                <span className="intl-check" aria-hidden />
                {t(key)}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
