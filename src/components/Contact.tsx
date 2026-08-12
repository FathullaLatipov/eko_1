import { useState, type FormEvent } from 'react'
import { Reveal } from './Reveal'
import { clinic } from '../data/clinic'
import { useI18n } from '../i18n/LanguageContext'

export function Contact() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <Reveal>
          <span className="section-label">{t('contact.label')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-lead">{t('contact.lead')}</p>
          <div className="contact-details">
            <p>
              <span>{t('contact.phone')}</span>
              <a href={clinic.phoneHref}>{clinic.phone}</a>
            </p>
            <p>
              <span>Instagram</span>
              <a href={clinic.instagram} target="_blank" rel="noreferrer">
                {clinic.instagramHandle}
              </a>
            </p>
            <p>
              <span>{t('contact.clinic')}</span>
              <strong>
                {t('clinic.address')}
                <br />
                {t('clinic.district')}
              </strong>
            </p>
            <p>
              <span>{t('contact.landmark')}</span>
              <strong>{t('clinic.landmark')}</strong>
            </p>
            <p>
              <span>{t('contact.hours')}</span>
              <strong>
                {t('clinic.hoursWeek')}
                <br />
                {t('clinic.hoursSat')}
              </strong>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="contact-form-wrap glass-plaque">
          {sent ? (
            <div className="contact-success">
              <img src={clinic.logoMark} alt="" className="contact-success-logo" />
              <h3>{t('contact.thanks')}</h3>
              <p>{t('contact.thanksSub')}</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit}>
              <label>
                {t('contact.name')}
                <input name="name" required placeholder={t('reviews.phName')} data-cursor />
              </label>
              <label>
                {t('contact.phone')}
                <input name="phone" type="tel" required placeholder="+998 __ ___ __ __" data-cursor />
              </label>
              <label>
                {t('contact.city')}
                <input name="city" placeholder={t('reviews.phCity')} data-cursor />
              </label>
              <label>
                {t('contact.msg')}
                <textarea name="message" rows={4} placeholder={t('reviews.phText')} data-cursor />
              </label>
              <button type="submit" className="btn btn-coral" data-cursor>
                {t('contact.submit')}
              </button>
              <a
                className="contact-ig"
                href={clinic.instagram}
                target="_blank"
                rel="noreferrer"
                data-cursor
              >
                {t('contact.ig')}
              </a>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
