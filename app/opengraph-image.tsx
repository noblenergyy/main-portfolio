import { ImageResponse } from "next/og"
import { SITE_NAME } from "@/lib/site"

export const alt = `${SITE_NAME} — Software Development Studio`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            color: "#9a9a9a",
            textTransform: "uppercase",
          }}
        >
          Software Development Studio
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -6,
            color: "#fafafa",
          }}
        >
          NOVERSTORM.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            maxWidth: 900,
            fontSize: 30,
            lineHeight: 1.4,
            color: "#b4b4b4",
          }}
        >
          We build digital products at the intersection of commerce, technology, and
          scale.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            paddingTop: 26,
            borderTop: "1px solid rgba(255,255,255,0.16)",
            fontSize: 21,
            letterSpacing: 4,
            color: "#8a8a8a",
            textTransform: "uppercase",
          }}
        >
          noverstorm.online
        </div>
      </div>
    ),
    { ...size },
  )
}
