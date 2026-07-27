import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { LifeCanvas } from './backgrounds/LifeCanvas'
import './Hero.css'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70])

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-media" style={{ y, scale }}>
        <img
          src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=2000&q=80"
          alt="Счастливая семья с новорождённым"
        />
        <div className="hero-media-veil" />
      </motion.div>

      <LifeCanvas />
      <div className="hero-gradient" aria-hidden />
      <div className="hero-blob hero-blob-a" aria-hidden />
      <div className="hero-blob hero-blob-b" aria-hidden />

      <motion.div className="hero-content" style={{ y: contentY, opacity }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Создаём чудеса с помощью современной репродуктивной медицины
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9 }}
        >
          Центр ЭКО в Ташкенте — турецкие эмбриологи-эксперты и тёплая персональная
          забота, которая помогает семьям осуществить мечту.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
        >
          <a href="#contact" className="btn btn-primary magnetic" data-cursor>
            Записаться на консультацию
          </a>
          <a href="#doctors" className="btn btn-secondary magnetic" data-cursor>
            Наша команда
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>Листайте дальше</span>
        <i />
      </motion.div>
    </section>
  )
}
