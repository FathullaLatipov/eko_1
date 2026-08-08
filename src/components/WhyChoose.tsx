import { Reveal } from './Reveal'

const reasons = [
  {
    title: 'Турецкие эмбриологи-эксперты',
    text: 'Эмбриологи из Турции с опытом более 17 лет сопровождают каждый этап лабораторной работы.',
    icon: '01',
  },
  {
    title: 'Врачи Узбекистана',
    text: 'Рядом с вами — наши отечественные врачи: репродуктологи, гинекологи и координатор ЭКО.',
    icon: '02',
  },
  {
    title: 'Персональные протоколы ЭКО',
    text: 'Современные методики и оборудование — мягко адаптированные под уникальный путь каждого пациента.',
    icon: '03',
  },
  {
    title: 'Полное сопровождение',
    text: 'От первой консультации до переноса эмбриона команда делает путь ясным и спокойным.',
    icon: '04',
  },
]

export function WhyChoose() {
  return (
    <section className="section why">
      <div className="container">
        <Reveal>
          <span className="section-label">Почему мы</span>
          <h2 className="section-title">Забота, построенная вокруг надежды</h2>
          <p className="section-lead">
            Премиальная медицина без холодности. Инновации — без давления.
          </p>
        </Reveal>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08} className="why-card">
              <span className="why-num">{r.icon}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <div className="why-line" aria-hidden />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
