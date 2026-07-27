import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { clinic } from '../data/clinic'

type Props = {
  onDone: () => void
}

export function Loader({ onDone }: Props) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const id = window.setInterval(() => {
      frame += 1
      setProgress((p) => {
        const next = Math.min(100, p + (frame < 12 ? 7 : 3))
        if (next >= 100) {
          window.clearInterval(id)
          window.setTimeout(onDone, 420)
        }
        return next
      })
    }, 60)
    return () => window.clearInterval(id)
  }, [onDone])

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="loader-logo-wrap">
        <img src={clinic.logoMark} alt="" className="loader-logo" />
      </div>
      <div className="loader-text">{clinic.name}</div>
      <div className="loader-bar" aria-hidden>
        <i style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  )
}
