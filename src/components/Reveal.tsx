import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: boolean
}

export function Reveal({ children, className, delay = 0, y = 36, blur = false }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : undefined
      }
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
