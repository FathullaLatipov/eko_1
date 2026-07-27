import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'

const steps = [
  { title: 'Консультация', desc: 'Внимательное знакомство и сбор анамнеза.' },
  { title: 'Диагностика', desc: 'Точная диагностика фертильности без лишних слов.' },
  { title: 'План лечения', desc: 'Персональный протокол под ваш организм.' },
  { title: 'Пункция', desc: 'Бережная процедура под контролем экспертов.' },
  { title: 'Лаборатория', desc: 'Эмбриология высшего уровня и постоянный мониторинг.' },
  { title: 'Перенос', desc: 'Точный перенос эмбриона в оптимальное окно.' },
  { title: 'Беременность', desc: 'Сопровождение и поддержка на каждом шаге.' },
  { title: 'Малыш', desc: 'Начало новой главы вашей семьи.' },
]

export function Timeline() {
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
          <span className="section-label">Путь лечения</span>
          <h2 className="section-title">Ваш путь — шаг за шагом</h2>
          <p className="section-lead">
            От первого разговора до первого сердцебиения — в спокойном, заботливом ритме.
          </p>
        </Reveal>
      </div>

      <div className="timeline-track-wrap" ref={ref}>
        <div className="timeline-progress" aria-hidden>
          <motion.div className="timeline-progress-bar" style={{ scaleX }} />
        </div>
        <div className="timeline-row">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05} className="timeline-step">
              <div className="timeline-node">
                <span />
              </div>
              <strong>{s.title}</strong>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
