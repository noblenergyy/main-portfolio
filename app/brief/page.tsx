import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
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
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 text-sm hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            back to noverstorm
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          start a project
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Tell us about your website</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Six short steps, about 5 minutes. No technical knowledge needed: if you&apos;re unsure
          about anything, pick &ldquo;Not sure&rdquo; or skip it and we&apos;ll talk it through.
          Only your name, contact details and the type of website are required.
        </p>

        <div className="mt-12">
          <ProjectBriefForm />
        </div>
      </main>
    </div>
  )
}
