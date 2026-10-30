/** What Noverstorm offers. Shared by the home page overview and /services. */
export const services = [
  {
    slug: "websites",
    title: "Business websites",
    summary:
      "Fast, credible websites for companies that need to be taken seriously online, built to load instantly, rank well and turn visitors into enquiries.",
    includes: [
      "Content structure and page planning",
      "Custom design, built for every screen size",
      "Contact and enquiry forms delivered to your inbox",
      "Content you can edit yourself",
      "Technical SEO and analytics from day one",
    ],
  },
  {
    slug: "platforms",
    title: "Web applications & platforms",
    summary:
      "Products people sign up for and use every day: customer portals, SaaS platforms, booking systems and MVPs ready for real users from launch.",
    includes: [
      "User accounts, roles and secure sign-in",
      "Subscriptions and online payments",
      "Admin dashboards for your team",
      "Databases and APIs designed to scale",
      "AI features where they genuinely help",
    ],
  },
  {
    slug: "automation",
    title: "Integrations & automation",
    summary:
      "Connect the tools your business already uses and remove repetitive manual work, from payment and CRM integrations to fully automated workflows.",
    includes: [
      "Payment, email and CRM integrations",
      "Automated workflows that run on their own",
      "Internal tools and reporting",
      "Third-party API connections",
      "Data imports, exports and sync",
    ],
  },
  {
    slug: "seo",
    title: "SEO & performance",
    summary:
      "Make sure the people searching for you actually find you: technical SEO, page speed, structured data and Search Console, for new and existing sites.",
    includes: [
      "Full SEO audit with a prioritised fix list",
      "Core Web Vitals and page speed",
      "Metadata and structured data",
      "Local SEO and Google Business Profile",
      "Search Console and analytics setup",
    ],
    href: "/seo",
  },
]

/** How an engagement runs, and what the client receives at each stage. */
export const processSteps = [
  {
    title: "Discovery",
    body: "A call to understand your business, your customers and what success looks like.",
    deliverable: "Your answers to our project questionnaire, and a discovery call",
  },
  {
    title: "Proposal",
    body: "A written scope with features, timeline and a fixed quote, so you know exactly what you're getting.",
    deliverable: "Written proposal and quote",
  },
  {
    title: "Design",
    body: "Page layouts and visual design, shared for your feedback before any building starts.",
    deliverable: "Designs for review and sign-off",
  },
  {
    title: "Build",
    body: "Development in weekly milestones with a live preview link, so you see progress as it happens.",
    deliverable: "Weekly updates and a staging link",
  },
  {
    title: "Launch",
    body: "Domain, hosting, SEO and analytics set up, final checks done, and your site goes live.",
    deliverable: "Live site and a handover walkthrough",
  },
  {
    title: "Support",
    body: "Post-launch fixes and ongoing improvements. The relationship doesn't end at launch.",
    deliverable: "Optional maintenance plan",
  },
]

export const stack = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "Django", "PostgreSQL", "MySQL", "SQLite"],
  },
  {
    title: "Integrations",
    skills: ["Stripe", "Supabase", "OpenAI", "Claude", "Gemini"],
  },
  {
    title: "Infrastructure",
    skills: ["Vercel", "Oracle Cloud", "Caddy", "Git"],
  },
]
