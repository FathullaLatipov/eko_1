import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Reveal } from './Reveal'
import { useI18n } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/translations'
import './Reviews.css'

export type Review = {
  id: string
  name: string
  city: string
  rating: number
  text: string
  date: string
  seed?: 1 | 2 | 3
}

const STORAGE_KEY = 'turkmed-reviews-v1'

const seedReviews: Review[] = [
  { id: 'seed-1', name: '', city: '', rating: 5, text: '', date: '2026-03-12', seed: 1 },
  { id: 'seed-2', name: '', city: '', rating: 5, text: '', date: '2026-02-28', seed: 2 },
  { id: 'seed-3', name: '', city: '', rating: 5, text: '', date: '2026-01-19', seed: 3 },
]

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedReviews
    const parsed = JSON.parse(raw) as Review[]
    if (!Array.isArray(parsed)) return seedReviews
    const seedIds = new Set(seedReviews.map((r) => r.id))
    const userOnes = parsed.filter((r) => r && r.id && !seedIds.has(r.id) && !r.seed)
    return [...userOnes, ...seedReviews]
  } catch {
    return seedReviews
  }
}

function saveUserReviews(all: Review[]) {
  const seedIds = new Set(seedReviews.map((r) => r.id))
  const userOnes = all.filter((r) => !seedIds.has(r.id) && !r.seed)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnes))
}

function Stars({
  value,
  onChange,
  interactive = false,
  labelOf,
}: {
  value: number
  onChange?: (n: number) => void
  interactive?: boolean
  labelOf: (n: number) => string
}) {
  return (
    <div className={`review-stars${interactive ? ' is-interactive' : ''}`} role={interactive ? 'radiogroup' : undefined}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={n <= value ? 'is-on' : ''}
          aria-label={labelOf(n)}
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

const localeMap: Record<Lang, string> = {
  ru: 'ru-RU',
  uz: 'uz-UZ',
  tr: 'tr-TR',
  en: 'en-US',
}

function formatDate(iso: string, lang: Lang) {
  try {
    return new Date(iso).toLocaleDateString(localeMap[lang], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function Reviews() {
  const { t, lang } = useI18n()
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

  const displayReviews = useMemo(
    () =>
      reviews.map((r) => {
        if (!r.seed) return r
        return {
          ...r,
          name: t(`reviews.seed${r.seed}.name`),
          city: t(`reviews.seed${r.seed}.city`),
          text: t(`reviews.seed${r.seed}.text`),
        }
      }),
    [reviews, t],
  )

  const average = useMemo(() => {
    if (!reviews.length) return 0
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / reviews.length) * 10) / 10
  }, [reviews])

  const starLabel = (n: number) => t('reviews.starsOf', { n: String(n) })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmedName = name.trim()
    const trimmedText = text.trim()
    if (trimmedName.length < 2 || trimmedText.length < 10 || rating < 1) {
      setError(t('reviews.error'))
      return
    }

    const next: Review = {
      id: `user-${Date.now()}`,
      name: trimmedName,
      city: city.trim() || '—',
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
          <span className="section-label">{t('reviews.label')}</span>
          <h2 className="section-title">{t('reviews.title')}</h2>
          <p className="section-lead">{t('reviews.lead')}</p>
        </Reveal>

        <div className="reviews-layout">
          <Reveal delay={0.08} className="reviews-form-wrap glass-plaque">
            <div className="reviews-form-head">
              <h3>{t('reviews.formTitle')}</h3>
              <p>{t('reviews.formHint')}</p>
            </div>

            {sent ? (
              <div className="reviews-success">
                <div className="reviews-success-orb" aria-hidden />
                <strong>{t('reviews.thanks')}</strong>
                <span>{t('reviews.thanksSub')}</span>
              </div>
            ) : (
              <form className="reviews-form" onSubmit={onSubmit}>
                <label>
                  {t('reviews.name')}
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('reviews.phName')}
                    required
                    maxLength={60}
                    data-cursor
                  />
                </label>
                <label>
                  {t('reviews.city')}
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t('reviews.phCity')}
                    maxLength={40}
                    data-cursor
                  />
                </label>
                <div className="reviews-rating-field">
                  <span>{t('reviews.rating')}</span>
                  <Stars value={rating} onChange={setRating} interactive labelOf={starLabel} />
                </div>
                <label>
                  {t('reviews.comment')}
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    placeholder={t('reviews.phText')}
                    required
                    maxLength={600}
                    data-cursor
                  />
                </label>
                {error && <p className="reviews-error">{error}</p>}
                <button type="submit" className="btn btn-coral" data-cursor>
                  {t('reviews.submit')}
                </button>
              </form>
            )}
          </Reveal>

          <div className="reviews-feed">
            <Reveal delay={0.12} className="reviews-summary glass-plaque">
              <div>
                <strong>{average.toFixed(1)}</strong>
                <Stars value={Math.round(average)} labelOf={starLabel} />
              </div>
              <p>
                {reviews.length} {t('reviews.count')}
              </p>
            </Reveal>

            <div className="reviews-list">
              {displayReviews.map((r, i) => (
                <Reveal key={r.id} delay={Math.min(0.05 * i, 0.3)} className="review-card glass-plaque">
                  <div className="review-card-top">
                    <div className="review-avatar" aria-hidden>
                      {r.name.trim().charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong>{r.name}</strong>
                      <span>
                        {r.city} · {formatDate(r.date, lang)}
                      </span>
                    </div>
                    <Stars value={r.rating} labelOf={starLabel} />
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
