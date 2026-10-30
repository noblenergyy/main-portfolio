import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-parts"
import { ContactForm } from "@/components/contact-form"
import { COMPANY } from "@/lib/site"

const DESCRIPTION =
  "Get in touch with Noverstorm Tech Solutions about a new website, platform or integration. We reply within 1 to 2 business days."

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", url: "/contact", title: "Contact Noverstorm", description: DESCRIPTION },
}

const details = [
  { label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { label: "Phone", value: COMPANY.phone, href: COMPANY.phoneHref },
  { label: "Response", value: "Within 1 to 2 business days" },
].filter((d) => d.value)

export default function ContactPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="Contact"
          title={
            <>
              Let&apos;s talk about <em>your project</em>
            </>
          }
          intro="Send us a message, or if you're planning a new website or platform, start with our short questionnaire so we can come back with an accurate plan and quote."
        />

        <section aria-label="Get in touch">
          <div className="container mx-auto grid gap-12 px-4 py-20 md:py-24 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-5">
              <div className="border p-6 md:p-8">
                <p className="eyebrow">New project</p>
                <h2 className="mt-4 text-xl font-semibold tracking-tight">Planning a website or platform?</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Answer a few easy questions about what you need. It takes about 5 minutes, needs no
                  technical knowledge, and helps us quote accurately.
                </p>
                <Button asChild className="mt-6">
                  <Link href="/brief">
                    Start the questionnaire
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <dl className="border">
                {details.map((d) => (
                  <div key={d.label} className="grid grid-cols-[6rem_1fr] gap-4 border-b px-5 py-4 text-sm last:border-b-0">
                    <dt className="text-muted-foreground">{d.label}</dt>
                    <dd className="break-words">
                      {d.href ? (
                        <a href={d.href} className="hover:underline">
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border p-6 md:p-8 lg:col-span-7">
              <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                For general enquiries, partnerships or questions about an existing project.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
