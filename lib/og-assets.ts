import { readFile } from "node:fs/promises"
import { extname, join } from "node:path"

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
}

/** Reads a file from /public and returns it as a data URI for image generation. */
export async function publicImageDataUri(name: string) {
  const buf = await readFile(join(process.cwd(), "public", name))
  return `data:${MIME[extname(name).toLowerCase()] ?? "image/png"};base64,${buf.toString("base64")}`
}
