import { ImageResponse } from "next/og"
import { SITE_NAME } from "@/lib/site"
import { loadOgFonts } from "@/lib/og-fonts"
import { publicImageDataUri } from "@/lib/og-assets"
import { buildShape, heroRoute } from "@/lib/hero-line-geometry"

export const alt = `${SITE_NAME}: we design and build software that businesses run on.`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Brand colours, matching the site in dark mode.
const BG = "#0a0a0a"
const FG = "#ebebeb"
const MUTED = "#8f8f8f"
const ACCENT = "#3d63ff"
const ACCENT_TEXT = "#6c8aff"

// Layout boxes (px). The calligraphic line is routed around HEADLINE and ends at CTA,
// exactly like the hero on the site.
const PAD = 64
const HEADLINE = { x1: PAD, y1: 186, x2: 600, y2: 446 }
const CTA = { x1: PAD, y1: 486, x2: PAD + 262, y2: 486 + 60 }
const SHOT = { left: 712, top: 150, width: 424 }

/**
 * Link preview shown by WhatsApp, iMessage, Slack, LinkedIn and X.
 * WhatsApp now shows it large above the link, so text is sized to stay
 * readable at roughly a third of this size.
 */
export default async function OpengraphImage() {
  const [logo, shot] = await Promise.all([
    publicImageDataUri("logo-mark-white.png"),
    publicImageDataUri("bcijval.jpg"),
  ])
  const line = buildShape(heroRoute(size.width, HEADLINE, CTA), 1.4, 8)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: BG,
          fontFamily: "Geist",
          color: FG,
        }}
      >
        {/* Faint column guides, as on the site */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: PAD + ((size.width - PAD * 2) / 4) * i,
              width: 1,
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          />
        ))}

        {/* The calligraphic line, behind everything */}
        <svg
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <path d={line.outline} fill={FG} />
        </svg>

        {/* Logo */}
        <div style={{ position: "absolute", top: 46, left: PAD, display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={46} height={40} alt="" />
          <div style={{ display: "flex", marginLeft: 14, fontFamily: "Space Grotesk", fontSize: 30, letterSpacing: -0.5 }}>
            Noverstorm
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 54,
            right: PAD,
            display: "flex",
            fontSize: 22,
            letterSpacing: 1,
            color: MUTED,
          }}
        >
          noverstorm.online
        </div>

        {/* Raised label */}
        <div
          style={{
            position: "absolute",
            top: 124,
            left: PAD,
            display: "flex",
            padding: "8px 14px",
            border: `2px solid ${FG}`,
            backgroundColor: BG,
            boxShadow: `5px 5px 0 0 ${ACCENT}`,
            fontSize: 17,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Software development studio
        </div>

        {/* Headline */}
        <div
          style={{
            position: "absolute",
            top: HEADLINE.y1,
            left: PAD,
            width: HEADLINE.x2 - HEADLINE.x1,
            display: "flex",
            flexDirection: "column",
            fontFamily: "Space Grotesk",
            fontSize: 64,
            lineHeight: 1,
            letterSpacing: -2.5,
          }}
        >
          <div style={{ display: "flex" }}>We design and</div>
          <div style={{ display: "flex" }}>build software</div>
          <div style={{ display: "flex" }}>that businesses</div>
          <div style={{ display: "flex", fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 72, color: ACCENT_TEXT, letterSpacing: -1 }}>
            run on.
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            position: "absolute",
            top: CTA.y1,
            left: CTA.x1,
            width: CTA.x2 - CTA.x1,
            height: CTA.y2 - CTA.y1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: FG,
            color: BG,
            fontSize: 24,
          }}
        >
          Start a project →
        </div>

        {/* Framed project screenshot */}
        <div
          style={{
            position: "absolute",
            top: SHOT.top,
            left: SHOT.left,
            width: SHOT.width,
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255,255,255,0.18)",
            backgroundColor: "#141414",
            boxShadow: `9px 9px 0 0 ${ACCENT}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 34,
              padding: "0 12px",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              fontSize: 15,
              color: MUTED,
            }}
          >
            <div style={{ display: "flex", width: 9, height: 9, backgroundColor: "rgba(255,255,255,0.2)", marginRight: 6 }} />
            <div style={{ display: "flex", width: 9, height: 9, backgroundColor: "rgba(255,255,255,0.2)", marginRight: 6 }} />
            <div style={{ display: "flex", width: 9, height: 9, backgroundColor: "rgba(255,255,255,0.2)", marginRight: 14 }} />
            bcijvalengineering.com
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot} width={SHOT.width - 2} height={Math.round((SHOT.width - 2) / 1.6)} alt="" style={{ objectFit: "cover", objectPosition: "top" }} />
        </div>
        <div
          style={{
            position: "absolute",
            top: SHOT.top + 34 + Math.round((SHOT.width - 2) / 1.6) + 40,
            left: SHOT.left,
            display: "flex",
            fontSize: 20,
            color: MUTED,
          }}
        >
          Websites · Web apps · Integrations · SEO
        </div>
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  )
}
