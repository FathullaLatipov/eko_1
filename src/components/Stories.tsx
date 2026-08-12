import { Reveal } from './Reveal'
import { useI18n } from '../i18n/LanguageContext'

const stories = [
  {
    namesKey: 'stories.1.names',
    placeKey: 'stories.1.place',
    quoteKey: 'stories.1.quote',
    img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80',
  },
  {
    namesKey: 'stories.2.names',
    placeKey: 'stories.2.place',
    quoteKey: 'stories.2.quote',
    img: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    namesKey: 'stories.3.names',
    placeKey: 'stories.3.place',
    quoteKey: 'stories.3.quote',
    img: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e3?auto=format&fit=crop&w=900&q=80',
  },
]

export function Stories() {
  const { t } = useI18n()

  return (
    <section className="section stories" id="stories">
      <div className="container">
        <Reveal>
          <span className="section-label">{t('stories.label')}</span>
          <h2 className="section-title">{t('stories.title')}</h2>
        </Reveal>

        <div className="stories-grid">
          {stories.map((s, i) => {
            const names = t(s.namesKey)
            return (
              <div key={s.namesKey} className="story-card glass-plaque">
                <Reveal delay={i * 0.1}>
                  <div className="story-img">
                    <img src={s.img} alt={names} />
                  </div>
                  <blockquote>«{t(s.quoteKey)}»</blockquote>
                  <div className="story-meta">
                    <strong>{names}</strong>
                    <span>{t(s.placeKey)}</span>
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
