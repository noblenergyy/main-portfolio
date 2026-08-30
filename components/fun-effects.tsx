"use client"

import { useEffect, useRef, useState } from "react"

type Spark = {
  id: number
  x: number
  y: number
  dx: number
  dy: number
}

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

export function FunEffects() {
  const [sparks, setSparks] = useState<Spark[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const sparkId = useRef(0)
  const konamiIndex = useRef(0)
  const reducedMotion = useRef(false)

  // Scroll progress bar
  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let ticking = false
    const update = () => {
      ticking = false
      const el = progressRef.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Click sparks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (reducedMotion.current) return
      const burst: Spark[] = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.6
        const dist = 24 + Math.random() * 22
        return {
          id: sparkId.current++,
          x: e.clientX,
          y: e.clientY,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
        }
      })
      setSparks((prev) => [...prev.slice(-30), ...burst])
      window.setTimeout(() => {
        setSparks((prev) => prev.filter((s) => !burst.some((b) => b.id === s.id)))
      }, 600)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  // Greeting for anyone who opens dev tools
  useEffect(() => {
    const banner = [
      "╔══════════════════════════════════════════════╗",
      "║   N O V E R S T O R M                        ║",
      "║   Tech Solutions Ltd                         ║",
      "╚══════════════════════════════════════════════╝",
    ].join("\n")
    // eslint-disable-next-line no-console
    console.log(`%c${banner}`, "color:#ff6b47;font-family:monospace")
    // eslint-disable-next-line no-console
    console.log(
      "%cYou opened the console. We like you already.\n%cWe build reliable, fast, scalable web apps. Let's talk: noblenergyy@gmail.com\nPsst: press ` on the site for a terminal, and try the Konami code.",
      "color:#ff6b47;font-size:14px;font-weight:bold",
      "color:#888;font-size:12px",
    )
  }, [])

  // Konami code
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === KONAMI[konamiIndex.current]) {
        konamiIndex.current++
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0
          const active = document.documentElement.classList.toggle("konami-mode")
          setToast(active ? "> CHEAT MODE UNLOCKED_" : "> cheat mode disabled_")
          window.setTimeout(() => setToast(null), 4000)
        }
      } else {
        konamiIndex.current = key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-emerald-500"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      {sparks.map((s) => (
        <span
          key={s.id}
          aria-hidden="true"
          className="click-spark"
          style={
            {
              left: s.x,
              top: s.y,
              "--spark-x": `${s.dx}px`,
              "--spark-y": `${s.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
      {toast && (
        <div role="status" className="konami-toast">
          {toast}
        </div>
      )}
    </>
  )
}
