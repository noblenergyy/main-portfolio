"use client"

import { useEffect, useId, useRef, useState } from "react"
import { buildShape, type Seg } from "@/lib/hero-line-geometry"

/**
 * A calligraphic line, like the hero's, that draws itself once when its section
 * scrolls into view. Place it as a child of a section with
 * `relative isolate overflow-hidden`; it sits behind the section's content.
 *
 * Shown from tablet width up: on phones, sections are narrow and tall, so the
 * loops would stretch across the text (the hero line handles phones itself).
 *
 * Shapes are defined on a 0–1 grid of the section's width and height, so they
 * fill the space they're given; the stroke width is computed in real pixels, so
 * it never stretches.
 */

type N = [number, number]
type Shape = [N, N, N, N][]

const SHAPES = {
  // Sweeps in from the right edge, curls into a loop, leaves through the bottom.
  loopRight: [
    [[1.04, 0.18], [0.9, 0.1], [0.74, 0.16], [0.76, 0.36]],
    [[0.76, 0.36], [0.78, 0.56], [0.97, 0.52], [0.93, 0.36]],
    [[0.93, 0.36], [0.89, 0.2], [0.68, 0.3], [0.7, 0.62]],
    [[0.7, 0.62], [0.72, 0.86], [0.86, 0.94], [0.98, 1.06]],
  ],
  // A long wave along the bottom padding of the section, with a single loop in the middle.
  wave: [
    [[-0.04, 0.97], [0.14, 0.9], [0.3, 1.03], [0.46, 0.98]],
    [[0.46, 0.98], [0.58, 0.94], [0.6, 0.87], [0.53, 0.88]],
    [[0.53, 0.88], [0.46, 0.89], [0.5, 1.01], [0.66, 1.0]],
    [[0.66, 1.0], [0.82, 0.99], [0.9, 0.92], [1.04, 0.95]],
  ],
  // A small curl tucked into the bottom-left corner, below a section's heading.
  cornerLeft: [
    [[-0.04, 0.7], [0.08, 0.66], [0.2, 0.74], [0.2, 0.84]],
    [[0.2, 0.84], [0.2, 0.94], [0.06, 0.96], [0.07, 0.86]],
    [[0.07, 0.86], [0.08, 0.76], [0.26, 0.78], [0.3, 0.9]],
    [[0.3, 0.9], [0.33, 0.98], [0.36, 1.02], [0.38, 1.08]],
  ],
  // A curl in the top-right corner, beside a left-aligned heading; leaves through the right edge.
  cornerRight: [
    [[1.04, 0.08], [0.9, 0.02], [0.74, 0.08], [0.76, 0.24]],
    [[0.76, 0.24], [0.78, 0.4], [0.96, 0.38], [0.93, 0.24]],
    [[0.93, 0.24], [0.9, 0.1], [0.66, 0.12], [0.62, 0.3]],
    [[0.62, 0.3], [0.6, 0.39], [0.8, 0.52], [1.04, 0.46]],
  ],
  // For page headers: drops in from the top-right, loops, and trails off right.
  header: [
    [[0.62, -0.08], [0.6, 0.2], [0.74, 0.5], [0.84, 0.44]],
    [[0.84, 0.44], [0.94, 0.38], [0.9, 0.18], [0.8, 0.26]],
    [[0.8, 0.26], [0.7, 0.34], [0.74, 0.74], [0.88, 0.8]],
    [[0.88, 0.8], [0.96, 0.84], [1.0, 0.7], [1.06, 0.66]],
  ],
  // Page-header variants, all kept to the right half beside the page title.
  // Spirals in from the top-right edge and trails out through the bottom.
  headerSwirl: [
    [[1.04, 0.15], [0.9, 0.05], [0.68, 0.2], [0.7, 0.5]],
    [[0.7, 0.5], [0.72, 0.8], [0.92, 0.78], [0.9, 0.52]],
    [[0.9, 0.52], [0.88, 0.3], [0.74, 0.36], [0.78, 0.56]],
    [[0.78, 0.56], [0.82, 0.74], [0.9, 0.92], [0.86, 1.08]],
  ],
  // Rises from the bottom, two loops, and leaves through the right edge.
  headerWave: [
    [[0.5, 1.06], [0.56, 0.8], [0.62, 0.6], [0.7, 0.62]],
    [[0.7, 0.62], [0.78, 0.64], [0.76, 0.86], [0.7, 0.8]],
    [[0.7, 0.8], [0.64, 0.74], [0.74, 0.4], [0.86, 0.36]],
    [[0.86, 0.36], [0.96, 0.33], [0.98, 0.6], [0.9, 0.6]],
    [[0.9, 0.6], [0.84, 0.6], [0.9, 0.2], [1.06, 0.12]],
  ],
  // Climbs from the bottom-right in a double loop and exits top-right.
  headerLoop: [
    [[0.98, 1.08], [0.94, 0.8], [0.74, 0.84], [0.76, 0.62]],
    [[0.76, 0.62], [0.78, 0.42], [0.94, 0.5], [0.88, 0.62]],
    [[0.88, 0.62], [0.82, 0.74], [0.66, 0.56], [0.72, 0.32]],
    [[0.72, 0.32], [0.76, 0.16], [0.9, 0.12], [0.96, 0.24]],
    [[0.96, 0.24], [1.0, 0.32], [1.02, 0.2], [1.08, 0.1]],
  ],
} satisfies Record<string, Shape>

export type ScrollLineShape = keyof typeof SHAPES

export function ScrollLine({ shape, className }: { shape: ScrollLineShape; className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [geo, setGeo] = useState<{ outline: string; centre: string; w: number; h: number; maxW: number } | null>(null)
  const [state, setState] = useState<"waiting" | "drawing" | "done">("waiting")

  // Build the line for the section's size, and rebuild when it resizes.
  useEffect(() => {
    const svg = svgRef.current
    const host = svg?.parentElement
    if (!svg || !host) return
    const update = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return
      const segs: Seg[] = SHAPES[shape].map((seg) => seg.map(([x, y]) => ({ x: x * w, y: y * h })) as Seg)
      const maxW = 6
      setGeo({ ...buildShape(segs, 1, maxW), w, h, maxW })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(host)
    return () => ro.disconnect()
  }, [shape])

  // Start drawing the first time a good part of the section is on screen.
  useEffect(() => {
    const host = svgRef.current?.parentElement
    if (!host || state !== "waiting") return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("drawing")
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(host)
    return () => io.disconnect()
  }, [state])

  // useId gives colons, which break url(#...) references.
  const maskId = `scroll-line-${useId().replace(/:/g, "")}`

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 hidden h-full w-full text-foreground md:block ${className ?? ""}`}
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      fill="none"
    >
      {geo && state !== "waiting" && (
        <>
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={geo.w} height={geo.h}>
              <path
                d={geo.centre}
                pathLength={1}
                stroke="white"
                strokeWidth={geo.maxW + 6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={state === "drawing" ? "draw-line" : undefined}
                onAnimationEnd={() => setState("done")}
              />
            </mask>
          </defs>
          <path d={geo.outline} fill="currentColor" mask={`url(#${maskId})`} />
        </>
      )}
    </svg>
  )
}
