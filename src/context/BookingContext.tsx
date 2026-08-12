import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type BookingCtx = {
  isOpen: boolean
  doctorId: string
  doctorName: string
  openBooking: (doctorId?: string, doctorName?: string) => void
  closeBooking: () => void
}

const Ctx = createContext<BookingCtx | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [doctorId, setDoctorId] = useState('')
  const [doctorName, setDoctorName] = useState('')

  const openBooking = useCallback((id = '', name = '') => {
    setDoctorId(id)
    setDoctorName(name)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeBooking = useCallback(() => {
    setIsOpen(false)
    setDoctorId('')
    setDoctorName('')
    document.body.style.overflow = ''
  }, [])

  const value = useMemo(
    () => ({ isOpen, doctorId, doctorName, openBooking, closeBooking }),
    [isOpen, doctorId, doctorName, openBooking, closeBooking],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useBooking() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
