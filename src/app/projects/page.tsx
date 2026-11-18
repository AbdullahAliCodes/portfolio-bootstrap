import type { Metadata } from "next";
import { ProjectBrowser } from "@/components/project-browser";
import { Section } from "@/components/section";
import { sections, site } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: `${sections.allProjects.intro} Projects by ${site.title}.`,
  alternates: { canonical: "/projects" },
  // openGraph is replaced (not merged) per segment, so restate the essentials.
  openGraph: {
    type: "website",
    url: "/projects",
    siteName: site.title,
    title: `Projects | ${site.title}`,
    description: sections.allProjects.intro,
  },
};

export default function ProjectsPage() {
  return (
    <Section
      id="all-projects"
      headingLevel="h1"
      immediate
      eyebrow={{ shape: "cross", label: sections.allProjects.eyebrow }}
      title={sections.allProjects.title}
    >
      <p className="-mt-2 mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{sections.allProjects.intro}</p>
      {/* Prerendered with every project; a ?filter= in the URL is applied on hydration. */}
      <ProjectBrowser />
    </Section>
  );
}
