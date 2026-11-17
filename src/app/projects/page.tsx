import { Suspense } from "react";
import type { Metadata } from "next";
import { ProjectBrowser, ProjectBrowserFromUrl } from "@/components/project-browser";
import { Section } from "@/components/section";
import { sections, site } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: `${sections.allProjects.intro} Projects by ${site.title}.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Section
      id="all-projects"
      headingLevel="h1"
      eyebrow={{ shape: "cross", label: sections.allProjects.eyebrow }}
      title={sections.allProjects.title}
    >
      <p className="-mt-2 mb-6 max-w-lg text-sm leading-relaxed text-muted-foreground">{sections.allProjects.intro}</p>
      {/* The static shell shows every project; the URL filter applies once the client reads it. */}
      <Suspense fallback={<ProjectBrowser filter="all" />}>
        <ProjectBrowserFromUrl />
      </Suspense>
    </Section>
  );
}
