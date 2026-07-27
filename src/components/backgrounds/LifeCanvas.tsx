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
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let particles: Particle[] = []
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(55, Math.floor((w * h) / 22000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        a: Math.random() * 0.35 + 0.15,
        hue: Math.random() > 0.8 ? 355 : 190,
      }))
    }

    const drawEmbryo = (cx: number, cy: number, scale: number, phase: number) => {
      for (let i = 0; i < 4; i++) {
        const pulse = (24 + i * 16) * scale + Math.sin(phase + i * 0.7) * 2.5 * scale
        ctx.strokeStyle = `rgba(16,168,201,${0.28 - i * 0.045})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2)
        ctx.stroke()
      }
      const cells = 3
      for (let i = 0; i < cells; i++) {
        const ang = (i / cells) * Math.PI * 2 + phase * 0.25
        const dist = 8 * scale
        ctx.fillStyle = 'rgba(232,70,82,0.22)'
        ctx.beginPath()
        ctx.arc(cx + Math.cos(ang) * dist, cy + Math.sin(ang) * dist, 4 * scale, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = 'rgba(16,168,201,0.28)'
      ctx.beginPath()
      ctx.arc(cx, cy, 5 * scale + Math.sin(phase * 1.4) * 1, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawDna = (dnaX: number, amp: number, step: number, phase: number) => {
      ctx.lineWidth = 1.5
      ctx.beginPath()
      for (let y = -20; y < h + 20; y += 4) {
        const x = dnaX + Math.sin(y * 0.018 + phase) * amp
        if (y === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(16,168,201,0.32)'
      ctx.stroke()

      ctx.beginPath()
      for (let y = -20; y < h + 20; y += 4) {
        const x = dnaX + Math.sin(y * 0.018 + phase + Math.PI) * amp
        if (y === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(232,70,82,0.26)'
      ctx.stroke()

      for (let y = 0; y < h; y += step) {
        const wave = Math.sin(y * 0.018 + phase) * amp
        const wave2 = Math.sin(y * 0.018 + phase + Math.PI) * amp
        ctx.strokeStyle = 'rgba(16,168,201,0.2)'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(dnaX + wave, y)
        ctx.lineTo(dnaX + wave2, y)
        ctx.stroke()

        ctx.fillStyle = 'rgba(16,168,201,0.45)'
        ctx.beginPath()
        ctx.arc(dnaX + wave, y, 2.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(232,70,82,0.4)'
        ctx.beginPath()
        ctx.arc(dnaX + wave2, y, 2.4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const t = performance.now() * 0.00016

      // soft orbs — fewer, softer
      for (let i = 0; i < 3; i++) {
        const ox = w * (0.2 + i * 0.3) + Math.sin(t + i) * 40
        const oy = h * (0.35 + (i % 2) * 0.2) + Math.cos(t * 1.1 + i) * 30
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 180)
        grad.addColorStop(0, i % 2 === 0 ? 'rgba(16,168,201,0.08)' : 'rgba(232,70,82,0.05)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(ox, oy, 180, 0, Math.PI * 2)
        ctx.fill()
      }

      // One DNA helix on the right edge only
      drawDna(w * 0.88, Math.min(36, w * 0.032), 18, t * 6)

      // Two embryos — sides only, away from center faces/text
      drawEmbryo(w * 0.14, h * 0.68, 0.95, t * 7)
      if (w > 800) {
        drawEmbryo(w * 0.72, h * 0.22, 0.6, t * 6 + 2)
      }

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        // keep center clearer
        const dx = p.x / w - 0.5
        const dy = p.y / h - 0.45
        const centerFade = Math.min(1, Math.sqrt(dx * dx + dy * dy) * 2.2)
        ctx.beginPath()
        ctx.fillStyle =
          p.hue > 300
            ? `rgba(232,70,82,${p.a * centerFade})`
            : `rgba(16,168,201,${p.a * centerFade})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="life-canvas" aria-hidden />
}
