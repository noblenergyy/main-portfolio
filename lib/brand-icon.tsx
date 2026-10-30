import { ImageResponse } from "next/og"
import { publicImageDataUri } from "@/lib/og-assets"

/** Brand cobalt, matching --accent-500. */
const ACCENT = "#3d63ff"

/**
 * The tab and home-screen icon: the white Noverstorm tornado on a square of
 * brand cobalt. Square corners to match the site; solid colour so it reads on
 * both light and dark browser tabs.
 */
export async function brandIcon(px: number) {
  // The detailed logo's hairlines vanish at tab size, so small icons get a
  // bolder, simplified tornado drawn with thick strokes instead.
  if (px < 100) return smallIcon(px)
  const logo = await publicImageDataUri("logo-mark-white.png")
  // The mark is 512 x 451; keep its proportions and leave a little breathing room.
  const w = Math.round(px * 0.78)
  const h = Math.round((w * 451) / 512)
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: ACCENT,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={w} height={h} alt="" />
      </div>
    ),
    { width: px, height: px },
  )
}

/** Simplified tornado on a 64-unit grid: stacked arcs narrowing and leaning left. */
const BANDS = [
  { y: 15, half: 23, cx: 34 },
  { y: 23, half: 19, cx: 33 },
  { y: 30.5, half: 15, cx: 32 },
  { y: 37.5, half: 11, cx: 30.5 },
  { y: 44, half: 7.5, cx: 29 },
  { y: 50, half: 4.5, cx: 28 },
]

function smallIcon(px: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: ACCENT }}>
        <svg width={px} height={px} viewBox="0 0 64 64" fill="none">
          {BANDS.map((b) => (
            <path
              key={b.y}
              d={`M ${b.cx - b.half} ${b.y} Q ${b.cx} ${b.y + 4.5} ${b.cx + b.half} ${b.y}`}
              stroke="white"
              strokeWidth={4}
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
    ),
    { width: px, height: px },
  )
}
