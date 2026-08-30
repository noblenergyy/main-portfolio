"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { TerminalSquare, X } from "lucide-react"
import { isStarsEnabled, setStarsEnabled } from "@/components/starfield"
import { ACCENTS, setAccent, type AccentId } from "@/components/accent-picker"

type Line = { kind: "in" | "out" | "ok" | "err"; text: string }

const PROJECT_LINKS: Record<string, string> = {
  hague: "https://thehagueindustries.com",
  papertrail: "https://papertrail-news.vercel.app/",
  dondax: "https://dondaxlimited.com",
  lawangels: "https://lawangelsuk.com",
  latiodus: "https://latiodus.vercel.app/",
  github: "https://github.com/noblenergyy",
}

const HELP: string[] = [
  "available commands:",
  "  help              show this list",
  "  whoami            about Noverstorm",
  "  founder           who runs this studio",
  "  projects          list featured projects",
  "  open <name>       open a project or profile (e.g. open papertrail)",
  "  skills            list the stack",
  "  contact           how to reach us",
  "  theme             toggle dark / light",
  "  stars [on|off]    toggle the constellation on the hero",
  "  color <name>      switch accent (ember, emerald, violet, cyan, gold, white)",
  "  price             what does a project cost?",
  "  clear             clear the screen",
  "  exit              close the terminal",
  "  sudo hire-us      you know you want to",
]

