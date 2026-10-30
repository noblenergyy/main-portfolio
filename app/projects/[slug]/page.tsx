import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ExternalLink } from "lucide-react"
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
    title: `${cs.title} | Case Study`,
    description: cs.description,
    alternates: {
      canonical: `/projects/${cs.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/projects/${cs.slug}`,
      title: `${cs.title} | Case Study`,
      description: cs.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} | Case Study`,
      description: cs.description,
    },
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
      <SiteHeader />

      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
          <Link href="/work" className="hover:text-foreground">
            Work
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span className="text-foreground">{cs.title}</span>
        </nav>
        <p className="eyebrow mb-6">Case study</p>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{cs.title}</h1>
          <span className="border px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em]">
            {cs.status === "IN PROGRESS" ? "In progress" : "Live"}
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
            <h2 className="eyebrow mb-6">
              the problem
            </h2>
            <p className="text-muted-foreground">{cs.problem}</p>
          </section>
          <section aria-label="The solution">
            <h2 className="eyebrow mb-6">
              the solution
            </h2>
            <p className="text-muted-foreground">{cs.solution}</p>
          </section>
        </div>

        <section aria-label="Key features" className="mt-10">
          <h2 className="eyebrow mb-6">
            key features
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {cs.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-muted-foreground">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-foreground" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {cs.internals && cs.internals.length > 0 && (
          <section aria-label="Under the hood" className="mt-10">
            <h2 className="eyebrow mb-6">
              under the hood
            </h2>
            <div className="divide-y rounded-lg border">
              {cs.internals.map((s, i) => (
                <div key={s.title} className="grid gap-2 p-5 md:grid-cols-[14rem_1fr] md:gap-6">
                  <h3 className="font-semibold tracking-tight">
                    <span aria-hidden="true" className="mr-2 text-xs tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {cs.gallery && cs.gallery.length > 0 && (
          <section aria-label="Screenshots" className="mt-10">
            <h2 className="eyebrow mb-6">
              screenshots
            </h2>
            <div className="space-y-8">
              {cs.gallery.map((g) => (
                <figure key={g.caption}>
                  <div className="overflow-hidden rounded-lg border">
                    <Image
                      src={g.image}
                      alt={`${cs.title}: ${g.caption}`}
                      className="w-full object-cover"
                      sizes="(min-width: 1024px) 896px, 100vw"
                    />
                  </div>
                  <figcaption className="mt-2 text-sm text-muted-foreground">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section aria-label="Stack" className="mt-10">
          <h2 className="eyebrow mb-6">
            stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {cs.tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="bg-transparent font-normal"
              >
                {t}
              </Badge>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3 border-t pt-8">
          {cs.demo && (
            <Button asChild>
              <a href={cs.demo} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Live Site
              </a>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/brief">Start a project like this</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
