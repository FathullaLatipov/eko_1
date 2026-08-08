import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { Loader } from './components/Loader'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { WhyChoose } from './components/WhyChoose'
import { Timeline } from './components/Timeline'
import { Process } from './components/Process'
import { Doctors } from './components/Doctors'
import { Technology } from './components/Technology'
import { Embryology } from './components/Embryology'
import { Stories } from './components/Stories'
import { Statistics } from './components/Statistics'
import { International } from './components/International'
import { Testimonials } from './components/Testimonials'
import { Reviews } from './components/Reviews'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import './components/sections.css'

export default function App() {
  const [loading, setLoading] = useState(true)
  const onDone = useCallback(() => setLoading(false), [])

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
      return
    }
    document.body.style.overflow = ''

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const id = target.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -40 })
    }

    const onMagneticMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('.magnetic') as HTMLElement | null
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
    }
    const onMagneticLeave = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('.magnetic') as HTMLElement | null
      if (el) el.style.transform = 'translate(0, 0)'
    }

    document.addEventListener('click', onAnchorClick)
    document.addEventListener('mousemove', onMagneticMove)
    document.addEventListener('mouseleave', onMagneticLeave, true)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onAnchorClick)
      document.removeEventListener('mousemove', onMagneticMove)
      document.removeEventListener('mouseleave', onMagneticLeave, true)
      lenis.destroy()
    }
  }, [loading])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={onDone} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <WhyChoose />
            <Timeline />
            <Process />
            <Doctors />
            <Technology />
            <Embryology />
            <Stories />
            <Statistics />
            <International />
            <Testimonials />
            <Reviews />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
