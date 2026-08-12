import { Reveal } from './Reveal'
import { team } from '../data/clinic'
import { useI18n } from '../i18n/LanguageContext'
import { useBooking } from '../context/BookingContext'

export function Doctors() {
  const { t } = useI18n()
  const { openBooking } = useBooking()

  return (
    <section className="section doctors" id="doctors">
      <div className="container">
        <Reveal>
          <span className="section-label">{t('team.label')}</span>
          <h2 className="section-title">{t('team.title')}</h2>
          <p className="section-lead">{t('team.lead')}</p>
        </Reveal>

        <div className="doctors-grid">
          {team.map((d, i) => (
            <Reveal key={d.id} delay={Math.min(i * 0.06, 0.36)} className="doctor-card glass-plaque">
              <div className="doctor-photo">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  style={{ objectPosition: d.position }}
                />
              </div>
              <div className="doctor-body">
                <p className="doctor-role">{t(d.roleKey)}</p>
                <h3>{d.name}</h3>
                <ul>
                  <li>
                    <span>{t('team.profile')}</span>
                    <strong>{t(d.detailKey)}</strong>
                  </li>
                  <li>
                    <span>{t('team.focus')}</span>
                    <strong>{t(d.focusKey)}</strong>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-coral-soft"
                  data-cursor
                  onClick={() => openBooking(d.id, d.name)}
                >
                  {t('team.book')}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
