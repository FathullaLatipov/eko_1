import { Reveal } from './Reveal'

const services = [
  'Помощь с поездкой',
  'Ориентация по городу',
  'Поддержка UZ / TR / RU',
  'Трансфер из аэропорта',
  'Помощь с проживанием',
  'Координация лечения',
]

const countries = [
  { name: 'Узбекистан', x: '64%', y: '42%' },
  { name: 'Турция', x: '54%', y: '40%' },
  { name: 'Казахстан', x: '62%', y: '34%' },
  { name: 'Россия', x: '58%', y: '28%' },
  { name: 'Таджикистан', x: '66%', y: '46%' },
  { name: 'Кыргызстан', x: '68%', y: '38%' },
  { name: 'ОАЭ', x: '58%', y: '52%' },
  { name: 'Корея', x: '80%', y: '42%' },
]

export function International() {
  return (
    <section className="section international" id="international">
      <div className="container international-grid">
        <Reveal>
          <span className="section-label">Пациенты из разных городов</span>
          <h2 className="section-title">Забота Ташкента — тепло региона</h2>
          <p className="section-lead">
            Живёте в Ташкенте или приезжаете из другого города — мы поможем приехать
            спокойно, подготовленными и не в одиночестве.
          </p>
          <ul className="intl-services">
            {services.map((s) => (
              <li key={s}>
                <span className="intl-check" aria-hidden />
                {s}
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
              key={c.name}
              className="map-pin"
              style={{ left: c.x, top: c.y, animationDelay: `${i * 0.2}s` }}
            >
              <i />
              <span>{c.name}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
