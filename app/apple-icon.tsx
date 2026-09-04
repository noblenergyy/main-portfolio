import { ImageResponse } from "next/og"
import { publicImageDataUri } from "@/lib/og-assets"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default async function AppleIcon() {
  const logo = await publicImageDataUri("logo-mark-white.png")
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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={148} height={130} alt="" />
      </div>
    ),
    { ...size },
  )
}
