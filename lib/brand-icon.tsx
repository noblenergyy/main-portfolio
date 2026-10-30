import { ImageResponse } from "next/og"
import { publicImageDataUri } from "@/lib/og-assets"

const BG = "#0a0a0a"

/**
 * The tab and home-screen icon: the white Noverstorm tornado on a black square,
 * matching the logo files and the site's solid buttons.
 *
 * At small sizes the logo's hairlines would disappear, so the mark is stamped a
 * few times at sub-pixel offsets around a circle, which thickens every stroke
 * without changing its shape.
 */
export async function brandIcon(px: number) {
  const logo = await publicImageDataUri("logo-mark-white.png")
  // The mark is 512 x 451; keep its proportions with a little breathing room.
  // Small icons let the mark fill more of the square so each line gets more pixels.
  const w = Math.round(px * (px < 100 ? 0.9 : 0.74))
  const h = Math.round((w * 451) / 512)
  const left = Math.round((px - w) / 2)
  const top = Math.round((px - h) / 2)
  // Thickening radius: noticeable at tab size, subtle on the large home-screen icon.
  const r = px < 100 ? px / 110 : px / 180
  const offsets = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    return { dx: Math.cos(a) * r, dy: Math.sin(a) * r }
  })

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: BG }}>
        {[{ dx: 0, dy: 0 }, ...offsets].map((o, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={logo}
            width={w}
            height={h}
            alt=""
            style={{ position: "absolute", left: left + o.dx, top: top + o.dy }}
          />
        ))}
      </div>
    ),
    { width: px, height: px },
  )
}
