import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionHeading, CtaBand, ColumnLines, Index } from "@/components/page-parts"
import { ClientStrip, Testimonials } from "@/components/trust"
import { ProjectCard } from "@/components/project-card"
import { Terminal } from "@/components/terminal"
import { caseStudies } from "@/lib/projects"
import { services, processSteps } from "@/lib/services"
import { COMPANY } from "@/lib/site"

const shipped = caseStudies.filter((c) => c.status === "SHIPPED").length

const figures = [
  { value: String(shipped), label: "Projects shipped to production" },
  { value: "End to end", label: "Design, development, launch and support" },
  { value: "Worldwide", label: "Remote-first, working across time zones" },
  { value: "1–2 days", label: "Typical reply to a new enquiry" },
]

const principles = [
  {
    title: "No middlemen",
    body: "You talk directly to the studio designing and building your product. No account managers, no hand-offs, nothing lost in translation.",
  },
  {
    title: "Clear scope, clear price",
    body: `Every engagement starts with a written proposal and agreed milestones, contracted and invoiced through ${COMPANY.legalName}.`,
  },
  {
    title: "Built to last",
    body: "Modern, well-documented code on a proven stack, handed over properly so your site or platform keeps working long after launch.",
  },
]

// Hero showcase: the two most recent client sites, framed like browser windows.
const front = caseStudies.find((c) => c.slug === "b-cijval-engineering") ?? caseStudies[0]
const back = caseStudies.find((c) => c.slug === "the-hague-industries") ?? caseStudies[1]

function BrowserFrame({ project, priority }: { project: (typeof caseStudies)[number]; priority?: boolean }) {
  const host = project.demo ? new URL(project.demo).host.replace(/^www\./, "") : project.slug
  return (
    <div className="border bg-card shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)]">
      <div className="flex items-center gap-3 border-b px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 bg-foreground/15" />
          <span className="h-2 w-2 bg-foreground/15" />
          <span className="h-2 w-2 bg-foreground/15" />
        </span>
        <span className="truncate text-[11px] text-muted-foreground">{host}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} website`}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes="(min-width: 1024px) 40vw, 90vw"
        />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Terminal />
      <SiteHeader />

      <main>
        {/* Hero */}
        <section aria-label="Introduction" className="relative overflow-hidden border-b">
          <ColumnLines />
          <div className="container relative mx-auto grid gap-16 px-4 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-12 lg:items-center">
            <AnimateOnScroll className="lg:col-span-6">
              <p className="eyebrow">Software development studio</p>
              <h1 className="mt-7 text-[clamp(2.75rem,6.2vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-balance">
                We design and build software that businesses <em>run on.</em>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-muted-foreground text-pretty">
                Fast, credible websites, web platforms and integrations for companies that need
                them to work, from the first conversation to launch and beyond.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/brief">
                    Start a project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/work">View our work</Link>
                </Button>
              </div>
              <p className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping bg-emerald-500 opacity-60" />
                  <span className="relative h-2 w-2 bg-emerald-500" />
                </span>
                Now booking projects for the coming months
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delayMs={150} className="lg:col-span-6">
              <div className="relative pb-10 pl-8 sm:pb-14 sm:pl-16">
                <div className="absolute left-0 top-0 w-[64%] opacity-70">
                  <BrowserFrame project={back} />
                </div>
                <div className="relative ml-auto mt-24 w-[78%] sm:mt-32">
                  <BrowserFrame project={front} priority />
                  <Link
                    href={`/projects/${front.slug}`}
                    className="group absolute -bottom-6 -left-6 flex items-center gap-3 border bg-background px-4 py-3 text-sm shadow-lg sm:-left-10"
                  >
                    <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Latest</span>
                    <span className="font-medium">{front.title}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Figures */}
        <section aria-label="At a glance" className="border-b">
          <dl className="container mx-auto grid grid-cols-2 px-4 lg:grid-cols-4">
            {figures.map((f, i) => (
              <div
                key={f.label}
                className={`border-foreground/10 py-10 pr-6 lg:py-12 ${i % 2 === 1 ? "pl-6" : ""} ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 === 1 ? "border-l" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}
              >
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block font-heading text-3xl font-semibold tracking-tight md:text-4xl">{f.value}</span>
                  <span className="mt-2 block text-sm text-muted-foreground">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <ClientStrip />

        {/* Services */}
        <section aria-label="Services" className="border-b">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Services"
                title={
                  <>
                    Everything your business needs <em>online</em>
                  </>
                }
                intro="From a company website to a full platform, we handle design, development and launch under one roof."
              />
              <Link href="/services" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium hover:underline">
                All services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-14 grid border-l border-t sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <Link
                  key={s.slug}
                  href={s.href ?? `/services#${s.slug}`}
                  className="group relative flex flex-col border-b border-r p-6 transition-colors hover:bg-muted/40 md:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-emerald-500 transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <Index n={i + 1} />
                  <h3 className="mt-10 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Selected work */}
        <section aria-label="Selected work" className="border-b">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Work"
                title={
                  <>
                    Selected <em>projects</em>
                  </>
                }
                intro="Websites and platforms we've designed, built and launched for our clients."
              />
              <Link href="/work" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium hover:underline">
                All projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.slice(0, 3).map((p, i) => (
                <AnimateOnScroll key={p.slug} delayMs={60 * i}>
                  <ProjectCard project={p} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Process */}
        <section aria-label="How we work" className="border-b">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <SectionHeading
              eyebrow="Process"
              title={
                <>
                  How a project <em>runs</em>
                </>
              }
              intro="A clear, predictable process, so you always know what's happening and what comes next."
            />
            <ol className="mt-14 grid border-l border-t sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, i) => (
                <li key={step.title} className="border-b border-r p-6 md:p-8">
                  <Index n={i + 1} />
                  <h3 className="mt-8 font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why Noverstorm */}
        <section aria-label="Why Noverstorm" className="border-b">
          <div className="container mx-auto grid gap-12 px-4 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Why Noverstorm"
                title={
                  <>
                    Small by <em>design</em>
                  </>
                }
              />
              <p className="mt-5 text-muted-foreground">
                We take on a limited number of projects at a time, so each one gets senior
                attention from start to finish.
              </p>
              <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline">
                About the studio <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-px self-start border bg-border sm:grid-cols-3 lg:col-span-8">
              {principles.map((p) => (
                <div key={p.title} className="bg-background p-6 md:p-8">
                  <h3 className="font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
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
