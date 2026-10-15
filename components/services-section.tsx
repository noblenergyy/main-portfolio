"use client"

import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    tag: "./product",
    title: "MVPs & SaaS platforms",
    body: "From idea to production: auth, payments, dashboards, and AI features. Everything a product needs to take real users on day one.",
  },
  {
    tag: "./web",
    title: "Corporate & marketing sites",
    body: "Fast, credible websites that carry a brand's weight. Built to load instantly, rank well, and turn visitors into inquiries.",
  },
  {
    tag: "./integrations",
    title: "Platforms & integrations",
    body: "Stripe billing, subscriptions, referral systems, admin panels, and third-party APIs wired into one reliable system.",
  },
]

const steps = [
  { n: "01", title: "Scope", body: "We define goals, features, and a timeline. You get a clear spec and a fixed picture of what ships." },
  { n: "02", title: "Build", body: "We build in weekly increments with live previews, so you watch it come together and steer early." },
  { n: "03", title: "Ship", body: "Deployment, domains, SEO, and analytics handled. It goes live fast and stays fast." },
  { n: "04", title: "Support", body: "Post-launch fixes and iteration. The relationship does not end at deploy." },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="container mx-auto px-4 py-14 sm:py-16 md:py-24"
    >
      <AnimateOnScroll>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          04 // services
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">Work with us</h2>
        <p className="mt-1 text-muted-foreground">
          What we build, and how a project runs from first call to launch.
        </p>
      </AnimateOnScroll>

      {/* What we build */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <AnimateOnScroll key={s.title} delayMs={80 * i}>
            <Card className="h-full transition-colors hover:border-emerald-600/40">
              <CardContent className="flex h-full flex-col p-6">
                <p className="font-mono text-xs tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                  {s.tag}
                </p>
                <h3 className="mt-4 font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        ))}
      </div>

      {/* How a project runs: a horizontal timeline, deliberately a different
          rhythm from the cards above so the two blocks read as separate. */}
      <AnimateOnScroll className="mt-16 sm:mt-20">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          how a project runs
        </p>
      </AnimateOnScroll>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <AnimateOnScroll key={step.n} delayMs={80 * i}>
            <div className="border-t-2 border-emerald-500/40 pt-4">
              <p className="font-mono text-xs tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                {step.n}
              </p>
              <h3 className="mt-2 font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      <AnimateOnScroll className="mt-14 sm:mt-16">
        <div className="flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:gap-8">
          <Button asChild size="lg" className="sm:shrink-0">
            <a href="#contact">Start a project</a>
          </Button>
          <p className="max-w-md text-sm text-muted-foreground">
            Engagements are contracted through Noverstorm Tech Solutions Ltd, with a
            written scope, agreed milestones, and formal invoicing.
          </p>
        </div>
      </AnimateOnScroll>
    </section>
  )
}
