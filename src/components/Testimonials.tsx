import { Reveal } from './Reveal'

const videos = [
  { name: 'Ханна Р.', rating: '5.0', text: 'Экскурсия по лаборатории сразу дала чувство доверия. Мягко, ясно, профессионально.' },
  { name: 'Омар и Лейла', rating: '5.0', text: 'Поддержка координатора и встреча из аэропорта задали тон спокойному пути.' },
  { name: 'Клер М.', rating: '4.9', text: 'Объяснили все варианты без давления. Эта честность значила для нас всё.' },
]

export function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <Reveal>
          <span className="section-label">Отзывы пациентов</span>
          <h2 className="section-title">Голоса доверия</h2>
        </Reveal>

        <div className="testimonials-grid">
          {videos.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.1} className="video-card">
              <div className="video-thumb">
                <img
                  src={`https://images.unsplash.com/photo-${
                    i === 0
                      ? '1515488042361-ee00e0ddd4e4'
                      : i === 1
                        ? '1609220136736-326cdb8e5a9a'
                        : '1476703993599-0035a21b17a9'
                  }?auto=format&fit=crop&w=900&q=80`}
                  alt={`История ${v.name}`}
                />
                <button className="play-btn" aria-label={`Смотреть историю ${v.name}`} data-cursor>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="speech-bubble">«{v.text}»</div>
              </div>
              <div className="video-meta">
                <strong>{v.name}</strong>
                <span className="stars">★ {v.rating} · История пациента</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="reviews-strip glass">
          <div>
            <strong>4.7</strong>
            <span>Рейтинг на Med24</span>
          </div>
          <div>
            <strong>@turkmed_eku_markazi</strong>
            <span>Наш Instagram</span>
          </div>
          <div>
            <strong>До → После</strong>
            <span>От консультации до малыша</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