export function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([
    { kind: "ok", text: "noverstorm terminal v1.0.0" },
    { kind: "out", text: "type 'help' to get started." },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { resolvedTheme, setTheme } = useTheme()

  const print = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines])
  }, [])

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim()
      const echo: Line = { kind: "in", text: cmd }
      if (!cmd) return
      const [name, ...args] = cmd.toLowerCase().split(/\s+/)
      const arg = args.join(" ")

      const out = (...texts: string[]) =>
        print([echo, ...texts.map((text): Line => ({ kind: "out", text }))])
      const ok = (...texts: string[]) =>
        print([echo, ...texts.map((text): Line => ({ kind: "ok", text }))])
      const err = (text: string) => print([echo, { kind: "err", text }])

      switch (name) {
        case "help":
          out(...HELP)
          break
        case "whoami":
        case "about":
          out(
            "Noverstorm Tech Solutions Ltd",
            "software development studio · remote, worldwide",
            "React, Next.js, TypeScript on the front. Node.js, Django, PostgreSQL behind.",
            "status: available for new projects",
            "",
            "try: founder",
          )
          break
        case "founder":
          out(
            "Noble Okorie Chibueze",
            "Founder & Lead Engineer",
            "Leads every engagement from architecture through to deployment.",
            "github.com/noblenergyy",
          )
          break
        case "projects":
          out(
            "the-hague-industries   corporate site        [SHIPPED]",
            "papertrail             AI newsletter         [IN PROGRESS]",
            "dondax                 e-mobility site       [SHIPPED]",
            "lawangels              exam-prep platform    [SHIPPED]",
            "latiodus               marine operations     [SHIPPED]",
            "",
            "try: open papertrail",
          )
          break
        case "open": {
          const key = Object.keys(PROJECT_LINKS).find((k) => arg.includes(k))
          if (key) {
            window.open(PROJECT_LINKS[key], "_blank", "noopener")
            ok(`opening ${key}...`)
          } else {
            err(`unknown target: ${arg || "(none)"}. try: hague, papertrail, dondax, lawangels, latiodus, github`)
          }
          break
        }
        case "skills":
          out(
            "frontend:  react, next.js, typescript, tailwind css",
            "backend:   node.js, python, django, postgresql",
            "tools:     stripe, supabase, openai, git, vercel",
          )
          break
        case "contact":
          out("email:  noblenergyy@gmail.com", "form:   scroll down, it works.")
          break
        case "theme": {
          const next = resolvedTheme === "dark" ? "light" : "dark"
          setTheme(next)
          ok(`theme set to ${next}`)
          break
        }
        case "stars":
        case "grid":
        case "rain": {
          const want = arg === "on" ? true : arg === "off" ? false : !isStarsEnabled()
          setStarsEnabled(want)
          ok(`stars ${want ? "enabled" : "disabled"}`)
          break
        }
        case "color":
        case "accent": {
          const found = ACCENTS.find((a) => a.id === arg)
          if (found) {
            setAccent(found.id as AccentId)
            ok(`accent set to ${found.id}`)
          } else if (!arg) {
            out(`available accents: ${ACCENTS.map((a) => a.id).join(", ")}`)
          } else {
            err(`unknown accent: ${arg}. try: ${ACCENTS.map((a) => a.id).join(", ")}`)
          }
          break
        }
        case "price":
        case "pricing":
          out("text me lol  email: noblenergyy@gmail.com")
          break
        case "clear":
          setLines([])
          break
        case "exit":
        case "quit":
          setOpen(false)
          break
        case "sudo":
          if (arg.includes("hire-us") || arg.includes("hire-noverstorm") || arg.includes("hire-noble")) {
            ok("[sudo] password for guest: ********", "ACCESS GRANTED.", "redirecting to contact form...")
            window.setTimeout(() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }, 900)
          } else {
            err("guest is not in the sudoers file. this incident will be reported.")
          }
          break
        case "konami":
          out("nice try. use the arrow keys.")
          break
        case "echo":
          out(args.length ? raw.trim().slice(5) : "")
          break
        case "date":
          out(new Date().toString())
          break
        default:
          err(`command not found: ${name}. type 'help'.`)
      }
    },
    [print, resolvedTheme, setTheme],
  )

  // Toggle with backtick when not typing elsewhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "`") return
      const target = e.target as HTMLElement
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable
      if (typing && target !== inputRef.current) return
      e.preventDefault()
      setOpen((o) => !o)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setHistory((prev) => [...prev, input])
    }
    setHistoryIndex(-1)
    run(input)
    setInput("")
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      if (history[next] !== undefined) {
        setHistoryIndex(next)
        setInput(history[next])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === -1) return
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(-1)
        setInput("")
      } else {
        setHistoryIndex(next)
        setInput(history[next])
      }
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close terminal" : "Open terminal"}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center border border-emerald-500/50 bg-background text-emerald-600 transition-colors hover:bg-emerald-500/10 dark:text-emerald-400"
      >
        {open ? <X className="h-5 w-5" /> : <TerminalSquare className="h-5 w-5" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Interactive terminal"
          className="fixed bottom-20 right-5 z-50 flex w-[min(540px,calc(100vw-2.5rem))] flex-col overflow-hidden border border-emerald-500/50 bg-[#0f0b0a] font-mono text-[13px] text-neutral-200 shadow-2xl"
        >
          <div className="flex items-center gap-1.5 border-b border-emerald-500/20 bg-[#161110] px-3 py-2">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="flex-1 text-center text-[11px] text-neutral-500">guest@noverstorm: ~</span>
          </div>
          <div ref={bodyRef} className="h-72 overflow-y-auto p-3 leading-relaxed">
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap break-words">
                {line.kind === "in" ? (
                  <span>
                    <span className="text-emerald-400">$ </span>
                    {line.text}
                  </span>
                ) : (
                  <span
                    className={
                      line.kind === "err"
                        ? "text-red-400"
                        : line.kind === "ok"
                          ? "text-emerald-400"
                          : "text-neutral-300"
                    }
                  >
                    {line.text}
                  </span>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-emerald-500/20 px-3 py-2">
            <span className="text-emerald-400">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              className="w-full bg-transparent text-[16px] text-neutral-100 caret-emerald-400 outline-none placeholder:text-neutral-600 sm:text-[13px]"
              placeholder="type 'help'"
            />
          </form>
        </div>
      )}
    </>
  )
}
