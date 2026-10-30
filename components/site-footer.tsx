import Link from "next/link"
import { LogoFull } from "@/components/logo"
import { COMPANY, NAV } from "@/lib/site"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30 text-sm">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <LogoFull className="h-14" />
          <p className="max-w-xs text-muted-foreground">
            A software development studio building websites, platforms and integrations for
            businesses worldwide.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em]">Company</p>
          <ul className="space-y-2.5 text-muted-foreground">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em]">Services</p>
          <ul className="space-y-2.5 text-muted-foreground">
            <li>
              <Link href="/services" className="transition-colors hover:text-foreground">
                Web development
              </Link>
            </li>
            <li>
              <Link href="/seo" className="transition-colors hover:text-foreground">
                SEO
              </Link>
            </li>
            <li>
              <Link href="/brief" className="transition-colors hover:text-foreground">
                Start a project
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em]">Contact</p>
          <ul className="space-y-2.5 text-muted-foreground">
            <li>
              <a href={`mailto:${COMPANY.email}`} className="break-all transition-colors hover:text-foreground">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={COMPANY.phoneHref} className="transition-colors hover:text-foreground">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={COMPANY.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="container mx-auto select-none overflow-hidden px-4">
        <p className="translate-y-[18%] font-heading text-[19vw] font-semibold leading-[0.8] tracking-[-0.06em] text-foreground/[0.07] 2xl:text-[16rem]">
          Noverstorm
        </p>
      </div>

      <div className="border-t">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
