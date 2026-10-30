import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { COMPANY, SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${COMPANY.legalName} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
}

const Email = () => (
  <a href={`mailto:${COMPANY.email}`} className="text-foreground underline underline-offset-4">
    {COMPANY.email}
  </a>
)

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="30 October 2026">
      <section>
        <p>
          {COMPANY.legalName} (&ldquo;Noverstorm&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or
          &ldquo;our&rdquo;) respects your privacy. This policy explains what personal information we
          collect when you visit {SITE_URL.replace("https://", "")} or contact us, why we collect it, how we
          protect it and the choices you have. We work with clients around the world, and we apply the
          same standard of care to everyone&apos;s information, wherever they are.
        </p>
      </section>

      <section>
        <h2>1. Information we collect</h2>
        <p>We collect only what we need, and mostly what you choose to give us:</p>
        <ul className="mt-3">
          <li>
            <strong className="text-foreground">Contact form:</strong> your name, email address, phone
            number and message.
          </li>
          <li>
            <strong className="text-foreground">Project questionnaire:</strong> your name, contact
            details, business details and your answers about the project you have in mind, which may
            include timelines and budget.
          </li>
          <li>
            <strong className="text-foreground">Direct correspondence:</strong> anything you send us by
            email, phone or messaging apps.
          </li>
          <li>
            <strong className="text-foreground">Client work:</strong> if you engage us, the information
            needed to deliver the project, such as account access, content and billing details.
          </li>
          <li>
            <strong className="text-foreground">Technical data:</strong> like almost every website, our
            hosting provider automatically records basic request data (such as IP address, browser type and
            the pages requested) to keep the site secure and running. We don&apos;t use this to identify
            you.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. How we use your information</h2>
        <ul>
          <li>To reply to your enquiry and discuss your project.</li>
          <li>To prepare proposals and quotes you have asked for.</li>
          <li>To deliver, support and invoice work you have engaged us for.</li>
          <li>To keep our website secure and working properly.</li>
          <li>To meet our legal, tax and accounting obligations.</li>
        </ul>
        <p className="mt-3">
          We do not sell your personal information, we do not use it for advertising, and we do not send
          marketing emails you haven&apos;t asked for.
        </p>
      </section>

      <section>
        <h2>3. Why we&apos;re allowed to use it</h2>
        <p>
          Depending on where you live, data protection laws may require us to have a lawful basis for using
          your information. Ours are: your <strong className="text-foreground">consent</strong> when you
          send us a form or message; the steps needed to enter into or perform a{" "}
          <strong className="text-foreground">contract</strong> with you; our{" "}
          <strong className="text-foreground">legitimate interests</strong> in running and protecting our
          business; and compliance with our <strong className="text-foreground">legal obligations</strong>.
        </p>
      </section>

      <section>
        <h2>4. Cookies and tracking</h2>
        <p>
          We do not use advertising cookies, analytics trackers or third-party tracking pixels. The only
          thing stored on your device is your light or dark theme preference, which is saved in your own
          browser&apos;s local storage, is never sent to us, and can be cleared at any time through your
          browser settings.
        </p>
      </section>

      <section>
        <h2>5. Who we share it with</h2>
        <p>We share information only with trusted service providers who help us run the business:</p>
        <ul className="mt-3">
          <li>
            <strong className="text-foreground">Web3Forms</strong>, which delivers contact form and
            questionnaire submissions to our inbox.
          </li>
          <li>
            <strong className="text-foreground">Google</strong>, which hosts our email.
          </li>
          <li>
            <strong className="text-foreground">Vercel</strong>, which hosts this website.
          </li>
        </ul>
        <p className="mt-3">
          These providers process data on our behalf and only for these purposes. We will also disclose
          information if the law requires it, or to protect our rights or the safety of others. If
          Noverstorm is ever involved in a merger or acquisition, information may transfer to the new owner
          under the same protections.
        </p>
      </section>

      <section>
        <h2>6. International transfers</h2>
        <p>
          Because we and our service providers operate internationally, your information may be processed
          in countries other than your own, including countries whose data protection laws differ from
          yours. Where that happens, we rely on providers that maintain recognised safeguards, such as
          standard contractual clauses, to protect it.
        </p>
      </section>

      <section>
        <h2>7. How long we keep it</h2>
        <p>
          We keep enquiries for up to two years so we can follow up and refer back to earlier
          conversations, unless you ask us to delete them sooner. Project and billing records are kept for
          as long as needed to support the work and meet legal and accounting requirements. After that,
          information is securely deleted.
        </p>
      </section>

      <section>
        <h2>8. How we protect it</h2>
        <p>
          This website is served over an encrypted (HTTPS) connection, access to our accounts is protected
          with strong passwords and two-factor authentication where available, and we limit access to
          personal information to what each task needs. No system is perfectly secure, but we take
          reasonable steps to protect your information and will notify you if a breach affects you.
        </p>
      </section>

      <section>
        <h2>9. Your rights</h2>
        <p>Wherever you are, you can ask us to:</p>
        <ul className="mt-3">
          <li>tell you what personal information we hold about you and give you a copy;</li>
          <li>correct information that is inaccurate or incomplete;</li>
          <li>delete your information;</li>
          <li>restrict or object to how we use it;</li>
          <li>send your information to you or another provider in a portable format; and</li>
          <li>withdraw any consent you have given, at any time.</li>
        </ul>
        <p className="mt-3">
          To make a request, email <Email />. We will respond within 30 days and won&apos;t charge you for
          it. You also have the right to complain to the data protection authority where you live.
        </p>
      </section>

      <section>
        <h2>10. Children</h2>
        <p>
          Our services are for businesses and are not directed at children. We do not knowingly collect
          information from anyone under 16. If you believe a child has sent us information, contact us and
          we will delete it.
        </p>
      </section>

      <section>
        <h2>11. Other websites</h2>
        <p>
          Our site links to client websites and other services we don&apos;t control. Their privacy
          practices are their own, so please read their policies.
        </p>
      </section>

      <section>
        <h2>12. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The latest version will always be on this page, with
          the date it was last updated at the top.
        </p>
      </section>

      <section>
        <h2>13. Contact us</h2>
        <p>
          Questions about this policy or your information? Email <Email />.
        </p>
      </section>
    </LegalPage>
  )
}
