import type { StaticImageData } from "next/image"
import hagueIndustries from "@/public/hague-industries.png"
import papertrail from "@/public/papertrail.png"
import dondaxpicture from "@/public/dondaxpicture.png"
import lawangelsscreenshot from "@/public/lawangelsscreenshot.png"
import latiodus from "@/public/latiodus.png"
import bcijval from "@/public/bcijval.jpg"
import gogetter from "@/public/gogetter.jpg"
import gogetterMessage from "@/public/gogetter-message.jpg"
import gogetterAssistant from "@/public/gogetter-assistant.jpg"
import gogetterEmails from "@/public/gogetter-emails.jpg"

export type CaseStudy = {
  slug: string
  title: string
  description: string
  image: StaticImageData
  tags: string[]
  status: string
  /** Public link. Leave out for private tools; the live buttons are then hidden. */
  demo?: string
  /** Extra screenshots shown on the case study page. */
  gallery?: { image: StaticImageData; caption: string }[]
  /** "Under the hood" write-up: one entry per part of the system. */
  internals?: { title: string; body: string }[]
  problem: string
  solution: string
  features: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "b-cijval-engineering",
    title: "B-CIJVAL Engineering",
    description:
      "Corporate website for B-CIJVAL Engineering Services Ltd, an engineering, consultancy, construction and project management firm working across buildings, infrastructure and water resources.",
    image: bcijval,
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
    status: "SHIPPED",
    demo: "https://bcijvalengineering.com",
    problem:
      "B-CIJVAL delivers buildings, infrastructure, water resources and environmental work across many states, but that portfolio lived in a company profile document. Prospective clients had no way to see the scale of the firm or start a project online.",
    solution:
      "A full corporate site built on the Next.js App Router: 9 service pages, 22 project case studies, 7 engineering divisions and a plant register, all generated from typed content files so adding a project means editing one object. Navigation, listings, related links and the sitemap update from the same source.",
    features: [
      "22 project case studies and 9 service lines from one template each",
      "Mega menu navigation across services, engineering and equipment",
      "Interactive state coverage map",
      "Project enquiry form with webhook delivery to the firm's inbox or CRM",
      "Insights, news and careers sections",
      "Typed content layer: one edit updates pages, listings and sitemap",
    ],
  },
  {
    slug: "gogetter",
    title: "GoGetter",
    description:
      "An outreach tool that finds local businesses with no website across the UK, US and Canada, builds a daily call sheet, and writes a personal WhatsApp message and email for each one with AI.",
    image: gogetter,
    tags: ["Node.js 24", "SQLite", "Vanilla JS", "Gemini API", "Claude API", "Zod", "OpenStreetMap", "libphonenumber", "Nodemailer", "Caddy", "Oracle Cloud", "Vercel"],
    status: "SHIPPED",
    demo: "https://noverstorm-gogetter.vercel.app",
    problem:
      "Selling websites to small businesses starts with finding the ones that don't have one, and that meant hours of scrolling maps, copying numbers and writing the same cold message again and again. Generic pitches got ignored, and sending too much email from one account risked getting it flagged.",
    solution:
      "GoGetter automates the whole loop, from finding the businesses to following them up. It searches OpenStreetMap city by city across 9 countries for businesses with no website, then serves a fresh sheet of them every morning. AI writes each message around something specific to that business. Phone numbers are tagged as mobile or landline so WhatsApp goes to the right ones, and a paced mailer sends email within daily limits and follow-up rules. It runs on its own around the clock on an Oracle Cloud server, with a password-protected dashboard on Vercel that works just as well on a phone.",
    features: [
      "Finds businesses with no website across many cities and trades",
      "Fresh daily sheet, with past sheets kept and searchable",
      "AI-written WhatsApp and email messages for every business, editable before sending",
      "Mobile/landline detection so WhatsApp is only offered where it's likely to work",
      "Paced sending with warm-up, daily caps, follow-ups and unsubscribe handling",
      "AI assistant that knows the day's list and drafts replies to customers",
      "Daily sheet emailed as a digest, plus CSV export",
      "Light, dark and blue themes, built to work on a phone",
    ],
    internals: [
      {
        title: "Lead discovery",
        body: "Each city is geocoded once with Nominatim and cached in SQLite. GoGetter then sends one Overpass query per city: a bounding box with one regex clause per OpenStreetMap key, covering 37 categories of business, from barbers and bakeries to dentists and driving schools. That query shape is far faster than per-tag radius filters, which time out on the public servers. Anything with a website, a URL or a chain brand is filtered out, and so is anything with no phone or email. If a server is overloaded, it retries on a second mirror. Cities are searched a few at a time and re-checked every 30 days, and new searches start automatically when the pool of unused leads runs low.",
      },
      {
        title: "The daily sheet",
        body: "Every morning, a fixed number of fresh businesses moves from the pool onto the day's sheet. The mix is balanced on purpose: only as many email-ready leads as the day's sending limit can handle, then phone leads with mobiles first. That way automatic email never runs dry and WhatsApp work never piles up. Past sheets are kept and searchable, the sheet can be topped up on demand (or with pull-to-refresh on a phone), and it exports to CSV.",
      },
      {
        title: "Mobile or landline",
        body: "There's no legitimate way to check whether a number is on WhatsApp. GoGetter instead classifies every number with Google's libphonenumber numbering-plan data, tagging it mobile, landline or unknown. That decides whether to show a WhatsApp button, a 'Try WhatsApp' link or just a call link, and mobiles go to the top of the sheet.",
      },
      {
        title: "AI-written outreach",
        body: "For each business, the AI gets the OpenStreetMap details: specialty, cuisine, opening hours and area. It writes a WhatsApp message and an email that open with a compliment specific to that business, and records the facts the compliment rests on so the claim can be checked. Output is structured: a JSON schema for Gemini, and a Zod schema with structured outputs for Claude. The free tier runs on Gemini and falls back through several free models when one is overloaded or out of daily quota. With a Claude key, it also searches the web for reviews and marks a lead dead if it turns out the business already has a site. Several email styles are available, tuned for landing in the Primary inbox rather than Promotions.",
      },
      {
        title: "Deliverability and compliance",
        body: "A built-in mailer sends through any SMTP account using Nodemailer. Sending is limited to set hours, with a random gap between emails and a daily cap that can warm up a new domain by doubling each week. A follow-up is scheduled automatically and cancelled the moment a lead is marked replied, won or dead. Unsubscribes go on a permanent suppression list, and an optional footer and List-Unsubscribe header cover UK, US and Canadian anti-spam rules. A small hand-written IMAP client saves a copy of each email to the Sent folder, which many mail providers don't do for app-sent mail.",
      },
      {
        title: "AI assistant",
        body: "A chat panel loads the day's whole sheet into its context. It can say who to contact first and why, write a call opener, or draft a reply when a business asks about price. Replies render as safe, minimal Markdown with copy buttons, and the panel goes full screen on mobile.",
      },
      {
        title: "Architecture and hosting",
        body: "The backend is a single Node.js 24 process with no web framework: the built-in http module and node:sqlite, plus four small dependencies. The dashboard is plain HTML, CSS and JavaScript with light, dark and blue themes. It runs 24/7 on an Oracle Cloud server as a systemd service, behind Caddy for automatic HTTPS. The dashboard pages are served from Vercel and call the server's API with an HMAC-signed session token. One setup script provisions the server, and a background job that runs every 30 minutes builds the sheet, writes the messages, queues emails and sends a daily digest.",
      },
    ],
    gallery: [
      { image: gogetterMessage, caption: "Every business gets its own WhatsApp message and email, with the fact the compliment is based on shown for checking." },
      { image: gogetterAssistant, caption: "The assistant knows today's list: who to contact first, what to say, and how to reply." },
      { image: gogetterEmails, caption: "Email log: first emails and follow-ups, sent at a steady pace within the daily limit." },
    ],
  },
  {
    slug: "the-hague-industries",
    title: "The Hague Industries",
    description:
      "Corporate website for The Hague Industries Ltd, a professional services firm operating at the convergence of government, commerce, and international trade.",
    image: hagueIndustries,
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "SHIPPED",
    demo: "https://thehagueindustries.com",
    problem:
      "In professional services, credibility is the product. The Hague Industries operates in rooms where government, commerce, and international trade meet, and needed a web presence with the same weight: one that establishes trust before the first meeting.",
    solution:
      "We designed and built a corporate site around clarity and authority: restrained typography, a content structure that walks a visitor from capability to contact, and fully static pages that load instantly anywhere in the world. Built with Next.js and Tailwind CSS, deployed on Vercel.",
    features: [
      "Fully static pages with sub-second loads",
      "Content architecture built around the firm's service lines",
      "Inbound contact pipeline for new briefs",
      "A design that holds its authority on every screen size",
    ],
  },
  {
    slug: "papertrail",
    title: "Papertrail",
    description:
      "A newsletter platform bridging deep reading and high-impact writing. AI-powered tools for creators to draft, distribute, and monetize their content.",
    image: papertrail,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI"],
    status: "IN PROGRESS",
    demo: "https://papertrail-news.vercel.app/",
    problem:
      "Newsletter writers juggle separate tools to read, draft, distribute, and monetize. The friction between deep reading and high-impact writing breaks the publishing rhythm that creators depend on.",
    solution:
      "Papertrail brings the whole loop into one platform. AI-assisted drafting works from the sources a writer collects, and distribution and monetization are built in rather than bolted on. Built with Next.js and TypeScript, with OpenAI powering the writing tools.",
    features: [
      "AI-assisted drafting from collected sources",
      "Integrated publishing and distribution pipeline",
      "Creator monetization built in",
      "A reading experience designed for focus",
    ],
  },
  {
    slug: "lawangels",
    title: "LawAngelsUk",
    description:
      "An educational platform providing mock exams for law students. Features exam simulations, personalized feedback, referral tracking, and subscription processing.",
    image: lawangelsscreenshot,
    tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Django", "Stripe", "PostgreSQL"],
    status: "SHIPPED",
    demo: "https://lawangelsuk.com",
    problem:
      "Law students preparing for high-stakes exams needed realistic practice with meaningful feedback, and the business behind it needed subscriptions, referrals, and payments handled reliably from day one.",
    solution:
      "A complete platform: a timed exam simulation engine with personalized feedback, referral tracking to fuel growth, and Stripe-powered subscription billing. Next.js on the front, Django and PostgreSQL behind it.",
    features: [
      "Timed mock exam simulations",
      "Personalized feedback and scoring",
      "Referral tracking and rewards",
      "Stripe subscription billing",
    ],
  },
  {
    slug: "latiodus",
    title: "Latiodus",
    description:
      "A modern web application for a premier dredging and marine operations company. Showcases their equipment fleet, past projects, and core services.",
    image: latiodus,
    tags: ["React.js", "Tailwind CSS", "TypeScript"],
    status: "SHIPPED",
    demo: "https://latiodus.vercel.app/",
    problem:
      "A premier dredging and marine operations company had a serious fleet and track record, but it lived in PDFs and word of mouth, invisible to the partners and clients evaluating them online.",
    solution:
      "A modern web application that puts the physical business on screen: the equipment fleet, past projects, and core services presented with the scale they deserve, built fast and responsive with React and Tailwind CSS.",
    features: [
      "Equipment fleet showcase",
      "Past project portfolio",
      "Clear service line breakdown",
      "Fast, responsive front end",
    ],
  },
]

/**
 * Hidden from the site for now. Move an entry back into `caseStudies`
 * to republish it.
 */
export const archivedCaseStudies: CaseStudy[] = [
  {
    slug: "dondax",
    title: "DondaX Limited Website",
    description:
      "Website for DondaX Limited, an electric automobile company. Built with React.js, Django, Tailwind CSS, and MySQL.",
    image: dondaxpicture,
    tags: ["React.js", "TypeScript", "Tailwind", "Django", "MySQL"],
    status: "SHIPPED",
    demo: "https://dondaxlimited.com",
    problem:
      "DondaX is introducing electric vehicles to markets where the category is still unfamiliar. The site had to educate a first-time audience, showcase the vehicles, and convert curiosity into serious buyer interest.",
    solution:
      "A React front end backed by Django and MySQL: vehicle showcases that lead with imagery, a company story that builds confidence in a new brand, and inquiry flows that capture leads for the sales team.",
    features: [
      "Vehicle showcase with rich imagery",
      "Lead capture and inquiry flows for the sales team",
      "Django-backed content management",
      "Responsive design for a mobile-first audience",
    ],
  },
]
