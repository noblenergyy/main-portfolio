import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { CaseStudy } from "@/lib/projects"

export function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <article className="group relative flex h-full flex-col border bg-card transition-colors hover:border-foreground/40">
      <div className="relative aspect-video overflow-hidden border-b bg-muted">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={`${project.title} preview`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">
            {/* The title link covers the whole card. */}
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </div>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-6 text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-[0.14em] text-foreground">
            {project.status === "IN PROGRESS" ? "In progress" : "Live"}
          </span>
          <span aria-hidden="true">·</span>
          <span>{project.tags.slice(0, 3).join(", ")}</span>
        </div>
      </div>
    </article>
  )
}
