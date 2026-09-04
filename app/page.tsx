"use client"

import { Github, Mail, Phone } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { caseStudies } from "@/lib/projects"
import { ThemeToggle } from "@/components/theme-toggle"
import { ContactForm } from "@/components/contact-form"
import { ProjectCard } from "@/components/project-card"
import { FunEffects } from "@/components/fun-effects"
import { AboutSection } from "@/components/about-section"
import { SkillsGrid } from "@/components/skills-grid"
import { Marquee } from "@/components/marquee"
import { Terminal } from "@/components/terminal"
import { ServicesSection } from "@/components/services-section"
import { Starfield } from "@/components/starfield"
import { AccentPicker } from "@/components/accent-picker"
import { LogoMark, LogoFull } from "@/components/logo"

export default function Page() {
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && target.closest("a[href^='#']")) {
        const anchor = target.closest("a") as HTMLAnchorElement
        const id = anchor.getAttribute("href")?.replace("#", "") || ""
        const el = document.getElementById(id)
        if (el) {
          e.preventDefault()
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [])

  return (
    <div className="min-h-dvh text-foreground">
      <FunEffects />
      <Terminal />
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgb(var(--accent-500)/0.1),_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,_rgb(var(--accent-500)/0.16),_transparent_50%)]"
      />
      <div aria-hidden="true" className="bg-grid-overlay pointer-events-none fixed inset-0 -z-10" />
      <div aria-hidden="true" className="scanlines-overlay pointer-events-none fixed inset-0 -z-10" />
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="#" className="flex items-center gap-2.5">
            <LogoMark className="h-7" priority />
            <span className="glitch-hover font-semibold tracking-tight">
              NOVERSTORM<span className="text-emerald-500">.</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
            <Link href="#about" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
              about
            </Link>
            <Link href="#projects" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
              projects
            </Link>
            <Link href="#skills" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
              skills
            </Link>
            <Link href="#services" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
              services
            </Link>
            <Link href="#contact" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
              contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
              <a href="https://github.com/noblenergyy" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <AccentPicker />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main role="main">
        {/* Hero */}
        <section
          aria-label="Hero"
          className="relative overflow-hidden border-b"
        >
          <Starfield />
          <div className="container relative z-10 mx-auto flex flex-col items-center px-4 py-20 text-center sm:py-24 md:py-32">
            <AnimateOnScroll className="flex flex-col items-center space-y-6">
              <LogoMark className="h-20 sm:h-24 md:h-28" priority />
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
                <span aria-hidden="true" className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Available for new projects
              </p>
              <h1 className="glitch-hover cursor-default whitespace-nowrap text-[clamp(2rem,9.5vw,7.5rem)] font-bold leading-none tracking-tighter">
                NOVER
                <span className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                  STORM
                </span>
                <span className="text-emerald-500">.</span>
              </h1>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
                Tech Solutions · Software Development Studio
              </p>
              <p className="max-w-xl text-balance text-muted-foreground">
                We build digital products at the intersection of commerce, technology,
                and scale: modern web apps with React, Next.js, and clean backend
                architecture, shipped production-ready.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                <Button asChild size="lg">
                  <a href="#projects">View Projects</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </a>
                </Button>
              </div>
              <p className="pt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Founded by Noble<span className="text-emerald-500">.</span>dev
              </p>
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="icon" aria-label="Email">
                  <a href="mailto:hello.noverstorm@gmail.com">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="Phone">
                  <a href="tel:+2349130129226">
                    <Phone className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Skills marquee */}
        <Marquee />

        <Separator className="fade-divider" />

        {/* About */}
        <AboutSection />

        <Separator className="fade-divider" />

        {/* Projects */}
        <section
          id="projects"
          aria-label="Projects"
          className="container mx-auto px-4 py-14 sm:py-16 md:py-24"
        >
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
                02 // projects
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Featured Projects
              </h2>
              <p className="text-muted-foreground">
                Selected work we have delivered for clients.
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <Button asChild variant="outline">
                <a href="https://github.com/noblenergyy" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((p, i) => (
              <AnimateOnScroll key={p.slug} delayMs={50 * i}>
                <ProjectCard project={p} />
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        <Separator className="fade-divider" />

        {/* Skills */}
        <section
          id="skills"
          aria-label="Skills"
          className="container mx-auto px-4 py-14 sm:py-16 md:py-24"
        >
          <AnimateOnScroll>
            <div className="mb-6 sm:mb-8">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
                03 // skills
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Skills and Tools
              </h2>
              <p className="mt-1 text-muted-foreground">
                The stack we use to take products from idea to production.
              </p>
            </div>
            <SkillsGrid />
          </AnimateOnScroll>
        </section>

        <Separator className="fade-divider" />

        {/* Services */}
        <ServicesSection />

        <Separator />

        {/* Contact */}
        <section
          id="contact"
          aria-label="Contact"
          className="container mx-auto px-4 py-14 sm:py-16 md:py-24"
        >
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
            <AnimateOnScroll className="space-y-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
                  05 // contact
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Let us build something great
                </h2>
              </div>
              <p className="text-muted-foreground">
                Have a project, partnership, or idea in mind? We would love to
                hear from you, and we respond within 1 to 2 business days.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <a href="mailto:hello.noverstorm@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    hello.noverstorm@gmail.com
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href="https://github.com/noblenergyy" target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <Card className="border-emerald-600/20">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription />
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <footer
        role="contentinfo"
        className="border-t bg-muted/30 text-sm text-muted-foreground"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 pt-6 pb-24 md:pr-24 md:pb-6">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <LogoFull className="h-14" />
            <p>
              {'©'} {new Date().getFullYear()} Noverstorm Tech Solutions Ltd. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.2em]">
              <a href="#about" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                about
              </a>
              <a href="#projects" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                projects
              </a>
              <a href="#skills" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                skills
              </a>
              <a href="#contact" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                contact
              </a>
            </div>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 md:block">
              press {'`'} to open the terminal
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
