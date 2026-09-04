import { readFile } from "node:fs/promises"
import { join } from "node:path"

/** Reads a file from /public and returns it as a data URI for image generation. */
export async function publicImageDataUri(name: string) {
  const buf = await readFile(join(process.cwd(), "public", name))
  return `data:image/png;base64,${buf.toString("base64")}`
}
