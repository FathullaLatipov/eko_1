import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clinic } from '../data/clinic'
import './Navbar.css'

const links = [
  { href: '#about', label: 'О клинике' },
  { href: '#journey', label: 'Путь' },
  { href: '#doctors', label: 'Команда' },
  { href: '#stories', label: 'Истории' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contact', label: 'Контакты' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav${scrolled ? ' is-scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner container-wide">
        <a href="#top" className="nav-logo" data-cursor aria-label={clinic.fullName}>
          <img src={clinic.logoFull} alt={clinic.fullName} className="nav-logo-img" />
        </a>

        <nav className="nav-links" aria-label="Основная навигация">
          {links.map((l) => (
            <a key={l.href} href={l.href} data-cursor>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-coral nav-cta" data-cursor>
          Записаться
        </a>

        <button
          className={`nav-burger${open ? ' is-open' : ''}`}
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          data-cursor
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {l.label}
              </motion.a>
            ))}
            <a href="#contact" className="btn btn-coral" onClick={() => setOpen(false)}>
              Записаться на консультацию
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
