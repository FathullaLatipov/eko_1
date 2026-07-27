import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from './Reveal'

function Counter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1800
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <strong ref={ref}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </strong>
  )
}

const stats = [
  { value: 17, suffix: '+', label: 'лет опыта в эмбриологии', decimals: 0 },
  { value: 7, suffix: '', label: 'специалистов в команде', decimals: 0 },
  { value: 3, suffix: '', label: 'турецких эмбриолога-эксперта', decimals: 0 },
  { value: 4.7, suffix: '', label: 'рейтинг пациентов (Med24)', decimals: 1 },
]

export function Statistics() {
  return (
    <section className="section statistics">
      <div className="container">
        <Reveal>
          <span className="section-label">Цифры успеха</span>
          <h2 className="section-title">Числа, за которыми — новые начала</h2>
        </Reveal>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="stat-card">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              <span>{s.label}</span>
              <div className="stat-bar" aria-hidden>
                <i style={{ animationDelay: `${i * 0.15}s` }} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="stats-note">
          Результаты индивидуальны и зависят от диагноза и протокола. Ваш специалист
          TürkMed обсудит персональный прогноз на консультации.
        </p>
      </div>
    </section>
  )
}
