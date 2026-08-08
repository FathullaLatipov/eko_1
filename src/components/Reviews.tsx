import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Reveal } from './Reveal'
import './Reviews.css'

export type Review = {
  id: string
  name: string
  city: string
  rating: number
  text: string
  date: string
}

const STORAGE_KEY = 'turkmed-reviews-v1'

const seedReviews: Review[] = [
  {
    id: 'seed-1',
    name: 'Нилуфар А.',
    city: 'Ташкент',
    rating: 5,
    text: 'Очень тёплая команда и понятные объяснения на каждом этапе. Чувствовали заботу с первой консультации.',
    date: '2026-03-12',
  },
  {
    id: 'seed-2',
    name: 'Азиз и Мадина',
    city: 'Самарканд',
    rating: 5,
    text: 'Приехали из другого города — координатор всё организовала. Эмбриологи из Турции внушают настоящее доверие.',
    date: '2026-02-28',
  },
  {
    id: 'seed-3',
    name: 'Дильноза К.',
    city: 'Ташкент',
    rating: 5,
    text: 'Честные ответы без давления и внимательное отношение. Рекомендую TürkMed всем, кто ищет спокойный путь.',
    date: '2026-01-19',
  },
]

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedReviews
    const parsed = JSON.parse(raw) as Review[]
    if (!Array.isArray(parsed)) return seedReviews
    const seedIds = new Set(seedReviews.map((r) => r.id))
    const userOnes = parsed.filter((r) => r && r.id && !seedIds.has(r.id))
    return [...userOnes, ...seedReviews]
  } catch {
    return seedReviews
  }
}

function saveUserReviews(all: Review[]) {
  const seedIds = new Set(seedReviews.map((r) => r.id))
  const userOnes = all.filter((r) => !seedIds.has(r.id))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnes))
}

function Stars({
  value,
  onChange,
  interactive = false,
}: {
  value: number
  onChange?: (n: number) => void
  interactive?: boolean
}) {
  return (
    <div className={`review-stars${interactive ? ' is-interactive' : ''}`} role={interactive ? 'radiogroup' : undefined}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={n <= value ? 'is-on' : ''}
          aria-label={`${n} из 5`}
          disabled={!interactive}
          onClick={() => onChange?.(n)}
          data-cursor={interactive ? true : undefined}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setReviews(loadReviews())
  }, [])

  const average = useMemo(() => {
    if (!reviews.length) return 0
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / reviews.length) * 10) / 10
  }, [reviews])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmedName = name.trim()
    const trimmedText = text.trim()
    if (trimmedName.length < 2) {
      setError('Пожалуйста, укажите имя.')
      return
    }
    if (trimmedText.length < 10) {
      setError('Напишите чуть подробнее — хотя бы несколько слов.')
      return
    }
    if (rating < 1) {
      setError('Выберите оценку.')
      return
    }

    const next: Review = {
      id: `user-${Date.now()}`,
      name: trimmedName,
      city: city.trim() || 'Узбекистан',
      rating,
      text: trimmedText,
      date: new Date().toISOString().slice(0, 10),
    }

    const updated = [next, ...reviews]
    setReviews(updated)
    saveUserReviews(updated)
    setName('')
    setCity('')
    setText('')
    setRating(5)
    setSent(true)
    window.setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <Reveal>
          <span className="section-label">Отзывы и комментарии</span>
          <h2 className="section-title">Поделитесь своим опытом</h2>
          <p className="section-lead">
            Ваши слова помогают другим семьям сделать первый шаг с уверенностью.
          </p>
        </Reveal>

        <div className="reviews-layout">
          <Reveal delay={0.08} className="reviews-form-wrap glass">
            <div className="reviews-form-head">
              <h3>Оставить отзыв</h3>
              <p>Имя, оценка и короткий комментарий — этого достаточно.</p>
            </div>

            {sent ? (
              <div className="reviews-success">
                <div className="reviews-success-orb" aria-hidden />
                <strong>Спасибо за отзыв!</strong>
                <span>Ваш комментарий уже на странице.</span>
              </div>
            ) : (
              <form className="reviews-form" onSubmit={onSubmit}>
                <label>
                  Имя
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться?"
                    required
                    maxLength={60}
                    data-cursor
                  />
                </label>
                <label>
                  Город
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ташкент"
                    maxLength={40}
                    data-cursor
                  />
                </label>
                <div className="reviews-rating-field">
                  <span>Оценка</span>
                  <Stars value={rating} onChange={setRating} interactive />
                </div>
                <label>
                  Комментарий
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    placeholder="Расскажите, что вам понравилось…"
                    required
                    maxLength={600}
                    data-cursor
                  />
                </label>
                {error && <p className="reviews-error">{error}</p>}
                <button type="submit" className="btn btn-coral" data-cursor>
                  Отправить отзыв
                </button>
              </form>
            )}
          </Reveal>

          <div className="reviews-feed">
            <Reveal delay={0.12} className="reviews-summary glass">
              <div>
                <strong>{average.toFixed(1)}</strong>
                <Stars value={Math.round(average)} />
              </div>
              <p>
                {reviews.length}{' '}
                {reviews.length === 1 ? 'отзыв' : reviews.length < 5 ? 'отзыва' : 'отзывов'}
                {' '}на сайте
              </p>
            </Reveal>

            <div className="reviews-list">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={Math.min(0.05 * i, 0.3)} className="review-card">
                  <div className="review-card-top">
                    <div className="review-avatar" aria-hidden>
                      {r.name.trim().charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong>{r.name}</strong>
                      <span>
                        {r.city} · {formatDate(r.date)}
                      </span>
                    </div>
                    <Stars value={r.rating} />
                  </div>
                  <p>«{r.text}»</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
