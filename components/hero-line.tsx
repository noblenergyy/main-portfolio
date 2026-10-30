"use client"

import { useEffect, useRef, useState } from "react"
import { buildShape, heroRoute, seededRandom, sketchRoute, type Box } from "@/lib/hero-line-geometry"
import { DrawnPath, type StrokeEdges } from "@/components/drawn-path"

/**
 * Decorative calligraphic line that loops through the hero, behind everything
 * in it (text and screenshots alike).
 *
 * The line is built in real pixels from the hero's measured size (so it is never
 * stretched), as a filled outline whose width swells on tight curves and tapers
 * on straighter runs. It draws itself once from a single starting point, after
 * the hero text has settled.
 *
 * On laptops and up it is the long hand-sketched line across the whole hero. On
 * narrower screens it wraps the headline and ends at the "Start a project"
 * button. Either way the shape varies a little on every visit.
 */

/** Matches the hero's lg breakpoint, where the screenshots sit beside the text. */
const WIDE_MIN = 1024

export function HeroLine() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [shape, setShape] = useState<{ edges: StrokeEdges; w: number; h: number } | null>(null)
  // A new shape on every visit, kept stable while the page is open (e.g. on resize).
  const seed = useRef(Math.floor(Math.random() * 2 ** 32))

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
      const rel = (r: DOMRect): Box => ({
        x1: r.left - box.left,
        y1: r.top - box.top,
        x2: r.right - box.left,
        y2: r.bottom - box.top,
      })
      const rand = seededRandom(seed.current)
      const wide = w >= WIDE_MIN
      const route = wide
        ? sketchRoute(w, h, rand)
        : heroRoute(w, rel(title.getBoundingClientRect()), rel(cta.getBoundingClientRect()), rand)
      setShape({ edges: buildShape(route, 1, wide ? 7 : 5), w, h })
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
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-foreground"
      viewBox={shape ? `0 0 ${shape.w} ${shape.h}` : undefined}
      fill="none"
    >
      <DrawnPath edges={shape?.edges ?? null} play={!!shape} />
    </svg>
  )
}
