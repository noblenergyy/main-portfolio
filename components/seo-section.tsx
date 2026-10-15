"use client"

import Link from "next/link"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { seoOfferings } from "@/lib/seo"

export function SeoSection() {
  return (
    <section
      id="seo"
      aria-label="SEO"
      className="container mx-auto px-4 py-14 sm:py-16 md:py-24"
    >
      <AnimateOnScroll>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          05 // seo
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">Get found on search</h2>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          Technical SEO for the sites we build and the ones we didn&apos;t: fast pages,
          clean metadata, structured data and Search Console set up so people searching
          for you actually find you.
        </p>
      </AnimateOnScroll>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {seoOfferings.map((o, i) => (
          <AnimateOnScroll key={o.title} delayMs={60 * i}>
            <Card className="h-full transition-colors hover:border-emerald-600/40">
              <CardContent className="flex h-full flex-col p-6">
                <p className="font-mono text-xs tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                  {o.tag}
                </p>
                <h3 className="mt-4 font-semibold tracking-tight">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        ))}
      </div>

      <AnimateOnScroll className="mt-14 sm:mt-16">
        <div className="flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex flex-wrap gap-3 sm:shrink-0">
            <Button asChild size="lg">
              <a href="#contact">Request an SEO audit</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/seo">How it works</Link>
            </Button>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Every site we build ships with technical SEO in place. Ongoing SEO for an
            existing site starts with an audit.
          </p>
        </div>
      </AnimateOnScroll>
    </section>
  )
}
