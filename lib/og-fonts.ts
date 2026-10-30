import { readFile } from "node:fs/promises"
import { join } from "node:path"

/** Fonts are vendored into /assets so image generation never hits the network. */
export async function loadOgFonts() {
  const read = (file: string) => readFile(join(process.cwd(), "assets", file))
  const [black, regular, heading, serifItalic] = await Promise.all([
    read("Geist-Black.ttf"),
    read("Geist-Regular.ttf"),
    read("SpaceGrotesk-SemiBold.woff"),
    read("InstrumentSerif-Italic.woff"),
  ])

  return [
    { name: "Geist", data: black, style: "normal" as const, weight: 900 as const },
    { name: "Geist", data: regular, style: "normal" as const, weight: 400 as const },
    // Same faces as the site's headings and accent words.
    { name: "Space Grotesk", data: heading, style: "normal" as const, weight: 600 as const },
    { name: "Instrument Serif", data: serifItalic, style: "italic" as const, weight: 400 as const },
  ]
}
