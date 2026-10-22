"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import type { CaseStudy } from "@/lib/projects"

export function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <Card className="group overflow-hidden h-full flex flex-col transition-colors duration-300 hover:border-emerald-600/40 hover:shadow-xl hover:shadow-emerald-600/10">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={`${project.title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {project.status && (
          <span className="absolute right-3 top-3 rounded border border-emerald-500/40 bg-background/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-600 backdrop-blur dark:text-emerald-400">
            {project.status}
          </span>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1 tracking-tight">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="border bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 border-emerald-600/20 transition-colors hover:bg-emerald-600/15"
            >
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {project.demo && (
          <Button asChild variant="outline" size="sm">
            <a href={project.demo} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              Live Demo
            </a>
          </Button>
        )}
        <Button asChild variant={project.demo ? "ghost" : "outline"} size="sm">
          <Link href={`/projects/${project.slug}`}>
            <FileText className="mr-2 h-4 w-4" />
            Case Study
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
