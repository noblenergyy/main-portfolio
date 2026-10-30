"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Loader2, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PhoneInput } from "@/components/phone-input"
import { briefSteps, type BriefQuestion } from "@/lib/brief"

// Same Web3Forms account as the contact form: submissions go to the owner's inbox.
const WEB3FORMS_ACCESS_KEY = "f04520ce-b227-449c-b64d-cf13388a42b4"

function Question({ q }: { q: BriefQuestion }) {
  const labelText = (
    <>
      {q.label}
      {q.required && <span className="text-emerald-600 dark:text-emerald-400"> *</span>}
    </>
  )
  const hint = q.hint && <p className="text-sm text-muted-foreground">{q.hint}</p>

  if (q.type === "radio" || q.type === "checkbox") {
    return (
      <fieldset data-question className="grid gap-3">
        <legend className="mb-1 text-sm font-medium">{labelText}</legend>
        {hint}
        <div className="grid gap-2 sm:grid-cols-2">
          {q.options?.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-start gap-3 border bg-background px-4 py-3 text-sm transition-colors hover:border-emerald-600/40 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-600/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-500"
            >
              <input
                type={q.type}
                name={q.name}
                value={option}
                required={q.required}
                className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    )
  }

  return (
    <div data-question className="grid gap-2">
      <label htmlFor={`brief-${q.name}`} className="text-sm font-medium">
        {labelText}
      </label>
      {hint}
      {q.type === "phone" ? (
        <PhoneInput />
      ) : q.type === "textarea" ? (
        <Textarea id={`brief-${q.name}`} name={q.name} placeholder={q.placeholder} required={q.required} rows={4} />
      ) : (
        <Input id={`brief-${q.name}`} name={q.name} type={q.type} placeholder={q.placeholder} required={q.required} />
      )}
    </div>
  )
}

export function ProjectBriefForm() {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const formRef = useRef<HTMLFormElement | null>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const last = briefSteps.length - 1

  // Every step stays mounted (only hidden) so answers survive going back and forth.
  // That means native validation can't run on submit, so each step checks itself.
  const stepIsValid = () => {
    const fields = stepRefs.current[step]?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
    const invalid = Array.from(fields ?? []).find((f) => !f.checkValidity())
    if (!invalid) return true
    invalid.reportValidity()
    invalid.closest("[data-question]")?.scrollIntoView({ behavior: "smooth", block: "center" })
    return false
  }

  const goTo = (next: number) => {
    setStep(next)
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!stepIsValid()) return
    // Enter in a text field submits the form; on earlier steps that means "next".
    if (step < last) {
      goTo(step + 1)
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: real users never fill this hidden field
    if (data.get("botcheck")) {
      setStatus("success")
      return
    }

    // One email field per answered question, labelled with the question itself.
    const answers: Record<string, string> = {}
    for (const s of briefSteps) {
      for (const q of s.questions) {
        const value = data.getAll(q.name).map(String).map((v) => v.trim()).filter(Boolean).join(", ")
        if (value) answers[q.label] = value
      }
    }

    const name = String(data.get("name") ?? "")
    const business = String(data.get("business") ?? "").trim()

    setStatus("loading")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New project brief from ${business || name}`,
          from_name: "Noverstorm project questionnaire",
          replyto: data.get("email"),
          ...answers,
        }),
      })
      const json = await res.json()
      setStatus(json.success ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 border py-16 text-center">
        <CheckCircle className="h-10 w-10 text-emerald-600" />
        <p className="text-lg font-semibold">Thank you, we&apos;ve got your answers.</p>
        <p className="max-w-md text-sm text-muted-foreground">
          We&apos;ll read through everything and get back to you within 1 to 2 business days
          with questions or a proposal.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-2">
          <Link href="/">Back to the homepage</Link>
        </Button>
      </div>
    )
  }

  const current = briefSteps[step]

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="scroll-mt-24">
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" className="hidden" />

      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em]">
          <span className="text-emerald-600 dark:text-emerald-400">
            step {step + 1} of {briefSteps.length}
          </span>
          <span className="text-muted-foreground">{current.title}</span>
        </div>
        <div
          className="h-1 w-full bg-muted"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={briefSteps.length}
          aria-valuenow={step + 1}
          aria-label="Questionnaire progress"
        >
          <div
            className="h-full bg-emerald-600 transition-[width] duration-300"
            style={{ width: `${((step + 1) / briefSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {briefSteps.map((s, i) => (
        <div
          key={s.title}
          ref={(el) => {
            stepRefs.current[i] = el
          }}
          hidden={i !== step}
        >
          <h2 className="text-2xl font-semibold tracking-tight">{s.title}</h2>
          <p className="mt-1 text-muted-foreground">{s.intro}</p>
          <div className="mt-8 grid gap-8">
            {s.questions.map((q) => (
              <Question key={q.name} q={q} />
            ))}
          </div>
        </div>
      ))}

      {status === "error" && (
        <div className="mt-6 flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong sending your answers. Please try again, or email us at
          hello.noverstorm@gmail.com.
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-3 border-t pt-6">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => goTo(step - 1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < last ? (
          <Button type="submit">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send my answers
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}
