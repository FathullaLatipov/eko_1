import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { type Lang, translate } from './translations'

type I18nCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, vars?: Record<string, string>) => string
}

const Ctx = createContext<I18nCtx | null>(null)
const STORAGE = 'turkmed-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE) as Lang | null
    if (saved && ['ru', 'uz', 'tr', 'en'].includes(saved)) {
      setLangState(saved)
      document.documentElement.lang = saved
    }
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem(STORAGE, l)
    document.documentElement.lang = l
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => translate(lang, key, vars),
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
