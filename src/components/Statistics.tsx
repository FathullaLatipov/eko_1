import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from './Reveal'
import { useI18n } from '../i18n/LanguageContext'

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
  { value: 17, suffix: '+', labelKey: 'stats.1', decimals: 0 },
  { value: 7, suffix: '', labelKey: 'stats.2', decimals: 0 },
  { value: 3, suffix: '', labelKey: 'stats.3', decimals: 0 },
  { value: 4.7, suffix: '', labelKey: 'stats.4', decimals: 1 },
]

export function Statistics() {
  const { t } = useI18n()

  return (
    <section className="section statistics">
      <div className="container">
        <Reveal>
          <span className="section-label">{t('stats.label')}</span>
          <h2 className="section-title">{t('stats.title')}</h2>
        </Reveal>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={s.labelKey} className="stat-card glass-plaque">
              <Reveal delay={i * 0.08}>
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                <span>{t(s.labelKey)}</span>
                <div className="stat-bar" aria-hidden>
                  <i style={{ animationDelay: `${i * 0.15}s` }} />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
        <p className="stats-note">{t('stats.note')}</p>
      </div>
    </section>
  )
}
