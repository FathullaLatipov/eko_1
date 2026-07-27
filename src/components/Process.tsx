import { Reveal } from './Reveal'

const phases = [
  {
    title: 'Знакомство и диагностика',
    text: 'Гормональные анализы, УЗИ, генетические данные и образ жизни — всё объясняется простым языком.',
  },
  {
    title: 'Стимуляция и мониторинг',
    text: 'Точные протоколы медикаментов и мягкий контроль, чтобы вы чувствовали ясность, а не спешку.',
  },
  {
    title: 'Лабораторная точность',
    text: 'ICSI, культивирование до бластоцисты, опции PGT и бережный отбор эмбрионов.',
  },
  {
    title: 'Перенос и послеоперационный уход',
    text: 'Спокойный перенос эмбриона и непрерывная поддержка до теста на беременность — и дальше.',
  },
]

export function Process() {
  return (
    <section className="section process">
      <div className="container process-grid">
        <Reveal className="process-sticky">
          <span className="section-label">Процесс ЭКО</span>
          <h2 className="section-title">Метод, отточенный ради чуда</h2>
          <p className="section-lead">
            Этапы, основанные на доказательной медицине, усиленные эмпатией и технологиями,
            которые не теряют человеческую историю.
          </p>
        </Reveal>
        <div className="process-list">
          {phases.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="process-item">
              <span>0{i + 1}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
