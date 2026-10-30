import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader, CtaBand } from "@/components/page-parts"
import { ClientStrip } from "@/components/trust"
import { ProjectCard } from "@/components/project-card"
import { caseStudies } from "@/lib/projects"

const DESCRIPTION =
  "A selection of the 50+ websites, platforms and tools Noverstorm Tech Solutions has designed, built and launched for clients across professional services, engineering, education and more."

export const metadata: Metadata = {
  title: "Our Work",
  description: DESCRIPTION,
  alternates: { canonical: "/work" },
  openGraph: { type: "website", url: "/work", title: "Our Work", description: DESCRIPTION },
}

export default function WorkPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="Work"
          line="headerSwirl"
          title={
            <>
              A selection of our <em>work</em>
            </>
          }
          intro="A few highlights from the 50+ projects we've delivered, from corporate websites to full platforms. Open any of them for the full case study: the problem, what we built and how it works."
        />
        <ClientStrip />
        <section aria-label="Projects">
          <div className="container mx-auto grid gap-6 px-4 py-20 md:grid-cols-2 md:py-24 lg:grid-cols-3">
            {caseStudies.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      </main>
      <CtaBand
        title={
          <>
            Want results <em className="!text-white/90">like these?</em>
          </>
        }
      />
      <SiteFooter />
    </div>
  )
}
