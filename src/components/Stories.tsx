import { Reveal } from './Reveal'

const stories = [
  {
    names: 'Нилуфар и семья',
    place: 'Ташкент → TürkMed',
    quote: 'После долгих лет ожидания мы наконец взяли на руки дочь. Команда сделала каждый шаг ясным и добрым.',
    img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80',
  },
  {
    names: 'Мадина и Азиз',
    place: 'Самарканд → TürkMed',
    quote: 'Турецкие эмбриологи и наш координатор вели нас спокойно и уверенно. Мы ни на миг не чувствовали себя одни.',
    img: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    names: 'Дильноза',
    place: 'Путь ЭКО',
    quote: 'Они объясняли каждый вариант без давления. Эта честность и тепло значили для меня всё.',
    img: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e3?auto=format&fit=crop&w=900&q=80',
  },
]

export function Stories() {
  return (
    <section className="section stories" id="stories">
      <div className="container">
        <Reveal>
          <span className="section-label">Истории успеха</span>
          <h2 className="section-title">Семьи, которым мы помогли</h2>
        </Reveal>

        <div className="stories-grid">
          {stories.map((s, i) => (
            <Reveal key={s.names} delay={i * 0.1} className="story-card">
              <div className="story-img">
                <img src={s.img} alt={s.names} />
              </div>
              <blockquote>«{s.quote}»</blockquote>
              <div className="story-meta">
                <strong>{s.names}</strong>
                <span>{s.place}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
