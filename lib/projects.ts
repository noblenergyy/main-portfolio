import type { StaticImageData } from "next/image"
import hagueIndustries from "@/public/hague-industries.png"
import papertrail from "@/public/papertrail.png"
import dondaxpicture from "@/public/dondaxpicture.png"
import lawangelsscreenshot from "@/public/lawangelsscreenshot.png"
import latiodus from "@/public/latiodus.png"

export type CaseStudy = {
  slug: string
  title: string
  description: string
  image: StaticImageData
  tags: string[]
  status: string
  demo: string
  problem: string
  solution: string
  features: string[]
}

export const caseStudies: CaseStudy[] = [
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
