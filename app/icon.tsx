import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/**
 * The full logo's thin strokes turn to noise at 32px, so the tab icon uses a
 * simplified funnel: the same silhouette drawn with solid bars that stay legible.
 */
const BARS = [26, 22, 18, 13, 8]

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          backgroundColor: "#0a0a0a",
        }}
      >
        {BARS.map((w) => (
          <div
            key={w}
            style={{
              width: w,
              height: 3,
              borderRadius: 2,
              backgroundColor: "#fafafa",
            }}
          />
        ))}
      </div>
    ),
    { ...size },
  )
}
