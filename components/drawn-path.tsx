"use client"

import { useEffect, useRef } from "react"

export type StrokeEdges = { outline: string; left: string[]; right: string[] }

const DURATION_MS = 2800

/** Ease in and out, so the pen starts and finishes gently. */
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** The stroke drawn from its start up to sample `k`. */
function prefix(edges: StrokeEdges, k: number) {
  const left = edges.left.slice(0, k)
  const right = edges.right.slice(0, k).reverse()
  return `M ${left.join(" L ")} L ${right.join(" L ")} Z`
}

/**
 * A calligraphic stroke that draws itself once, growing from its first point
 * like a pen. Unlike a mask-based reveal it never uncovers other parts of the
 * line where the stroke crosses itself, so it always grows from one tip.
 *
 * `play` starts the drawing; once drawn, later shape changes (e.g. a resize)
 * show the full stroke straight away.
 */
export function DrawnPath({ edges, play }: { edges: StrokeEdges | null; play: boolean }) {
  const pathRef = useRef<SVGPathElement | null>(null)
  const drawn = useRef(false)

  useEffect(() => {
    const path = pathRef.current
    if (!path || !edges) return
    if (drawn.current) {
      path.setAttribute("d", edges.outline)
      return
    }
    if (!play) {
      path.setAttribute("d", "")
      return
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      drawn.current = true
      path.setAttribute("d", edges.outline)
      return
    }

    const n = edges.left.length
    let frame = 0
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS)
      const k = Math.max(2, Math.round(ease(t) * n))
      path.setAttribute("d", t < 1 ? prefix(edges, k) : edges.outline)
      if (t < 1) frame = requestAnimationFrame(step)
      else drawn.current = true
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [edges, play])

  return <path ref={pathRef} fill="currentColor" />
}
