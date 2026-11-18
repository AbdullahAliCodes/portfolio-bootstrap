import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { featuredProjects, sections } from "@/data/portfolio";

export function FeaturedProjects({ index = 0 }: { index?: number }) {
  return (
    <Section id="projects" nav="projects" index={index} eyebrow={{ shape: "cross", label: sections.projects.eyebrow }} title={sections.projects.title}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-border hover:bg-card/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {sections.projects.viewAll}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
