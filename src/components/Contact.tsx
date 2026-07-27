import { useState, type FormEvent } from 'react'
import { Reveal } from './Reveal'
import { clinic } from '../data/clinic'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <Reveal>
          <span className="section-label">Контакты</span>
          <h2 className="section-title">Начните путь к чуду</h2>
          <p className="section-lead">
            Оставьте несколько деталей — координатор ЭКО ответит тепло и ясно. Или
            напишите нам в Instagram.
          </p>
          <div className="contact-details">
            <p>
              <span>Телефон</span>
              <a href={clinic.phoneHref}>{clinic.phone}</a>
            </p>
            <p>
              <span>Instagram</span>
              <a href={clinic.instagram} target="_blank" rel="noreferrer">
                {clinic.instagramHandle}
              </a>
            </p>
            <p>
              <span>Адрес</span>
              <strong>
                {clinic.address}
                <br />
                {clinic.district}
              </strong>
            </p>
            <p>
              <span>Ориентир</span>
              <strong>{clinic.landmark}</strong>
            </p>
            <p>
              <span>Часы работы</span>
              <strong>
                {clinic.hoursWeek}
                <br />
                {clinic.hoursSat}
              </strong>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="contact-form-wrap glass">
          {sent ? (
            <div className="contact-success">
              <img src={clinic.logoMark} alt="" className="contact-success-logo" />
              <h3>Спасибо</h3>
              <p>
                Мы получили вашу заявку. Координатор {clinic.name} скоро свяжется с вами.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit}>
              <label>
                ФИО
                <input name="name" required placeholder="Ваше имя" data-cursor />
              </label>
              <label>
                Телефон
                <input name="phone" type="tel" required placeholder="+998 __ ___ __ __" data-cursor />
              </label>
              <label>
                Город
                <input name="city" placeholder="Ташкент" data-cursor />
              </label>
              <label>
                Чем можем помочь?
                <textarea name="message" rows={4} placeholder="Расскажите о вашем пути…" data-cursor />
              </label>
              <button type="submit" className="btn btn-coral" data-cursor>
                Отправить заявку
              </button>
              <a
                className="contact-ig"
                href={clinic.instagram}
                target="_blank"
                rel="noreferrer"
                data-cursor
              >
                Или напишите в Instagram →
              </a>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
