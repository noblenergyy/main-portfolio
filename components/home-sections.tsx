import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading, Index } from "@/components/page-parts"
import { ScrollLine } from "@/components/scroll-line"
import { caseStudies, type CaseStudy } from "@/lib/projects"
import { stack } from "@/lib/services"

/** Large spotlight on one case study: image, summary and highlights. */
export function FeaturedCaseStudy({ project }: { project: CaseStudy }) {
  const highlights = project.features.slice(0, 4)
  const secondary = project.gallery?.[0]

  return (
    <section aria-label="Featured case study" className="border-b">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <SectionHeading
          eyebrow="Featured case study"
          title={
            <>
              From idea to a system that <em>runs itself</em>
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-7">
            <div className="box-3d-lg relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} dashboard`}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
            {secondary && (
              <div className="box-3d absolute -bottom-8 right-4 hidden w-[42%] overflow-hidden sm:block md:-right-6">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={secondary.image}
                    alt={`${project.title}: ${secondary.caption}`}
                    fill
                    className="object-cover object-top"
                    sizes="25vw"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {project.title}
            </p>
            <p className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-pretty">
              {project.description}
            </p>
            <ul className="mt-8 border-t">
              {highlights.map((h, i) => (
                <li key={h} className="flex gap-4 border-b py-4 text-sm">
                  <Index n={i + 1} className="text-lg" />
                  <span className="pt-0.5">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/projects/${project.slug}`}>
                  Read the case study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {project.demo && (
                <Button asChild variant="outline">
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    Live demo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const industries = [
  { name: "Engineering & construction", slug: "b-cijval-engineering" },
  { name: "Professional services", slug: "the-hague-industries" },
  { name: "Marine & dredging", slug: "latiodus" },
  { name: "Education & exam prep", slug: "lawangels" },
  { name: "Media & publishing", slug: "papertrail" },
  { name: "Sales & lead generation", slug: "gogetter" },
]

/** Industries served, each linked to the project that proves it. */
export function Industries() {
  const items = industries
    .map((i) => ({ ...i, project: caseStudies.find((c) => c.slug === i.slug) }))
    .filter((i) => i.project)

  return (
    <section aria-label="Industries" className="border-b bg-muted/30">
      <div className="container mx-auto grid gap-12 px-4 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Industries"
            title={
              <>
                Built for businesses <em>like yours</em>
              </>
            }
            intro="We've shipped work across very different sectors. Whatever yours is, we take the time to understand how it actually works."
          />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {items.map((i, n) => (
            <li key={i.slug}>
              <Link
                href={`/projects/${i.slug}`}
                className="box-3d group flex h-full items-center justify-between gap-4 p-5 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-4">
                  <Index n={n + 1} className="text-xl" />
                  <span>
                    <span className="block font-semibold tracking-tight">{i.name}</span>
                    <span className="block text-sm text-muted-foreground">{i.project!.title}</span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** The tools we build with, in a boxed grid. */
export function StackGrid() {
  return (
    <section aria-label="Technology" className="relative isolate overflow-hidden border-b">
      <ScrollLine shape="cornerRight" />
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Technology"
            title={
              <>
                A proven, <em>modern</em> stack
              </>
            }
            intro="Well-supported tools that are fast, secure and easy for any developer to pick up, so you're never locked in."
          />
        </div>
        <div className="mt-14 grid border-l border-t sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((group) => (
            <div key={group.title} className="border-b border-r p-6 md:p-8">
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="border px-2.5 py-1 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const faqs = [
  {
    q: "How much does a website or platform cost?",
    a: "Every project is quoted individually, because a five-page company website and a platform with payments and user accounts are very different jobs. Fill in our project questionnaire and we'll come back with a written proposal and a fixed quote.",
  },
  {
    q: "How long will it take?",
    a: "It depends on scope. Your proposal includes a milestone schedule before any work starts, and once we begin you get weekly updates and a live preview link, so you always know where things stand.",
  },
  {
    q: "Do you work with clients outside your country?",
    a: "Yes. We work remotely with clients worldwide, across time zones, with calls scheduled at times that suit you and all communication in writing so nothing is lost.",
  },
  {
    q: "What do I need to get started?",
    a: "Just an idea of what you want to achieve. You don't need technical knowledge. Our questionnaire asks plain-English questions, and we'll guide you through domains, hosting, content and everything else.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a support period for fixes and adjustments. After that, you can manage the site yourself, or keep us on for ongoing maintenance and improvements.",
  },
]

export function HomeFaq() {
  return (
    <section aria-label="Frequently asked questions" className="relative isolate overflow-hidden border-b">
      <ScrollLine shape="cornerLeft" />
      <div className="container mx-auto grid gap-12 px-4 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Questions, <em>answered</em>
              </>
            }
            intro="Something else on your mind? Ask us directly, we're happy to help."
          />
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline">
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="border-t lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="box-3d flex h-8 w-8 shrink-0 items-center justify-center">
                  <Plus aria-hidden="true" className="h-4 w-4 transition-transform group-open:rotate-45" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
