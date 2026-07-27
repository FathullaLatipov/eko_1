import { Reveal } from './Reveal'

const tech = [
  {
    title: 'Инкубация эмбрионов',
    text: 'Непрерывная культуральная среда, близкая к условиям организма.',
    visual: 'incubator',
  },
  {
    title: 'Точная микроскопия',
    text: 'Высокое разрешение для микроманипуляций с ювелирной аккуратностью.',
    visual: 'scope',
  },
  {
    title: 'Отбор эмбрионов',
    text: 'Современные системы оценки — всегда под контролем эксперта.',
    visual: 'ai',
  },
  {
    title: 'Безопасность лаборатории',
    text: 'Качество воздуха, идентификация и двойная проверка на каждом шаге.',
    visual: 'safe',
  },
]

function TechVisual({ type }: { type: string }) {
  return (
    <div className={`tech-visual tech-${type}`} aria-hidden>
      <svg viewBox="0 0 120 120" fill="none">
        {type === 'incubator' && (
          <>
            <circle cx="60" cy="60" r="36" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
            <circle cx="60" cy="60" r="22" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="60" cy="60" r="8" fill="#E84652" opacity="0.7" />
            <path d="M60 24v12M60 84v12M24 60h12M84 60h12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </>
        )}
        {type === 'scope' && (
          <>
            <ellipse cx="60" cy="70" rx="28" ry="18" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="60" cy="42" r="16" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="60" cy="42" r="6" fill="#10A8C9" opacity="0.6" />
            <path d="M48 86c4 10 20 10 24 0" stroke="currentColor" strokeWidth="1.2" />
          </>
        )}
        {type === 'ai' && (
          <>
            <rect x="28" y="28" width="64" height="64" rx="16" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="48" cy="52" r="4" fill="#10A8C9" />
            <circle cx="72" cy="52" r="4" fill="#E84652" />
            <path d="M44 74c6 8 26 8 32 0" stroke="currentColor" strokeWidth="1.2" />
            <path d="M60 28v-8M28 60h-8M92 60h8" stroke="currentColor" opacity="0.4" />
          </>
        )}
        {type === 'safe' && (
          <>
            <path
              d="M60 22l28 12v22c0 18-12 32-28 38-16-6-28-20-28-38V34l28-12z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M48 60l8 8 16-18" stroke="#10A8C9" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  )
}

export function Technology() {
  return (
    <section className="section technology" id="technology">
      <div className="container">
        <Reveal>
          <span className="section-label">Лабораторные технологии</span>
          <h2 className="section-title">Будущее медицины — человеческое тепло</h2>
          <p className="section-lead">
            Инструменты, которые остаются незаметными — чтобы наука могла тихо делать своё дело.
          </p>
        </Reveal>

        <div className="tech-grid">
          {tech.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08} className="tech-card">
              <TechVisual type={t.visual} />
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
