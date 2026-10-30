"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"

/** Total storm length; rain fades in over the first second and out over the last two. */
const STORM_MS = 9000
const FADE_IN_MS = 1000
const FADE_OUT_MS = 2000
/** When each lightning strike lands, in ms from the start. */
const STRIKES_MS = [900, 3800, 6300]

type Drop = { x: number; y: number; len: number; speed: number }

/** A jagged bolt from somewhere along the top edge, with a couple of short branches. */
function makeBolt(width: number, height: number) {
  const segments: string[] = []
  const startX = width * (0.2 + Math.random() * 0.6)
  const endY = height * (0.55 + Math.random() * 0.25)
  let x = startX
  let y = 0
  let d = `M ${x} ${y}`
  while (y < endY) {
    x += (Math.random() - 0.5) * 70
    y += 20 + Math.random() * 40
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
    if (Math.random() < 0.18) {
      // Branch: a short fork that fizzles out.
      let bx = x
      let by = y
      let b = `M ${bx} ${by}`
      const dir = Math.random() < 0.5 ? -1 : 1
      for (let i = 0; i < 4; i++) {
        bx += dir * (10 + Math.random() * 30)
        by += 15 + Math.random() * 25
        b += ` L ${bx.toFixed(1)} ${by.toFixed(1)}`
      }
      segments.push(b)
    }
  }
  return [d, ...segments]
}

function StormOverlay({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [flashKey, setFlashKey] = useState(0)
  const [bolt, setBolt] = useState<{ key: number; paths: string[] } | null>(null)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const timers: number[] = []

    if (reduced) {
      // No rain or moving bolts: one soft flash, then done.
      setFlashKey(1)
      timers.push(window.setTimeout(onDone, 1200))
      return () => timers.forEach(clearTimeout)
    }

    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const dark = document.documentElement.classList.contains("dark")
    const color = dark ? "190, 205, 255" : "70, 90, 150"
    const wind = 0.22 // horizontal drift per unit of fall
    const count = Math.round(Math.min(window.innerWidth, 1800) / 5)
    const drops: Drop[] = Array.from({ length: count }, () => ({
      x: Math.random() * (window.innerWidth + 200) - 100,
      y: Math.random() * window.innerHeight,
      len: 12 + Math.random() * 22,
      speed: 14 + Math.random() * 12,
    }))

    const start = performance.now()
    let frame = 0
    const draw = (now: number) => {
      const t = now - start
      const intensity =
        t < FADE_IN_MS ? t / FADE_IN_MS : t > STORM_MS - FADE_OUT_MS ? Math.max(0, (STORM_MS - t) / FADE_OUT_MS) : 1
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.lineWidth = 1
      ctx.lineCap = "round"
      const visible = Math.floor(drops.length * intensity)
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i]
        d.y += d.speed
        d.x += d.speed * wind
        if (d.y > window.innerHeight) {
          d.y = -d.len
          d.x = Math.random() * (window.innerWidth + 200) - 200
        }
        if (i >= visible) continue
        ctx.strokeStyle = `rgba(${color}, ${0.18 + (d.len / 34) * 0.32})`
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x + d.len * wind, d.y + d.len)
        ctx.stroke()
      }
      if (t < STORM_MS) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    STRIKES_MS.forEach((ms, i) => {
      timers.push(
        window.setTimeout(() => {
          setFlashKey(i + 1)
          setBolt({ key: i + 1, paths: makeBolt(window.innerWidth, window.innerHeight) })
        }, ms),
      )
    })
    timers.push(window.setTimeout(() => setFading(true), STORM_MS - FADE_OUT_MS))
    timers.push(window.setTimeout(onDone, STORM_MS))

    return () => {
      cancelAnimationFrame(frame)
      timers.forEach(clearTimeout)
      window.removeEventListener("resize", resize)
    }
  }, [onDone])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      {/* Darkened sky */}
      <div className={`storm-sky absolute inset-0 ${fading ? "storm-sky-out" : ""}`} />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {bolt && (
        <svg key={bolt.key} className="storm-bolt absolute inset-0 h-full w-full" fill="none">
          {bolt.paths.map((d, i) => (
            <g key={i}>
              <path
                d={d}
                strokeWidth={i === 0 ? 9 : 5}
                strokeLinejoin="round"
                style={{ stroke: "rgb(var(--accent-300))", opacity: 0.45, filter: "blur(6px)" }}
              />
              <path d={d} stroke="white" strokeWidth={i === 0 ? 2.2 : 1.2} strokeLinejoin="round" />
            </g>
          ))}
        </svg>
      )}
      {flashKey > 0 && <div key={flashKey} className="storm-flash absolute inset-0" />}
    </div>
  )
}

/** Header button that starts a short storm over the page. */
export function StormButton() {
  const [active, setActive] = useState(false)
  const stop = useCallback(() => setActive(false), [])

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setActive(true)}
        disabled={active}
        title="Summon a storm"
        className="px-4"
      >
        Storm
      </Button>
      {/* Portal to <body>: the header's backdrop blur would otherwise trap this fixed overlay inside the header. */}
      {active && createPortal(<StormOverlay onDone={stop} />, document.body)}
    </>
  )
}
