import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { caseStudies } from "@/lib/projects"

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: `${cs.title} | Case Study | Noverstorm Tech Solutions`,
    description: cs.description,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) notFound()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-sm hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            back to noverstorm
          </Link>
          <Button asChild size="sm" variant="outline">
            <a href={cs.demo} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Site
            </a>
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          case study
        </p>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{cs.title}</h1>
          <span className="border border-emerald-500/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            {cs.status}
          </span>
        </div>
        <p className="mb-8 max-w-2xl text-lg text-muted-foreground">{cs.description}</p>

        <div className="mb-10 overflow-hidden rounded-lg border">
          <Image
            src={cs.image}
            alt={`${cs.title} screenshot`}
            className="w-full object-cover"
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
          />
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <section aria-label="The problem">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
              the problem
            </h2>
            <p className="text-muted-foreground">{cs.problem}</p>
          </section>
          <section aria-label="The solution">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
              the solution
            </h2>
            <p className="text-muted-foreground">{cs.solution}</p>
          </section>
        </div>

        <section aria-label="Key features" className="mt-10">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            key features
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {cs.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-muted-foreground">
                <span aria-hidden="true" className="mt-0.5 font-mono text-emerald-500">
                  &gt;
                </span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Stack" className="mt-10">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {cs.tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="border bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 border-emerald-600/20"
              >
                {t}
              </Badge>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3 border-t pt-8">
          <Button asChild>
            <a href={cs.demo} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Live Site
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#contact">Start a project like this</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
