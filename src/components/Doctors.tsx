import { Reveal } from './Reveal'
import { team } from '../data/clinic'

export function Doctors() {
  return (
    <section className="section doctors" id="doctors">
      <div className="container">
        <Reveal>
          <span className="section-label">Наша команда</span>
          <h2 className="section-title">Эксперты с тёплыми руками</h2>
          <p className="section-lead">
            Эмбриологи из Турции, координатор ЭКО и отечественные врачи Узбекистана —
            одна команда на каждом этапе вашего пути.
          </p>
        </Reveal>

        <div className="doctors-grid">
          {team.map((d, i) => (
            <Reveal key={d.name} delay={Math.min(i * 0.06, 0.36)} className="doctor-card">
              <div className="doctor-photo">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  style={{ objectPosition: d.position }}
                />
              </div>
              <div className="doctor-body">
                <p className="doctor-role">{d.role}</p>
                <h3>{d.name}</h3>
                <ul>
                  <li>
                    <span>Профиль</span>
                    <strong>{d.detail}</strong>
                  </li>
                  <li>
                    <span>Специализация</span>
                    <strong>{d.focus}</strong>
                  </li>
                </ul>
                <a href="#contact" className="btn btn-coral-soft" data-cursor>
                  Записаться на приём
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
