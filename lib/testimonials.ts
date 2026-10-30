export type Testimonial = {
  quote: string
  /** Who said it: a person's name, or the company when the quote is attributed to it. */
  name: string
  /** Job title and/or company, or what the company does. */
  role: string
  /** Case study to link to, if any. */
  project?: string
}

/**
 * Client quotes, used with each client's permission.
 * The testimonials section stays hidden while this list is empty.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Noverstorm took a company profile full of services, projects and equipment and turned it into a website that finally shows the scale of what we do. The process was clear from the first call to launch, and the result is a site we're proud to send to clients.",
    name: "B-CIJVAL Engineering Services Ltd",
    role: "Engineering, construction & project management",
    project: "b-cijval-engineering",
  },
  {
    quote:
      "In our line of work, credibility is everything. Noverstorm understood that from day one and delivered a corporate website with the clarity and authority our firm needed, while making the whole process straightforward for us.",
    name: "The Hague Industries Ltd",
    role: "Professional services",
    project: "the-hague-industries",
  },
]
