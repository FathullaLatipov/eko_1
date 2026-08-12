import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { Loader } from './components/Loader'
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
import { BookingModal } from './components/BookingModal'
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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: reduceMotion ? 0.6 : 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
      touchMultiplier: 1.4,
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

    document.addEventListener('click', onAnchorClick)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onAnchorClick)
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
          <BookingModal />
        </>
      )}
    </>
  )
}
