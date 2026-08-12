import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: boolean
}

export function Reveal({ children, className, delay = 0, y = 28, blur = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px', amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        const el = ref.current
        if (!el || !inView) return
        el.style.transform = 'none'
        if (blur) el.style.filter = 'none'
      }}
    >
      {children}
    </motion.div>
  )
}
