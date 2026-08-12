import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type FormEvent } from 'react'
import { LifeCanvas } from './backgrounds/LifeCanvas'
import { useI18n } from '../i18n/LanguageContext'
import { useBooking } from '../context/BookingContext'
import { team } from '../data/clinic'
import './Hero.css'

export function Hero() {
  const { t } = useI18n()
  const { openBooking } = useBooking()
  const ref = useRef<HTMLElement>(null)
  const [dept, setDept] = useState('ivf')
  const [doctor, setDoctor] = useState('')
  const [date, setDate] = useState('')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const onQuickBook = (e: FormEvent) => {
    e.preventDefault()
    const member = team.find((m) => m.id === doctor)
    openBooking(member?.id ?? '', member?.name ?? '')
  }

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-media" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1600&q=70"
          alt=""
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-media-veil" />
      </motion.div>

      <div className="hero-mesh" aria-hidden />
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />
      <LifeCanvas />
      <div className="hero-gradient" aria-hidden />

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.div
          className="hero-content-glass glass-plaque"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9 }}
          >
            {t('hero.titleBefore')} <em>{t('hero.titleEm')}</em> {t('hero.titleAfter')}
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.85 }}
          >
            {t('hero.sub')}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            <button
              type="button"
              className="btn btn-coral magnetic"
              data-cursor
              onClick={() => openBooking()}
            >
              {t('hero.cta1')}
            </button>
            <a href="#doctors" className="btn btn-secondary magnetic" data-cursor>
              {t('hero.cta2')}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.form
        className="hero-book-plank glass-plaque"
        onSubmit={onQuickBook}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <label>
          <span>{t('hero.book.dept')}</span>
          <select value={dept} onChange={(e) => setDept(e.target.value)} data-cursor>
            <option value="ivf">{t('hero.book.deptIvf')}</option>
            <option value="gyn">{t('hero.book.deptGyn')}</option>
          </select>
        </label>
        <label>
          <span>{t('hero.book.doctor')}</span>
          <select value={doctor} onChange={(e) => setDoctor(e.target.value)} data-cursor>
            <option value="">{t('hero.book.any')}</option>
            {team.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{t('hero.book.date')}</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            data-cursor
          />
        </label>
        <button type="submit" className="btn btn-coral" data-cursor>
          {t('hero.book.cta')}
        </button>
      </motion.form>
    </section>
  )
}
