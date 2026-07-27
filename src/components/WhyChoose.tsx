import { Reveal } from './Reveal'

const reasons = [
  {
    title: 'Турецкие эмбриологи-эксперты',
    text: 'Эмбриологи из Турции с опытом более 17 лет сопровождают каждый этап лабораторной работы.',
    icon: '01',
  },
  {
    title: 'Персональные протоколы ЭКО',
    text: 'Современные методики и оборудование — мягко адаптированные под уникальный путь каждого пациента.',
    icon: '02',
  },
  {
    title: 'Полное сопровождение ЭКО',
    text: 'От первой консультации до переноса эмбриона координатор делает путь ясным и спокойным.',
    icon: '03',
  },
  {
    title: 'Доверие в Ташкенте',
    text: 'Клиника, сосредоточенная на репродуктивном здоровье и результатах, которые дают надежду.',
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
