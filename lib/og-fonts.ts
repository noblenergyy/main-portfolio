import { readFile } from "node:fs/promises"
import { join } from "node:path"

/** Fonts are vendored into /assets so image generation never hits the network. */
export async function loadOgFonts() {
  const [black, regular] = await Promise.all([
    readFile(join(process.cwd(), "assets/Geist-Black.ttf")),
    readFile(join(process.cwd(), "assets/Geist-Regular.ttf")),
  ])

  return [
    { name: "Geist", data: black, style: "normal" as const, weight: 900 as const },
    { name: "Geist", data: regular, style: "normal" as const, weight: 400 as const },
  ]
}
