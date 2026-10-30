import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/legal-page"
import { COMPANY } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing the use of the ${COMPANY.legalName} website.`,
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="30 October 2026">
      <section>
        <p>
          These terms govern your use of this website, which is operated by {COMPANY.legalName}
          (&ldquo;Noverstorm&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;). By using
          the site, you agree to these terms. If you don&apos;t agree, please don&apos;t use it.
        </p>
      </section>

      <section>
        <h2>1. About this website</h2>
        <p>
          This website describes our services and past work and lets you get in touch with us. It is
          provided for general information only. Nothing on it is professional advice for your particular
          situation.
        </p>
      </section>

      <section>
        <h2>2. Project work</h2>
        <p>
          Nothing on this website is an offer to supply services or a binding contract. Any prices,
          timelines or estimates mentioned are indicative. Every project we take on is governed by a
          separate written proposal or agreement, which sets out the scope, fees, timeline, ownership and
          other terms for that work. If that agreement conflicts with these terms, the agreement wins.
        </p>
      </section>

      <section>
        <h2>3. Enquiries and the questionnaire</h2>
        <p>
          When you send us a message or complete our project questionnaire, you confirm the information
          is accurate and that you are entitled to share it. Submitting an enquiry doesn&apos;t commit you
          or us to anything. We handle what you send as described in our{" "}
          <Link href="/privacy" className="text-foreground underline underline-offset-4">
            Privacy Policy
          </Link>
          , and we treat project details you share in confidence.
        </p>
      </section>

      <section>
        <h2>4. Intellectual property</h2>
        <p>
          The text, design, graphics, logos and code that make up this website belong to {COMPANY.legalName}{" "}
          or are used with permission, and are protected by copyright and other intellectual property laws.
          You may view and share pages for your own non-commercial use, but you may not copy, reproduce,
          modify or republish our content without our written permission.
        </p>
        <p className="mt-3">
          Client names, testimonials and project screenshots are shown with our clients&apos; permission
          and remain their property.
        </p>
      </section>

      <section>
        <h2>5. Acceptable use</h2>
        <p>When using this website, you agree not to:</p>
        <ul className="mt-3">
          <li>use it for anything unlawful, fraudulent or harmful;</li>
          <li>send spam, malicious code or misleading information through our forms;</li>
          <li>try to gain unauthorised access to the site, its hosting or any connected systems; or</li>
          <li>interfere with the site&apos;s security or performance, including by automated scraping or attacks.</li>
        </ul>
      </section>

      <section>
        <h2>6. Links to other websites</h2>
        <p>
          We link to client websites, live project demos and other services we don&apos;t control. These
          are provided for convenience; we aren&apos;t responsible for their content, availability or
          privacy practices. Client websites may also have changed since we delivered them.
        </p>
      </section>

      <section>
        <h2>7. No warranties</h2>
        <p>
          We work to keep this website accurate, available and secure, but it is provided &ldquo;as
          is&rdquo; and &ldquo;as available&rdquo;. To the extent the law allows, we make no guarantees
          that it will be uninterrupted, error-free or free of harmful components, or that its content is
          complete or current.
        </p>
      </section>

      <section>
        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Noverstorm will not be liable for any indirect,
          incidental or consequential loss, or for any loss of profit, revenue, data or business
          opportunity, arising from your use of, or inability to use, this website. Nothing in these terms
          limits liability that cannot legally be limited, and your rights under any project agreement are
          governed by that agreement.
        </p>
      </section>

      <section>
        <h2>9. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The latest version will always be on this page,
          and continuing to use the site after an update means you accept the new terms.
        </p>
      </section>

      <section>
        <h2>10. General</h2>
        <p>
          If any part of these terms is found to be unenforceable, the rest remains in effect. Our not
          enforcing a provision straight away doesn&apos;t mean we have given up the right to do so.
        </p>
      </section>

      <section>
        <h2>11. Contact us</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-foreground underline underline-offset-4">
            {COMPANY.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  )
}
