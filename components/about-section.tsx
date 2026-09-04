"use client"

import { useState } from "react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { WindowControls } from "@/components/window-controls"
import { openTerminal } from "@/components/terminal"

const facts: { label: string; value: string }[] = [
  { label: "company", value: "Noverstorm Tech Solutions Ltd" },
  { label: "founder", value: "noble <dev/>" },
  { label: "team", value: "Engineers · designers · remote" },
  { label: "practice", value: "Web apps · platforms · integrations" },
  { label: "stack", value: "Next.js · TypeScript · Django" },
  { label: "base", value: "Remote · worldwide" },
  { label: "status", value: "available for new projects" },
]

type WindowState = "open" | "collapsed" | "closed"

export function AboutSection() {
  const [windowState, setWindowState] = useState<WindowState>("open")

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
          {windowState === "closed" ? (
            <button
              type="button"
              onClick={() => setWindowState("open")}
              className="flex items-center gap-2 border border-emerald-600/30 bg-muted/40 px-4 py-3 font-mono text-sm text-muted-foreground transition-colors hover:border-emerald-600/60 hover:text-foreground"
            >
              <span className="text-emerald-600 dark:text-emerald-400">$</span>
              whoami
              <span className="text-xs opacity-60">reopen</span>
            </button>
          ) : (
          <Card className="overflow-hidden border-emerald-600/20 font-mono text-sm">
            <CardHeader className="flex-row items-center gap-2 space-y-0 border-b bg-muted/50 px-4 py-3">
              <WindowControls
                size="md"
                onClose={() => setWindowState("closed")}
                onMinimize={() =>
                  setWindowState((w) => (w === "collapsed" ? "open" : "collapsed"))
                }
                onMaximize={() => openTerminal(true)}
                labels={{
                  close: "Close window",
                  minimize: windowState === "collapsed" ? "Expand window" : "Collapse window",
                  maximize: "Open full terminal",
                }}
              />
              <span className="flex-1 text-center text-xs text-muted-foreground">
                guest@noverstorm: ~
              </span>
            </CardHeader>
            {windowState === "open" && (
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
            )}
          </Card>
          )}
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll className="mt-10 sm:mt-12">
        <p className="max-w-2xl border-l-2 border-emerald-500/50 pl-5 text-sm text-muted-foreground sm:pl-6">
          Noverstorm is founded and led by{" "}
          <span className="font-mono text-foreground">
            noble <span className="text-emerald-500">{"<dev/>"}</span>
          </span>
          , working with a team of engineers and designers who carry each project
          from architecture through to deployment and post-launch support.
        </p>
      </AnimateOnScroll>
    </section>
  )
}
