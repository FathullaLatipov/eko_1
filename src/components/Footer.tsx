import { clinic } from '../data/clinic'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#top" className="footer-logo" data-cursor>
            <img src={clinic.logoFull} alt={clinic.fullName} />
          </a>
          <p>{clinic.mission}</p>
          <p className="footer-tagline">{clinic.tagline}</p>
          <a
            className="footer-ig"
            href={clinic.instagram}
            target="_blank"
            rel="noreferrer"
            data-cursor
          >
            Instagram {clinic.instagramHandle}
          </a>
        </div>
        <div>
          <h4>Разделы</h4>
          <a href="#about">О клинике</a>
          <a href="#journey">Путь</a>
          <a href="#doctors">Команда</a>
          <a href="#technology">Технологии</a>
        </div>
        <div>
          <h4>Пациентам</h4>
          <a href="#stories">Истории успеха</a>
          <a href="#international">Иногородним</a>
          <a href="#faq">Вопросы</a>
          <a href="#contact">Контакты</a>
        </div>
        <div>
          <h4>Визит</h4>
          <p>{clinic.address}</p>
          <p>{clinic.district}</p>
          <p>{clinic.hoursWeek}</p>
          <p>{clinic.hoursSat}</p>
          <a href={clinic.phoneHref}>{clinic.phone}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {clinic.fullName}. Все права защищены.</span>
        <span>С наукой и мягкостью.</span>
      </div>
    </footer>
  )
}
