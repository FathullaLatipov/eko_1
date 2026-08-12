import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
  hue: number
}

export function LifeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let raf = 0
    let particles: Particle[] = []
    let w = 0
    let h = 0
    let visible = true
    let last = 0
    const fpsInterval = 1000 / 28

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(28, Math.floor((w * h) / 42000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: Math.random() * 0.28 + 0.12,
        hue: Math.random() > 0.8 ? 355 : 190,
      }))
    }

    const drawEmbryo = (cx: number, cy: number, scale: number, phase: number) => {
      for (let i = 0; i < 3; i++) {
        const pulse = (24 + i * 16) * scale + Math.sin(phase + i * 0.7) * 2 * scale
        ctx.strokeStyle = `rgba(16,168,201,${0.24 - i * 0.05})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.fillStyle = 'rgba(16,168,201,0.26)'
      ctx.beginPath()
      ctx.arc(cx, cy, 5 * scale + Math.sin(phase * 1.4) * 0.8, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawDna = (dnaX: number, amp: number, step: number, phase: number) => {
      ctx.lineWidth = 1.2
      ctx.beginPath()
      for (let y = -20; y < h + 20; y += 6) {
        const x = dnaX + Math.sin(y * 0.018 + phase) * amp
        if (y === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(16,168,201,0.28)'
      ctx.stroke()

      ctx.beginPath()
      for (let y = -20; y < h + 20; y += 6) {
        const x = dnaX + Math.sin(y * 0.018 + phase + Math.PI) * amp
        if (y === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(232,70,82,0.22)'
      ctx.stroke()

      for (let y = 0; y < h; y += step) {
        const wave = Math.sin(y * 0.018 + phase) * amp
        const wave2 = Math.sin(y * 0.018 + phase + Math.PI) * amp
        ctx.strokeStyle = 'rgba(16,168,201,0.16)'
        ctx.beginPath()
        ctx.moveTo(dnaX + wave, y)
        ctx.lineTo(dnaX + wave2, y)
        ctx.stroke()
      }
    }

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      if (now - last < fpsInterval) return
      last = now

      ctx.clearRect(0, 0, w, h)
      const t = now * 0.00016

      for (let i = 0; i < 2; i++) {
        const ox = w * (0.25 + i * 0.45) + Math.sin(t + i) * 30
        const oy = h * (0.35 + (i % 2) * 0.2) + Math.cos(t * 1.1 + i) * 22
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 150)
        grad.addColorStop(0, i % 2 === 0 ? 'rgba(16,168,201,0.07)' : 'rgba(232,70,82,0.045)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(ox, oy, 150, 0, Math.PI * 2)
        ctx.fill()
      }

      drawDna(w * 0.88, Math.min(32, w * 0.03), 22, t * 6)
      drawEmbryo(w * 0.14, h * 0.68, 0.9, t * 7)
      if (w > 900) drawEmbryo(w * 0.72, h * 0.22, 0.55, t * 6 + 2)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.fillStyle =
          p.hue > 300 ? `rgba(232,70,82,${p.a})` : `rgba(16,168,201,${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0.01 },
    )
    io.observe(canvas)

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="life-canvas" aria-hidden />
}
