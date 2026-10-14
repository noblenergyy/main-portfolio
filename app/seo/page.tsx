import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SITE_NAME, SITE_URL } from "@/lib/site"

const TITLE = "SEO Services"
const DESCRIPTION =
  "Technical SEO for new and existing websites: fast pages, clean metadata, structured data, sitemaps and Search Console set up so search engines can find, read and rank your site."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "SEO services",
    "technical SEO",
    "Next.js SEO",
    "website SEO audit",
    "Core Web Vitals optimization",
    "structured data",
    "local SEO",
    "Google Search Console setup",
  ],
  alternates: {
    canonical: "/seo",
  },
  openGraph: {
    type: "website",
    url: "/seo",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
}

const offerings = [
  {
    tag: "./audit",
    title: "SEO audit",
    body: "A full crawl of your site: indexing problems, broken links, duplicate pages, missing metadata and slow templates, delivered as a prioritized fix list.",
  },
  {
    tag: "./technical",
    title: "Technical SEO",
    body: "Canonical URLs, sitemaps, robots rules, redirects and clean URL structure, so every page you want found is crawlable and every page you don't is kept out.",
  },
  {
    tag: "./performance",
    title: "Core Web Vitals",
    body: "Image optimization, font loading, code splitting and static rendering to make pages load fast on real phones, a direct ranking signal.",
  },
  {
    tag: "./metadata",
    title: "Metadata & structured data",
    body: "Titles, descriptions, Open Graph cards and schema.org markup for organizations, services, articles and FAQs, so results show up rich and click-worthy.",
  },
  {
    tag: "./local",
    title: "Local SEO",
    body: "Google Business Profile setup, consistent business details across the web and location pages for firms that win work in specific cities or regions.",
  },
  {
    tag: "./tracking",
    title: "Search Console & analytics",
    body: "Google Search Console and analytics wired in from day one, so you can see which queries bring visitors and which pages turn them into inquiries.",
  },
]

const steps = [
  { n: "01", title: "Audit", body: "We crawl the site, check how it is indexed today and benchmark speed on mobile and desktop." },
  { n: "02", title: "Fix", body: "Technical issues first: indexing, speed, metadata and structure. The foundation everything else depends on." },
  { n: "03", title: "Structure", body: "Page and content structure mapped to the searches your customers actually make." },
  { n: "04", title: "Measure", body: "Search Console and analytics reporting, so progress is visible and the next round of work is driven by data." },
]

const faqs = [
  {
    q: "Is SEO included when you build my website?",
    a: "Yes. Every site we build ships with technical SEO in place: fast static pages, metadata, a sitemap, robots rules, structured data and Search Console verification. Ongoing SEO work after launch is a separate engagement.",
  },
  {
    q: "Can you improve SEO on a site you didn't build?",
    a: "Yes. We start with an audit of your existing site, then fix what we can within your current platform. If the platform itself is holding you back, we will tell you plainly and scope a rebuild.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Technical fixes are often picked up within weeks of search engines recrawling the site. Ranking for competitive searches takes longer, typically months, and depends on your market and content.",
  },
  {
    q: "Do you guarantee first-page rankings?",
    a: "No, and you should be wary of anyone who does. Search engines decide rankings. What we guarantee is the work: a site that is fast, correctly indexed and structured to compete.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Search engine optimization",
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE_URL}/seo`,
  areaServed: "Worldwide",
  provider: {
    "@type": "Organization",
    name: `${SITE_NAME} Ltd`,
    url: SITE_URL,
  },
}

export default function SeoPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }}
      />
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-sm hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            back to noverstorm
          </Link>
          <Button asChild size="sm">
            <Link href="/#contact">Get an audit</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          services // seo
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          Get found by the people already searching for you.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{DESCRIPTION}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/#contact">Request an SEO audit</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#projects">See sites we&apos;ve built</Link>
          </Button>
        </div>

        <section aria-label="What's included" className="mt-16">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            what&apos;s included
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o) => (
              <Card key={o.title} className="h-full transition-colors hover:border-emerald-600/40">
                <CardContent className="flex h-full flex-col p-6">
                  <p className="font-mono text-xs tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                    {o.tag}
                  </p>
                  <h3 className="mt-4 font-semibold tracking-tight">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-label="How it works" className="mt-16">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            how it works
          </h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.n} className="border-t-2 border-emerald-500/40 pt-4">
                <p className="font-mono text-xs tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  {step.n}
                </p>
                <h3 className="mt-2 font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Frequently asked questions" className="mt-16">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            faq
          </h2>
          <div className="divide-y border-y">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="font-mono text-emerald-500 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:gap-8">
          <Button asChild size="lg" className="sm:shrink-0">
            <Link href="/#contact">Start with an audit</Link>
          </Button>
          <p className="max-w-md text-sm text-muted-foreground">
            Tell us your site and what you want to rank for. We&apos;ll come back with
            what&apos;s holding it back and a scoped plan to fix it.
          </p>
        </div>
      </main>
    </div>
  )
}
