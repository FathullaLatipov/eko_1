import { Reveal } from './Reveal'
import { useI18n } from '../i18n/LanguageContext'

const serviceKeys = ['intl.1', 'intl.2', 'intl.3', 'intl.4', 'intl.5', 'intl.6'] as const

const countries = [
  { key: 'intl.c.uz', x: '64%', y: '42%' },
  { key: 'intl.c.tr', x: '54%', y: '40%' },
  { key: 'intl.c.kz', x: '62%', y: '34%' },
  { key: 'intl.c.ru', x: '58%', y: '28%' },
  { key: 'intl.c.tj', x: '66%', y: '46%' },
  { key: 'intl.c.kg', x: '68%', y: '38%' },
  { key: 'intl.c.ae', x: '58%', y: '52%' },
  { key: 'intl.c.kr', x: '80%', y: '42%' },
]

export function International() {
  const { t } = useI18n()

  return (
    <section className="section international" id="international">
      <div className="container international-grid">
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

        <Reveal delay={0.15} className="world-map glass">
          <svg className="map-svg" viewBox="0 0 800 420" fill="none" aria-hidden>
            <ellipse cx="400" cy="210" rx="340" ry="160" stroke="rgba(16,168,201,0.2)" strokeWidth="1" />
            <ellipse cx="400" cy="210" rx="260" ry="120" stroke="rgba(16,168,201,0.15)" strokeWidth="1" />
            <path
              d="M120 180c40-40 90-60 150-50s110 40 160 30 100-50 160-40 90 50 110 90-10 90-60 110-120 20-180 10-110 20-170 0-100-60-120-100 10-70 50-50z"
              stroke="rgba(16,168,201,0.35)"
              strokeWidth="1.2"
              fill="rgba(16,168,201,0.04)"
            />
          </svg>
          {countries.map((c, i) => (
            <div
              key={c.key}
              className="map-pin"
              style={{ left: c.x, top: c.y, animationDelay: `${i * 0.2}s` }}
            >
              <i />
              <span>{t(c.key)}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
