import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { clinic } from '../data/clinic'

const faqs = [
  {
    q: 'Как записаться на консультацию?',
    a: `Позвоните по номеру ${clinic.phone}, напишите в Instagram ${clinic.instagramHandle} или оставьте заявку в форме. Координатор ЭКО подскажет следующие шаги.`,
  },
  {
    q: 'Кто ваши эмбриологи?',
    a: 'В TürkMed работают высококвалифицированные эмбриологи из Турции с опытом более 17 лет — в том числе Осман Чингёз, Месут Четер и Гюркан Юртдаш.',
  },
  {
    q: 'Где находится клиника?',
    a: `${clinic.address}, ${clinic.district}. Ориентир: ${clinic.landmark}. Часы работы: ${clinic.hoursWeek}; ${clinic.hoursSat}.`,
  },
  {
    q: 'На каких языках можно общаться?',
    a: 'Мы обычно общаемся на узбекском, русском и турецком. Если нужен дополнительный язык — спросите координатора.',
  },
  {
    q: 'Насколько персонален план ЭКО?',
    a: 'Каждый протокол составляется индивидуально по результатам диагностики. Репродуктолог объясняет варианты ясно — без шаблонов.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <Reveal>
          <span className="section-label">Вопросы</span>
          <h2 className="section-title">Ответы — спокойно и честно</h2>
          <p className="section-lead">
            Остались вопросы? Напишите {clinic.instagramHandle} — мы ответим с заботой.
          </p>
        </Reveal>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.05} className="faq-item">
                <button
                  className={isOpen ? 'is-open' : ''}
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
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
                      <p>{f.a}</p>
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
