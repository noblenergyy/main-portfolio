/**
 * Decorative scribble that loops through the hero, behind the content.
 * Drawn on a 1440x760 canvas and stretched to the hero; the stroke stays the
 * same thickness at any size thanks to non-scaling-stroke.
 */
const PATH =
  "M -80 400 " +
  "C 60 280, 210 -30, 315 15 " +
  "C 405 55, 310 470, 268 532 " +
  "C 245 568, 318 572, 372 508 " +
  "C 520 330, 715 25, 818 38 " +
  "C 905 50, 778 425, 798 480 " +
  "C 812 522, 868 506, 902 462 " +
  "C 1020 305, 1148 162, 1232 186 " +
  "C 1322 212, 1288 598, 1318 652 " +
  "C 1340 692, 1410 672, 1540 630"

export function HeroLine() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50 md:opacity-100"
      viewBox="0 0 1440 760"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="hero-line-stroke" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "rgb(var(--accent-500))", stopOpacity: 0 }} />
          <stop offset="0.12" style={{ stopColor: "rgb(var(--accent-500))", stopOpacity: 0.9 }} />
          <stop offset="0.55" style={{ stopColor: "rgb(var(--accent-400))", stopOpacity: 1 }} />
          <stop offset="1" style={{ stopColor: "rgb(var(--accent-300))", stopOpacity: 0.6 }} />
        </linearGradient>
        <filter id="hero-line-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Soft glow underneath */}
      <path
        d={PATH}
        pathLength={1}
        stroke="url(#hero-line-stroke)"
        strokeWidth={10}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter="url(#hero-line-glow)"
        className="draw-line opacity-40"
      />
      {/* The line itself */}
      <path
        d={PATH}
        pathLength={1}
        stroke="url(#hero-line-stroke)"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="draw-line"
      />
    </svg>
  )
}
