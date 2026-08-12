import { clinic } from '../data/clinic'
import { useI18n } from '../i18n/LanguageContext'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#top" className="footer-logo" data-cursor>
            <img src={clinic.logoFull} alt={clinic.fullName} />
          </a>
          <p>{t('mission')}</p>
          <p className="footer-tagline">{t('tagline')}</p>
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
          <h4>{t('footer.explore')}</h4>
          <a href="#about">{t('nav.about')}</a>
          <a href="#journey">{t('nav.journey')}</a>
          <a href="#doctors">{t('nav.team')}</a>
          <a href="#technology">{t('tech.label')}</a>
        </div>
        <div>
          <h4>{t('footer.care')}</h4>
          <a href="#stories">{t('nav.stories')}</a>
          <a href="#reviews">{t('nav.reviews')}</a>
          <a href="#faq">{t('faq.label')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </div>
        <div>
          <h4>{t('footer.visit')}</h4>
          <p>{t('clinic.address')}</p>
          <p>{t('clinic.district')}</p>
          <p>{t('clinic.hoursWeek')}</p>
          <p>{t('clinic.hoursSat')}</p>
          <a href={clinic.phoneHref}>{clinic.phone}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {clinic.fullName}. {t('footer.rights')}
        </span>
        <span>{t('footer.craft')}</span>
      </div>
    </footer>
  )
}
