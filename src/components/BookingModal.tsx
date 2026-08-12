import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBooking } from '../context/BookingContext'
import { useI18n } from '../i18n/LanguageContext'
import { clinic, team } from '../data/clinic'
import './BookingModal.css'

export function BookingModal() {
  const { isOpen, doctorId, doctorName, closeBooking } = useBooking()
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const doctor = team.find((d) => d.id === doctorId)
  const displayName = doctorName || doctor?.name || t('hero.book.any')
  const displayRole = doctor ? t(doctor.roleKey) : ''
  const displayImg = doctor?.img

  useEffect(() => {
    if (!isOpen) {
      setSent(false)
      setName('')
      setPhone('')
      setDate('')
      setMessage('')
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeBooking()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeBooking])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="booking-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeBooking}
        >
          <motion.div
            className="booking-modal glass-plaque"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="booking-close"
              onClick={closeBooking}
              aria-label="Close"
              data-cursor
            >
              ×
            </button>

            <div className="booking-doctor">
              {displayImg ? (
                <img src={displayImg} alt={displayName} />
              ) : (
                <div className="booking-doctor-fallback" aria-hidden>
                  {displayName.charAt(0)}
                </div>
              )}
              <div>
                <span className="booking-eyebrow">{t('team.book')}</span>
                <h3 id="booking-title">{displayName}</h3>
                {displayRole && <p>{displayRole}</p>}
              </div>
            </div>

            {sent ? (
              <div className="booking-success">
                <div className="booking-success-orb" aria-hidden />
                <strong>{t('contact.thanks')}</strong>
                <span>{t('contact.thanksSub')}</span>
                <button type="button" className="btn btn-coral" onClick={closeBooking} data-cursor>
                  OK
                </button>
              </div>
            ) : (
              <form className="booking-form" onSubmit={onSubmit}>
                <label>
                  {t('contact.name')}
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('reviews.phName')}
                    data-cursor
                  />
                </label>
                <label>
                  {t('contact.phone')}
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 __ ___ __ __"
                    data-cursor
                  />
                </label>
                <label>
                  {t('hero.book.date')}
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    data-cursor
                  />
                </label>
                <label>
                  {t('contact.msg')}
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('reviews.phText')}
                    data-cursor
                  />
                </label>
                <button type="submit" className="btn btn-coral" data-cursor>
                  {t('contact.submit')}
                </button>
                <a href={clinic.phoneHref} className="booking-phone">
                  {clinic.phone}
                </a>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
