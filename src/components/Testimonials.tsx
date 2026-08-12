import { Reveal } from './Reveal'
import { clinic } from '../data/clinic'
import { useI18n } from '../i18n/LanguageContext'

const videos = [
  { name: 'Ханна Р.', rating: '5.0', textKey: 'testi.1' },
  { name: 'Омар и Лейла', rating: '5.0', textKey: 'testi.2' },
  { name: 'Клер М.', rating: '4.9', textKey: 'testi.3' },
]

export function Testimonials() {
  const { t } = useI18n()

  return (
    <section className="section testimonials">
      <div className="container">
        <Reveal>
          <span className="section-label">{t('testi.label')}</span>
          <h2 className="section-title">{t('testi.title')}</h2>
        </Reveal>

        <div className="testimonials-grid">
          {videos.map((v, i) => (
            <div key={v.name} className="video-card glass-plaque">
              <Reveal delay={i * 0.08}>
                <div className="video-thumb">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      i === 0
                        ? '1515488042361-ee00e0ddd4e4'
                        : i === 1
                          ? '1609220136736-326cdb8e5a9a'
                          : '1476703993599-0035a21b17a9'
                    }?auto=format&fit=crop&w=800&q=75`}
                    alt={t('testi.alt', { name: v.name })}
                    loading="lazy"
                    decoding="async"
                  />
                  <button
                    className="play-btn"
                    type="button"
                    aria-label={t('testi.watch', { name: v.name })}
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <div className="speech-bubble">«{t(v.textKey)}»</div>
                </div>
                <div className="video-meta">
                  <strong>{v.name}</strong>
                  <span className="stars">
                    ★ {v.rating} · {t('testi.story')}
                  </span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="reviews-strip glass-plaque">
          <Reveal delay={0.12}>
            <div className="reviews-strip-inner">
              <div>
                <strong>4.7</strong>
                <span>{t('testi.rating')}</span>
              </div>
              <div>
                <strong>{clinic.instagramHandle}</strong>
                <span>{t('testi.ig')}</span>
              </div>
              <div>
                <strong>{t('testi.before')}</strong>
                <span>{t('testi.beforeSub')}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
