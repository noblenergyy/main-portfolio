import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Logo variants swap via CSS (not JS state) so they never flicker or
 * mismatch during hydration when the theme is restored.
 */

type LogoProps = {
  /** Tailwind height utility, e.g. "h-8". Width follows the aspect ratio. */
  className?: string
  priority?: boolean
}

export function LogoMark({ className, priority = false }: LogoProps) {
  return (
    <>
      <Image
        src="/logo-mark-black.png"
        alt="Noverstorm"
        width={512}
        height={451}
        priority={priority}
        className={cn("w-auto dark:hidden", className)}
      />
      <Image
        src="/logo-mark-white.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={451}
        priority={priority}
        className={cn("hidden w-auto dark:block", className)}
      />
    </>
  )
}

export function LogoFull({ className, priority = false }: LogoProps) {
  return (
    <>
      <Image
        src="/logo-full-black.png"
        alt="Noverstorm Tech Solutions"
        width={1024}
        height={807}
        priority={priority}
        className={cn("w-auto dark:hidden", className)}
      />
      <Image
        src="/logo-full-white.png"
        alt=""
        aria-hidden="true"
        width={1024}
        height={807}
        priority={priority}
        className={cn("hidden w-auto dark:block", className)}
      />
    </>
  )
}
