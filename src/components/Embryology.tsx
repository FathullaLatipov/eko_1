import { Reveal } from './Reveal'

export function Embryology() {
  return (
    <section className="section embryology">
      <div className="container embryology-shell">
        <Reveal className="embryology-media" blur>
          <img
            src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1000&q=80"
            alt="Эмбриологическая лаборатория"
          />
          <div className="embryology-orb" aria-hidden />
        </Reveal>
        <Reveal delay={0.15} className="embryology-copy">
          <span className="section-label">Центр эмбриологии</span>
          <h2 className="section-title">Святилище новой жизни</h2>
          <p className="section-lead">
            Наша эмбриологическая зона климат-контролируема, непрерывно мониторится и
            создана как тихая обсерватория — где к каждой клетке относятся с уважением.
          </p>
          <ul className="embryology-list">
            <li>Стандарты чистых помещений</li>
            <li>Круглосуточный мониторинг среды</li>
            <li>Двойная идентификация образцов</li>
            <li>Криохранилище с резервными системами</li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
