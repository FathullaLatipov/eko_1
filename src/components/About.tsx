import { Reveal } from './Reveal'
import { clinic } from '../data/clinic'
import './sections.css'

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <Reveal>
          <span className="section-label">О клинике</span>
          <h2 className="section-title">
            Где турецкий опыт
            <br />
            встречается с заботой о семье
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-lead about-lead">
            {clinic.fullName} — частная клиника в Ташкенте, специализирующаяся на
            репродуктивной медицине, женском и мужском здоровье и ЭКО. В нашей
            команде работают высококвалифицированные эмбриологи из Турции с опытом
            более 17 лет — современные протоколы и тёплый, персональный подход к
            каждому пациенту.
          </p>
          <div className="about-stats">
            <div>
              <strong>17+</strong>
              <span>лет опыта в эмбриологии</span>
            </div>
            <div>
              <strong>7</strong>
              <span>специалистов рядом с вами</span>
            </div>
            <div>
              <strong>TR × UZ</strong>
              <span>совместный клинический уровень</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container about-gallery">
        <Reveal className="about-img about-img-lg" delay={0.1} blur>
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
            alt="Современная лаборатория репродукции"
          />
        </Reveal>
        <Reveal className="about-img about-img-sm" delay={0.25} blur>
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80"
            alt="Научная лаборатория и микроскопия"
          />
          <div className="about-caption glass">
            Наука, которая бережно создаёт новую жизнь
          </div>
        </Reveal>
      </div>
    </section>
  )
}
