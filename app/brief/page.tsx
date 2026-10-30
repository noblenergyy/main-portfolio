import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectBriefForm } from "@/components/project-brief-form"
import { SITE_NAME } from "@/lib/site"

const TITLE = "Project Questionnaire"
const DESCRIPTION =
  "Tell us about the website you need. A few easy questions, no technical knowledge required, and we'll come back with a plan and a quote."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/brief",
  },
  openGraph: {
    type: "website",
    url: "/brief",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
}

export default function BriefPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="eyebrow mb-6">
          Start a project
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Tell us about your website</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Six short steps, about 5 minutes. No technical knowledge needed: if you&apos;re unsure
          about anything, pick &ldquo;Not sure&rdquo; or skip it and we&apos;ll talk it through.
          Only your name, contact details and the type of website are required.
        </p>

        <div className="mt-12">
          <ProjectBriefForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
