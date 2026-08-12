import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { clinic } from '../data/clinic'
import { useI18n } from '../i18n/LanguageContext'

const faqKeys = [1, 2, 3, 4, 5] as const

export function FAQ() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(0)

  const clinicVars = {
    phone: clinic.phone,
    ig: clinic.instagramHandle,
    address: t('clinic.address'),
    district: t('clinic.district'),
    landmark: t('clinic.landmark'),
    hoursWeek: t('clinic.hoursWeek'),
    hoursSat: t('clinic.hoursSat'),
  }

  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <Reveal>
          <span className="section-label">{t('faq.label')}</span>
          <h2 className="section-title">{t('faq.title')}</h2>
          <p className="section-lead">{t('faq.lead', { ig: clinic.instagramHandle })}</p>
        </Reveal>

        <div className="faq-list">
          {faqKeys.map((n, i) => {
            const isOpen = open === i
            const q = t(`faq.${n}.q`)
            return (
              <Reveal key={n} delay={i * 0.05} className="faq-item">
                <button
                  className={isOpen ? 'is-open' : ''}
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor
                  aria-expanded={isOpen}
                >
                  <span>{q}</span>
                  <i aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{t(`faq.${n}.a`, clinicVars)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
