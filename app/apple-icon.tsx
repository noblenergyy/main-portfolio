import { ImageResponse } from "next/og"
import { loadOgFonts } from "@/lib/og-fonts"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "Geist",
          fontSize: 132,
          fontWeight: 900,
          letterSpacing: -6,
        }}
      >
        N
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  )
}
