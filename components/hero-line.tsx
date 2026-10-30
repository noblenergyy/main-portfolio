"use client"

import { useEffect, useRef, useState } from "react"
import { buildShape, heroRoute, sketchRoute, type Box } from "@/lib/hero-line-geometry"

/**
 * Decorative calligraphic line that loops through the hero, behind the content.
 *
 * The line is built in real pixels from the hero's measured size (so it is never
 * stretched), and drawn as a filled outline whose width swells on tight curves
 * and tapers on straighter runs. It reveals itself once, after hydration, via a
 * mask, so the draw-in doesn't compete with page load.
 *
 * On laptops and up it follows a long hand-sketched route across the whole hero,
 * drawn above the project screenshots (but below the text) so no part of it is
 * hidden and it reads as one stroke from a single start. On narrower screens the
 * route is computed from the headline and the "Start a project" button, so the
 * line wraps the headline and ends at the button.
 */

/** Matches the hero's lg breakpoint, where the screenshots sit beside the text. */
const WIDE_MIN = 1024

export function HeroLine() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [shape, setShape] = useState<{ outline: string; centre: string; w: number; h: number; maxW: number } | null>(null)
  const [revealing, setRevealing] = useState(true)

  useEffect(() => {
    const svg = svgRef.current
    const hero = svg?.parentElement
    if (!svg || !hero) return

    const update = () => {
      const box = hero.getBoundingClientRect()
      const w = box.width
      const h = box.height
      if (w === 0) return
      const title = hero.querySelector("[data-hero-title]")
      const cta = hero.querySelector("[data-hero-cta]")
      if (!title || !cta) return
      const wide = w >= WIDE_MIN
      const maxW = wide ? 7 : 5
      const rel = (r: DOMRect): Box => ({
        x1: r.left - box.left,
        y1: r.top - box.top,
        x2: r.right - box.left,
        y2: r.bottom - box.top,
      })
      const path = wide
        ? sketchRoute(w, h)
        : heroRoute(w, rel(title.getBoundingClientRect()), rel(cta.getBoundingClientRect()))
      setShape({ ...buildShape(path, 1, maxW), w, h, maxW })
    }

    // Start once the hero text has finished fading in (AnimateOnScroll, 700ms):
    // the headline is in its final position, and page load is out of the way.
    let ready = false
    const ro = new ResizeObserver(() => ready && update())
    const start = window.setTimeout(() => {
      ready = true
      update()
      ro.observe(hero)
      // Fonts change the headline's size once loaded; re-measure then.
      document.fonts?.ready.then(update)
    }, 750)
    return () => {
      window.clearTimeout(start)
      ro.disconnect()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full text-foreground"
      viewBox={shape ? `0 0 ${shape.w} ${shape.h}` : undefined}
      fill="none"
    >
      {shape && (
        <>
          <defs>
            <mask id="hero-line-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width={shape.w} height={shape.h}>
              <path
                d={shape.centre}
                pathLength={1}
                stroke="white"
                strokeWidth={shape.maxW + 6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={revealing ? "draw-line" : undefined}
                onAnimationEnd={() => setRevealing(false)}
              />
            </mask>
          </defs>
          <path d={shape.outline} fill="currentColor" mask="url(#hero-line-reveal)" />
        </>
      )}
    </svg>
  )
}
