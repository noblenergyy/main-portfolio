import { ImageResponse } from "next/og"
import { loadOgFonts } from "@/lib/og-fonts"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default async function Icon() {
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
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: -1,
        }}
      >
        N
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  )
}
