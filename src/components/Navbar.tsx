import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clinic } from '../data/clinic'
import { useI18n } from '../i18n/LanguageContext'
import { languages, type Lang } from '../i18n/translations'
import { useBooking } from '../context/BookingContext'
import './Navbar.css'

export function Navbar() {
  const { t, lang, setLang } = useI18n()
  const { openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const links = [
    { href: '#about', label: t('nav.about') },
    { href: '#journey', label: t('nav.journey') },
    { href: '#doctors', label: t('nav.team') },
    { href: '#stories', label: t('nav.stories') },
    { href: '#reviews', label: t('nav.reviews') },
    { href: '#contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = () => setLangOpen(false)
    if (langOpen) {
      window.addEventListener('click', close)
      return () => window.removeEventListener('click', close)
    }
  }, [langOpen])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <motion.header
      className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-menu-open' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner container-wide">
        <a href="#top" className="nav-logo" data-cursor aria-label={clinic.fullName}>
          <img src={clinic.logoFull} alt={clinic.fullName} className="nav-logo-img" />
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} data-cursor>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="lang-switch" onClick={(e) => e.stopPropagation()}>
            <button
              className="lang-btn glass-plaque"
              type="button"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
              data-cursor
            >
              {languages.find((l) => l.code === lang)?.short ?? 'RU'}
              <span aria-hidden>▾</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  className="lang-menu glass-plaque"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {languages.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        className={lang === l.code ? 'is-active' : ''}
                        onClick={() => {
                          setLang(l.code as Lang)
                          setLangOpen(false)
                        }}
                        data-cursor
                      >
                        <strong>{l.short}</strong>
                        <span>{l.label}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="btn btn-coral nav-cta"
            data-cursor
            onClick={() => openBooking()}
          >
            {t('nav.book')}
          </button>

          <button
            className={`nav-burger${open ? ' is-open' : ''}`}
            aria-label={t('nav.menu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-cursor
          >
            <span />
            <span />
          </button>
        </div>
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
            <div className="lang-mobile">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={lang === l.code ? 'is-active' : ''}
                  onClick={() => setLang(l.code)}
                >
                  {l.short}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-coral"
              onClick={() => {
                setOpen(false)
                openBooking()
              }}
            >
              {t('nav.bookFull')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
