import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader, SectionHeading, CtaBand, Index } from "@/components/page-parts"
import { ScrollLine } from "@/components/scroll-line"
import { ClientStrip, Testimonials } from "@/components/trust"
import { COMPANY } from "@/lib/site"

const DESCRIPTION =
  "Noverstorm Tech Solutions is a software development studio building websites, platforms and integrations for businesses worldwide."

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", url: "/about", title: "About Noverstorm", description: DESCRIPTION },
}

const facts = [
  { label: "Company", value: COMPANY.legalName },
  { label: "Practice", value: "Websites, web applications, integrations, SEO" },
  { label: "Industries", value: "Professional services, engineering, marine, education, media" },
  { label: "Clients", value: "Worldwide, working remotely across time zones" },
  { label: "Contracts", value: "Written scope, agreed milestones, formal invoicing" },
]

const values = [
  {
    title: "No middlemen",
    body: "You talk directly to the studio designing and building your product. Decisions are made quickly and nothing gets lost in translation.",
  },
  {
    title: "Honest scope and pricing",
    body: "We tell you what your project actually needs, put it in writing and stick to it. If something isn't worth building, we'll say so.",
  },
  {
    title: "Quality you can inspect",
    body: "Fast pages, accessible interfaces and clean, documented code that any competent developer could pick up after us.",
  },
  {
    title: "Here after launch",
    body: "Every project includes a support period, and ongoing maintenance is available for clients who want it.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="About"
          title={
            <>
              A software studio built around doing the work <em>properly</em>
            </>
          }
          intro="Noverstorm Tech Solutions designs and builds websites, platforms and integrations for businesses that need them to work, and to keep working."
        />

        {/* Story and facts */}
        <section aria-label="Our story" className="border-b">
          <div className="container mx-auto grid gap-12 px-4 py-20 md:py-28 lg:grid-cols-12">
            <div className="space-y-5 text-muted-foreground lg:col-span-7">
              <p className="eyebrow">Our story</p>
              <p className="pt-2 font-serif text-3xl leading-snug text-foreground text-pretty">
                Noverstorm was founded on a simple idea: businesses deserve software that is fast,
                reliable and built with care, and they deserve to understand what they&apos;re paying for.
              </p>
              <p>
                We&apos;ve delivered work across very different industries: a corporate website for an
                engineering and construction firm, the web presence of a professional services company
                working across government and trade, a fleet and project showcase for a marine operations
                company, a full exam-preparation platform with subscriptions and referrals, an AI-assisted
                newsletter platform, and an automated outreach system that runs around the clock.
              </p>
              <p>
                We own each project end to end: architecture, interface design, databases, integrations,
                deployment and support. The goal is always the same: turn an idea into something robust,
                fast and ready for real customers.
              </p>
            </div>
            <dl className="self-start border lg:col-span-5">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b px-5 py-4 text-sm last:border-b-0">
                  <dt className="text-muted-foreground">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* How we work */}
        <section aria-label="How we work" className="relative isolate overflow-hidden border-b">
          <ScrollLine shape="cornerLeft" />
          <div className="container mx-auto grid gap-12 px-4 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="How we work"
                title={
                  <>
                    Small by <em>design</em>
                  </>
                }
                intro="We deliberately take on a limited number of projects at a time. Every client gets senior attention from the first call to launch day, and a single point of contact who knows their project inside out."
              />
            </div>
            <div className="grid gap-px self-start border bg-border sm:grid-cols-2 lg:col-span-7">
              {values.map((v, i) => (
                <div key={v.title} className="bg-background p-6 md:p-8">
                  <Index n={i + 1} />
                  <h3 className="mt-6 font-semibold tracking-tight">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClientStrip />
        <Testimonials />
      </main>
      <CtaBand
        title={
          <>
            Let&apos;s talk about <em className="!text-white/90">your project</em>
          </>
        }
      />
      <SiteFooter />
    </div>
  )
}
