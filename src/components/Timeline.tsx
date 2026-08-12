import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'
import { useI18n } from '../i18n/LanguageContext'

const stepKeys = [1, 2, 3, 4, 5, 6, 7, 8] as const

export function Timeline() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section timeline" id="journey">
      <div className="container">
        <Reveal>
          <span className="section-label">{t('journey.label')}</span>
          <h2 className="section-title">{t('journey.title')}</h2>
          <p className="section-lead">{t('journey.lead')}</p>
        </Reveal>
      </div>

      <div className="timeline-track-wrap" ref={ref}>
        <div className="timeline-progress" aria-hidden>
          <motion.div className="timeline-progress-bar" style={{ scaleX }} />
        </div>
        <div className="timeline-row">
          {stepKeys.map((n, i) => (
            <Reveal key={n} delay={i * 0.05} className="timeline-step">
              <div className="timeline-node">
                <span />
              </div>
              <strong>{t(`journey.${n}.t`)}</strong>
              <p>{t(`journey.${n}.d`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
