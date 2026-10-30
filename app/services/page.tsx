import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader, SectionHeading, CtaBand, Index } from "@/components/page-parts"
import { services, processSteps, stack } from "@/lib/services"
import { COMPANY } from "@/lib/site"

const DESCRIPTION =
  "Business websites, web applications, integrations and SEO from Noverstorm Tech Solutions, with a clear process from first call to launch."

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { type: "website", url: "/services", title: "Services", description: DESCRIPTION },
}

export default function ServicesPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="Services"
          title={
            <>
              Everything you need to get your business online and <em>growing</em>
            </>
          }
          intro="Design, development, launch and support, handled by one studio with one point of contact."
        />

        {/* Service lines */}
        <section aria-label="What we offer" className="border-b">
          <div className="container mx-auto px-4">
            {services.map((s, i) => (
              <div
                key={s.slug}
                id={s.slug}
                className="grid scroll-mt-20 gap-8 border-b py-14 last:border-b-0 md:grid-cols-12 md:py-20"
              >
                <div className="md:col-span-5">
                  <Index n={i + 1} />
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">{s.title}</h2>
                  <p className="mt-4 text-muted-foreground">{s.summary}</p>
                  {s.href && (
                    <Link href={s.href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
                <ul className="border md:col-span-6 md:col-start-7">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 border-b px-5 py-4 text-sm last:border-b-0">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Process with deliverables */}
        <section aria-label="Process" className="border-b">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <SectionHeading
              eyebrow="Process"
              title={
                <>
                  How a project <em>runs</em>
                </>
              }
              intro="Six stages, each ending with something concrete in your hands."
            />
            <ol className="mt-12 border">
              {processSteps.map((step, i) => (
                <li key={step.title} className="grid gap-2 border-b p-6 last:border-b-0 md:grid-cols-12 md:gap-8 md:p-8">
                  <Index n={i + 1} className="md:col-span-1" />
                  <h3 className="font-semibold tracking-tight md:col-span-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-5">{step.body}</p>
                  <p className="text-sm md:col-span-4">
                    <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">You receive</span>
                    {step.deliverable}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
              Engagements are contracted through {COMPANY.legalName}, with a written scope, agreed
              milestones and formal invoicing.
            </p>
          </div>
        </section>

        {/* Technology */}
        <section aria-label="Technology" className="border-b">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <SectionHeading
              eyebrow="Technology"
              title={
                <>
                  A proven, <em>modern</em> stack
                </>
              }
              intro="We use well-supported tools that are fast, secure and easy for other developers to pick up, so you're never locked in."
            />
            <div className="mt-12 grid border-l border-t sm:grid-cols-2 lg:grid-cols-4">
              {stack.map((group) => (
                <div key={group.title} className="border-b border-r p-6">
                  <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{group.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
      <SiteFooter />
    </div>
  )
}
