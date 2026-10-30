/**
 * The project questionnaire at /brief. Written for clients with no technical
 * background: every question can be answered by a business owner, and the
 * technical side (front end, back end, hosting) is asked about in plain terms.
 *
 * Labels double as the field names in the email you receive, so keep them readable.
 */

export type BriefQuestion = {
  name: string
  label: string
  hint?: string
  type: "text" | "email" | "url" | "textarea" | "phone" | "radio" | "checkbox"
  options?: string[]
  required?: boolean
  placeholder?: string
}

export type BriefStep = {
  title: string
  intro: string
  questions: BriefQuestion[]
}

export const briefSteps: BriefStep[] = [
  {
    title: "About you",
    intro: "So we know who we're talking to and how to reach you.",
    questions: [
      { name: "name", label: "Your name", type: "text", required: true, placeholder: "Full name" },
      { name: "email", label: "Email address", type: "email", required: true, placeholder: "you@example.com" },
      { name: "phone", label: "Phone number", type: "phone", required: true },
      { name: "business", label: "Business or organisation name", type: "text", placeholder: "Leave blank if it's a personal project" },
      {
        name: "business_about",
        label: "What does your business do?",
        hint: "A sentence or two is plenty, as if you were telling a friend.",
        type: "textarea",
        placeholder: "e.g. We run a catering company in Lagos that does weddings and corporate events.",
      },
    ],
  },
  {
    title: "Your website",
    intro: "The big picture: what kind of website you need and what it's for.",
    questions: [
      {
        name: "site_type",
        label: "What kind of website do you need?",
        type: "radio",
        required: true,
        options: [
          "A website that tells people about my business",
          "An online shop where people can buy things",
          "A website where people can book appointments",
          "An app or platform where people sign up and log in",
          "I'm not sure yet",
        ],
      },
      {
        name: "current_site",
        label: "Do you already have a website?",
        type: "radio",
        options: [
          "No, this will be my first",
          "Yes, and I want a new one",
          "Yes, and I want to add to it or fix it",
        ],
      },
      { name: "current_url", label: "If you have one, what's the address?", type: "url", placeholder: "https://" },
      {
        name: "goals",
        label: "What should the website help you do?",
        hint: "Pick as many as you like.",
        type: "checkbox",
        options: [
          "Get more customers to contact me",
          "Sell products online",
          "Take bookings or appointments",
          "Show my work or past projects",
          "Look more professional and trustworthy",
          "Share news, articles or updates",
          "Let customers log in to an account",
          "Save my team time on manual work",
        ],
      },
      {
        name: "audience",
        label: "Who are your customers?",
        type: "textarea",
        placeholder: "e.g. Couples planning weddings, and HR managers booking office events.",
      },
    ],
  },
  {
    title: "Look and feel",
    intro: "What visitors will see. There are no wrong answers here.",
    questions: [
      {
        name: "pages",
        label: "Which pages do you think you'll need?",
        hint: "Rough guesses are fine. We'll help you finalise this.",
        type: "checkbox",
        options: [
          "Home",
          "About us",
          "Services",
          "Shop / products",
          "Gallery or portfolio",
          "Blog or news",
          "Team",
          "Pricing",
          "FAQ",
          "Careers",
          "Contact",
          "Not sure",
        ],
      },
      {
        name: "logo",
        label: "Do you have a logo?",
        type: "radio",
        options: ["Yes, and I'm happy with it", "Yes, but it needs a refresh", "No, I need one"],
      },
      {
        name: "style",
        label: "Which style feels most like your brand?",
        type: "radio",
        options: [
          "Clean and simple",
          "Bold and colourful",
          "Luxury and elegant",
          "Friendly and playful",
          "Corporate and serious",
          "I'm not sure",
        ],
      },
      {
        name: "colours",
        label: "Any colours you want to use or avoid?",
        type: "text",
        placeholder: "e.g. Navy and gold, no bright red",
      },
      {
        name: "inspiration",
        label: "Are there websites you like the look of?",
        hint: "Paste links and tell us what you like about them. They don't have to be in your industry.",
        type: "textarea",
        placeholder: "e.g. apple.com, I like how clean and spacious it is.",
      },
      {
        name: "content",
        label: "Who will provide the words and photos?",
        type: "radio",
        options: [
          "I have them ready",
          "I have some, but need help",
          "I need you to write the words",
          "I need photos taken or sourced",
          "I'm not sure",
        ],
      },
    ],
  },
  {
    title: "What it should do",
    intro: "Behind the scenes. Tick anything that sounds useful, even if you're not sure how it works.",
    questions: [
      {
        name: "features",
        label: "What should your website be able to do?",
        type: "checkbox",
        options: [
          "A contact form that sends messages to my email",
          "A WhatsApp or live chat button",
          "Customers can create accounts and log in",
          "Take payments online",
          "Customers can book appointments or reserve dates",
          "I can change text and photos myself, without a developer",
          "A blog or news section I can post to",
          "A dashboard where I can see orders, customers or messages",
          "Send emails or newsletters to customers",
          "Search within the website",
          "More than one language",
          "Connect to tools I already use (accounting, CRM, Google Sheets, etc.)",
          "I'm not sure, please advise",
        ],
      },
      {
        name: "payments",
        label: "If you'll take payments, how would you like to be paid?",
        type: "radio",
        options: [
          "Paystack",
          "Flutterwave",
          "Stripe",
          "PayPal",
          "Bank transfer only",
          "I'm not sure",
          "I won't take payments online",
        ],
      },
      {
        name: "products",
        label: "If you're selling, roughly how many products or services?",
        type: "radio",
        options: ["1 to 10", "11 to 50", "51 to 200", "More than 200", "Not selling online"],
      },
      {
        name: "updates",
        label: "After launch, who will keep the website up to date?",
        type: "radio",
        options: [
          "Me or my team",
          "I'd like you to handle it",
          "It won't change much",
          "Not sure yet",
        ],
      },
    ],
  },
  {
    title: "Getting it online",
    intro: "The practical bits. If a question doesn't make sense, 'Not sure' is a perfectly good answer.",
    questions: [
      {
        name: "domain",
        label: "Do you have a web address (domain) already?",
        hint: "This is the name people type to find you, like yourbusiness.com.",
        type: "radio",
        options: ["Yes", "No, I need one", "I'm not sure"],
      },
      { name: "domain_name", label: "If yes, what is it?", type: "text", placeholder: "yourbusiness.com" },
      {
        name: "business_email",
        label: "Do you want a professional email address?",
        hint: "Like hello@yourbusiness.com instead of a Gmail address.",
        type: "radio",
        options: ["Yes please", "I already have one", "No thanks"],
      },
      {
        name: "google",
        label: "How important is showing up on Google?",
        type: "radio",
        options: ["Very important", "Nice to have", "Not important right now"],
      },
      { name: "location", label: "Where are most of your customers based?", type: "text", placeholder: "e.g. Abuja, or across Nigeria, or worldwide" },
    ],
  },
  {
    title: "Timing and budget",
    intro: "This helps us suggest the right plan. Nothing here is a commitment.",
    questions: [
      {
        name: "timeline",
        label: "When would you like the website to go live?",
        type: "radio",
        options: [
          "As soon as possible",
          "Within 1 month",
          "In 1 to 3 months",
          "In 3 months or more",
          "No fixed date",
        ],
      },
      { name: "deadline", label: "Is there a specific date or event you're working towards?", type: "text", placeholder: "e.g. A product launch on 1 March" },
      {
        name: "budget",
        label: "Do you have a budget in mind?",
        hint: "Any currency is fine. A rough range helps us recommend what's realistic.",
        type: "text",
        placeholder: "e.g. ₦1,500,000 to ₦2,500,000, or $2,000, or not sure yet",
      },
      {
        name: "decision",
        label: "Who else is involved in deciding on the website?",
        type: "radio",
        options: ["Just me", "Me and a partner or team", "A board or management team"],
      },
      {
        name: "anything_else",
        label: "Anything else we should know?",
        type: "textarea",
        placeholder: "Worries, must-haves, things that went wrong last time…",
      },
    ],
  },
]
