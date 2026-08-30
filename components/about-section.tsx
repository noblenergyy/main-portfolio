"use client"

import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"

const facts: { label: string; value: string }[] = [
  { label: "company", value: "Noverstorm Tech Solutions Ltd" },
  { label: "founder", value: "Noble Okorie Chibueze" },
  { label: "practice", value: "Web apps · platforms · integrations" },
  { label: "stack", value: "Next.js · TypeScript · Django" },
  { label: "base", value: "Remote · worldwide" },
  { label: "status", value: "available for new projects" },
]

export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="container mx-auto px-4 py-14 sm:py-16 md:py-24"
    >
      <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
        <AnimateOnScroll className="space-y-4">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
              01 // about
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              About Noverstorm
            </h2>
          </div>
          <p className="text-muted-foreground">
            Noverstorm Tech Solutions is a software development studio that cares
            about the details which make software feel effortless: fast loads, clean
            interfaces, and backends that hold up under pressure. We build digital
            products at the intersection of commerce, technology, and scale.
          </p>
          <p className="text-muted-foreground">
            We have shipped production work for companies across industries: corporate
            sites for professional services and manufacturing firms, an AI-powered
            newsletter platform, an e-mobility company&apos;s web presence, and a full
            exam-prep platform with payments, referrals, and subscriptions.
          </p>
          <p className="text-muted-foreground">
            When we take on a project, we own it end to end: architecture, UI, database
            design, integrations, and deployment. The goal is always the same: turn an
            idea into something robust, fast, and ready for real users.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delayMs={100}>
          <Card className="overflow-hidden border-emerald-600/20 font-mono text-sm">
            <CardHeader className="flex-row items-center gap-2 space-y-0 border-b bg-muted/50 px-4 py-3">
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-red-400" />
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-yellow-400" />
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-green-400" />
              <span className="flex-1 text-center text-xs text-muted-foreground">
                guest@noverstorm: ~
              </span>
            </CardHeader>
            <CardContent className="space-y-2 p-5">
              <p>
                <span className="text-emerald-600 dark:text-emerald-400">$</span> whoami
              </p>
              {facts.map((f) => (
                <p key={f.label} className="pl-4">
                  <span className="text-muted-foreground">{f.label}:</span>{" "}
                  <span>{f.value}</span>
                </p>
              ))}
              <p className="pt-1">
                <span className="text-emerald-600 dark:text-emerald-400">$</span>{" "}
                <span
                  aria-hidden="true"
                  className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-emerald-500"
                />
              </p>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll className="mt-12 sm:mt-16">
        <div className="border-l-2 border-emerald-500/50 pl-5 sm:pl-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            founder
          </p>
          <h3 className="text-xl font-semibold tracking-tight">
            Noble Okorie Chibueze
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Founder &amp; Lead Engineer
          </p>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Noble founded Noverstorm to give the work he was already delivering a
            proper home: a registered studio clients can contract, brief, and hold to
            a standard. He leads every engagement personally, from architecture and
            implementation through to deployment and post-launch support.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm">
              <a href="https://github.com/noblenergyy" target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href="mailto:noblenergyy@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </a>
            </Button>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  )
}
