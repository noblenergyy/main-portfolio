import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"

const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Software Development Studio`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Noverstorm",
    "Noverstorm Tech Solutions",
    "software development studio",
    "web application development",
    "Next.js developer",
    "React developer",
    "Django developer",
    "custom software development",
    "MVP development",
  ],
  authors: [{ name: "noble <dev/>" }],
  creator: "noble <dev/>",
  publisher: `${SITE_NAME} Ltd`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Software Development Studio`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Software Development Studio`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: `${SITE_NAME} Ltd`,
  alternateName: "Noverstorm",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: "hello.noverstorm@gmail.com",
  founder: {
    "@type": "Person",
    name: "noble <dev/>",
    jobTitle: "Founder",
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "Web application development",
    "React",
    "Next.js",
    "TypeScript",
    "Django",
    "PostgreSQL",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${heading.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var a=localStorage.getItem('noble-accent');if(a)document.documentElement.setAttribute('data-accent',a)}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="noble-theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
