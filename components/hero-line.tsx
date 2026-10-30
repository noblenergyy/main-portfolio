"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Decorative calligraphic line that loops through the hero, behind the content.
 *
 * The line is built in real pixels from the hero's measured size (so it is never
 * stretched), and drawn as a filled outline whose width swells on tight curves
 * and tapers on straighter runs. It reveals itself once, after hydration, via a
 * mask, so the draw-in doesn't compete with page load.
 *
 * The route is computed from the headline and the "Start a project" button, so
 * on every screen size the line starts in one place, wraps the headline and
 * ends at the button.
 */

type Pt = { x: number; y: number }
/** A cubic Bézier segment: start, control 1, control 2, end. */
type Seg = [Pt, Pt, Pt, Pt]

/** One continuous line: loop around the headline, then sweep down to finish at the CTA button. */
function route(w: number, title: DOMRect, cta: DOMRect, origin: DOMRect): Seg[] {
  const t = {
    x1: title.left - origin.left,
    y1: title.top - origin.top,
    x2: title.right - origin.left,
    y2: title.bottom - origin.top,
  }
  const b = {
    x1: cta.left - origin.left,
    y1: cta.top - origin.top,
    x2: cta.right - origin.left,
    y2: cta.bottom - origin.top,
  }
  const th = t.y2 - t.y1
  // On phones the headline fills the width, so the loop hugs the screen edge.
  // On wider screens it swings just past the headline column, staying clear of
  // the project screenshots so the line never disappears behind anything.
  const right = Math.min(w - 6, t.x2 + 30)
  const tw = right - t.x1
  const at = (f: number) => t.x1 + tw * f
  const p0 = { x: -24, y: t.y1 + th * 0.55 }
  const p1 = { x: at(0.42), y: t.y1 - 26 }
  const p2 = { x: right, y: t.y1 + th * 0.45 }
  const p3 = { x: at(0.5), y: t.y2 + 18 }
  // Finish touching the button's right edge, arriving from above.
  const p4 = { x: b.x2 + 2, y: (b.y1 + b.y2) / 2 }
  return [
    [p0, { x: 4, y: t.y1 + th * 0.05 }, { x: at(0.16), y: t.y1 - 30 }, p1],
    [p1, { x: at(0.72), y: t.y1 - 22 }, { x: right + 2, y: t.y1 + th * 0.05 }, p2],
    [p2, { x: right - 2, y: t.y1 + th * 0.95 }, { x: at(0.82), y: t.y2 + 22 }, p3],
    [p3, { x: at(0.1), y: t.y2 + 14 }, { x: b.x2 + 48, y: b.y1 - 24 }, p4],
  ]
}

const bez = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d
}
const d1 = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t
  return 3 * u * u * (b - a) + 6 * u * t * (c - b) + 3 * t * t * (d - c)
}
const d2 = (a: number, b: number, c: number, d: number, t: number) =>
  6 * (1 - t) * (c - 2 * b + a) + 6 * t * (d - 2 * c + b)

/**
 * Turn the route into a filled outline. Width follows curvature: thin (minW)
 * on straight runs, up to maxW at the tightest bends, smoothed so it flows.
 */
function buildShape(route: Seg[], minW: number, maxW: number) {
  const pts: { x: number; y: number; nx: number; ny: number; k: number }[] = []
  const STEPS = 48
  route.forEach(([p0, p1, p2, p3], si) => {
    for (let i = si === 0 ? 0 : 1; i <= STEPS; i++) {
      const t = i / STEPS
      const dx = d1(p0.x, p1.x, p2.x, p3.x, t)
      const dy = d1(p0.y, p1.y, p2.y, p3.y, t)
      const ddx = d2(p0.x, p1.x, p2.x, p3.x, t)
      const ddy = d2(p0.y, p1.y, p2.y, p3.y, t)
      const len = Math.hypot(dx, dy) || 1
      const k = Math.abs(dx * ddy - dy * ddx) / (len * len * len)
      pts.push({ x: bez(p0.x, p1.x, p2.x, p3.x, t), y: bez(p0.y, p1.y, p2.y, p3.y, t), nx: -dy / len, ny: dx / len, k })
    }
  })

  // Curvature -> width: a bend with ~25px radius or tighter reaches full width.
  const raw = pts.map((p) => {
    const v = Math.min(1, p.k * 25)
    const eased = v * v * (3 - 2 * v)
    return minW + (maxW - minW) * eased
  })
  // Smooth the widths so the swell rises and falls gracefully.
  const R = 10
  const widths = raw.map((_, i) => {
    let sum = 0
    let n = 0
    for (let j = Math.max(0, i - R); j <= Math.min(raw.length - 1, i + R); j++) {
      sum += raw[j]
      n++
    }
    return sum / n
  })
  // Taper both ends to a point.
  const TAPER = 24
  widths.forEach((_, i) => {
    const edge = Math.min(i, widths.length - 1 - i)
    if (edge < TAPER) widths[i] *= Math.max(0.15, edge / TAPER)
  })

  const left = pts.map((p, i) => `${(p.x + (p.nx * widths[i]) / 2).toFixed(1)} ${(p.y + (p.ny * widths[i]) / 2).toFixed(1)}`)
  const right = pts
    .map((p, i) => `${(p.x - (p.nx * widths[i]) / 2).toFixed(1)} ${(p.y - (p.ny * widths[i]) / 2).toFixed(1)}`)
    .reverse()
  const outline = `M ${left.join(" L ")} L ${right.join(" L ")} Z`
  const centre = `M ${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")}`
  return { outline, centre }
}

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
      const maxW = w < 768 ? 5 : 7
      const path = route(w, title.getBoundingClientRect(), cta.getBoundingClientRect(), box)
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
      className="pointer-events-none absolute inset-0 h-full w-full text-foreground"
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
