import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Eyebrow, heading and optional intro used at the top of every section.
 * Wrap a word of the title in <em> to set it in the accent serif.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  as: Heading = "h2",
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: string
  className?: string
  as?: "h1" | "h2"
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading
        className={cn(
          "mt-5 font-semibold tracking-tight text-balance",
          Heading === "h1" ? "text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02]" : "text-3xl leading-[1.1] md:text-[2.75rem]",
        )}
      >
        {title}
      </Heading>
      {intro && <p className="mt-5 text-lg text-muted-foreground text-pretty">{intro}</p>}
    </div>
  )
}

/** Top of an interior page: a bordered band with the page title over faint column lines. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <section className="relative overflow-hidden border-b">
      <ColumnLines />
      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} className="max-w-3xl" />
      </div>
    </section>
  )
}

/** Faint vertical guides that echo a layout grid. Purely decorative. */
export function ColumnLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="container mx-auto grid h-full grid-cols-2 px-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn("border-l border-foreground/[0.06]", i === 3 && "border-r", i >= 2 && "hidden md:block")}
          />
        ))}
      </div>
    </div>
  )
}

/** Small numbered label used on boxed cards: 01, 02, ... */
export function Index({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("font-serif text-2xl italic leading-none accent-text", className)}>
      {String(n).padStart(2, "0")}
    </span>
  )
}

/** Closing call to action used at the bottom of most pages. */
export function CtaBand({
  title = (
    <>
      Have a project <em className="!text-white/90">in mind?</em>
    </>
  ),
  body = "Tell us what you need in a few easy questions. We'll come back within 1 to 2 business days with a plan and a quote.",
}: {
  title?: React.ReactNode
  body?: string
}) {
  return (
    <section className="relative overflow-hidden bg-emerald-600 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:25%_100%]"
      />
      <div className="container relative mx-auto flex flex-col gap-10 px-4 py-20 md:flex-row md:items-end md:justify-between md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
          <p className="mt-5 max-w-xl text-white/75">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
            <Link href="/brief">
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:border-white hover:bg-white/10">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
