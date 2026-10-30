/**
 * Geometry for the hero's calligraphic line, shared by the live hero
 * (components/hero-line.tsx) and the link preview image (app/opengraph-image.tsx).
 *
 * The line is a chain of cubic Béziers turned into a filled outline whose width
 * swells on tight curves and tapers on straighter runs.
 */

type Pt = { x: number; y: number }
/** A cubic Bézier segment: start, control 1, control 2, end. */
export type Seg = [Pt, Pt, Pt, Pt]

/** A box in the line's own coordinate space. */
export type Box = { x1: number; y1: number; x2: number; y2: number }

/** Small seeded random generator (mulberry32), so a shape stays the same for a whole visit. */
export function seededRandom(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Nudge a route so it is a little different each visit while staying smooth:
 * each joint between curves moves together with its two neighbouring control
 * points, so tangents stay continuous and loops never kink. The two ends only
 * move vertically, so the line still enters and leaves at the screen edges.
 */
export function jitterRoute(route: Seg[], rand: () => number, ax: number, ay: number): Seg[] {
  const out = route.map((seg) => seg.map((p) => ({ ...p })) as Seg)
  const move = (p: Pt, dx: number, dy: number) => {
    p.x += dx
    p.y += dy
  }
  for (let i = 0; i <= out.length; i++) {
    const end = i === 0 || i === out.length
    const dx = end ? 0 : (rand() * 2 - 1) * ax
    const dy = (rand() * 2 - 1) * ay
    if (i > 0) {
      move(out[i - 1][3], dx, dy)
      move(out[i - 1][2], dx, dy)
    }
    if (i < out.length) {
      move(out[i][0], dx, dy)
      move(out[i][1], dx, dy)
    }
  }
  return out
}

// The long, hand-sketched route across the whole hero, used on laptop and desktop
// widths. Defined on a 1440 x 760 canvas and scaled to the hero at runtime. It
// starts off the left edge and runs in one stroke to the right edge, passing
// behind the project screenshots.
const SKETCH: number[][] = [
  [-80, 400, 60, 280, 210, -30, 315, 15],
  [315, 15, 405, 55, 310, 470, 268, 532],
  [268, 532, 245, 568, 318, 572, 372, 508],
  [372, 508, 520, 330, 715, 25, 818, 38],
  [818, 38, 905, 50, 778, 425, 798, 480],
  [798, 480, 812, 522, 868, 506, 902, 462],
  [902, 462, 1020, 305, 1148, 162, 1232, 186],
  [1232, 186, 1322, 212, 1288, 598, 1318, 652],
  [1318, 652, 1340, 692, 1410, 672, 1540, 630],
]

/**
 * Laptop and desktop route. Each visit picks the sketch or its mirror image
 * (loops hanging down instead of up), varies its height a little, then nudges
 * every curve; the overall rhythm of the drawing always stays the same.
 */
export function sketchRoute(w: number, h: number, rand: () => number = Math.random): Seg[] {
  const flip = rand() < 0.5
  const squash = 0.88 + rand() * 0.14
  const sx = w / 1440
  const sy = h / 760
  const pt = (x: number, y: number): Pt => {
    const yy = flip ? 760 - y : y
    return { x: x * sx, y: (380 + (yy - 380) * squash) * sy }
  }
  const base = SKETCH.map((n) => [pt(n[0], n[1]), pt(n[2], n[3]), pt(n[4], n[5]), pt(n[6], n[7])] as Seg)
  return jitterRoute(base, rand, w * 0.025, h * 0.045)
}

/**
 * One continuous line: start off the left edge, loop around the headline, then
 * sweep down to finish touching the right edge of the CTA button.
 */
export function heroRoute(w: number, t: Box, b: Box, rand: () => number = Math.random): Seg[] {
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
  const p4 = { x: b.x2 + 2, y: (b.y1 + b.y2) / 2 }
  const route: Seg[] = [
    [p0, { x: 4, y: t.y1 + th * 0.05 }, { x: at(0.16), y: t.y1 - 30 }, p1],
    [p1, { x: at(0.72), y: t.y1 - 22 }, { x: right + 2, y: t.y1 + th * 0.05 }, p2],
    [p2, { x: right - 2, y: t.y1 + th * 0.95 }, { x: at(0.82), y: t.y2 + 22 }, p3],
    [p3, { x: at(0.1), y: t.y2 + 14 }, { x: b.x2 + 48, y: b.y1 - 24 }, p4],
  ]
  // Vary the loop a little each visit, but keep the end touching the button.
  const varied = jitterRoute(route, rand, w * 0.03, 10)
  const last = varied[varied.length - 1]
  const dx = p4.x - last[3].x
  const dy = p4.y - last[3].y
  last[3] = p4
  last[2] = { x: last[2].x + dx, y: last[2].y + dy }
  return varied
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
export function buildShape(route: Seg[], minW: number, maxW: number) {
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
  // left[i] and edgeRight[i] are the two sides of the stroke at sample i, in
  // drawing order; a prefix of both gives the line drawn up to that point.
  const edgeRight = [...right].reverse()
  return { outline, left, right: edgeRight }
}
