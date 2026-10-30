import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CLIENTS } from "@/lib/site"
import { testimonials } from "@/lib/testimonials"
import { SectionHeading } from "@/components/page-parts"

export function ClientStrip() {
  return (
    <section aria-label="Clients" className="border-b">
      <div className="container mx-auto grid gap-6 px-4 py-10 md:grid-cols-[12rem_1fr] md:items-center">
        <p className="eyebrow">Trusted by</p>
        <ul className="grid grid-cols-2 border-l border-t sm:grid-cols-4">
          {CLIENTS.map((name) => (
            <li
              key={name}
              className="flex min-h-24 items-center justify-center border-b border-r px-4 text-center font-heading text-sm font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground md:text-base"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Hidden until lib/testimonials.ts has at least one quote. */
export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section aria-label="Testimonials" className="border-b">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <SectionHeading
          eyebrow="Client words"
          title={
            <>
              Trusted by the businesses <em>we build for</em>
            </>
          }
        />
        <div className="mt-14 grid border-l border-t lg:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="relative flex flex-col justify-between gap-10 border-b border-r p-8 md:p-12">
              <span aria-hidden="true" className="accent-text font-serif text-8xl leading-[0.5]">
                &ldquo;
              </span>
              <blockquote className="font-serif text-2xl leading-snug text-pretty md:text-[1.75rem]">
                {t.quote}
              </blockquote>
              <figcaption className="flex items-end justify-between gap-6 border-t pt-6 text-sm">
                <span>
                  <span className="block font-medium">{t.name}</span>
                  <span className="block text-muted-foreground">{t.role}</span>
                </span>
                {t.project && (
                  <Link
                    href={`/projects/${t.project}`}
                    className="inline-flex shrink-0 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Case study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
