import { Code, Globe } from "lucide-react";
import { PsSymbol, psShapeMeta } from "@/components/ps";
import { TechChip } from "@/components/tech-chip";
import { ThemedImage } from "@/components/themed-image";
import { categoryShape, projectCategories, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const MAX_CHIPS = 6;

const hoverBorder = {
  triangle: "hover:border-ps-teal/60",
  circle: "hover:border-ps-red/60",
  cross: "hover:border-ps-blue/60",
  square: "hover:border-ps-yellow/60",
} as const;

/**
 * Sanyi card anatomy: media on top (zooms on hover), title, small tech badges, link pills.
 * A PS symbol in the top-right marks the category; the border tints to its colour on hover.
 */
export function ProjectCard({
  project,
  highPriority = false,
  headingLevel = "h3",
}: {
  project: Project;
  /**
   * Likely LCP image: load eagerly at high priority. For themed thumbnails this fetches both
   * variants (~15 KB each), so only use it on the first card.
   */
  highPriority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const shape = categoryShape[project.category];
  const categoryLabel = projectCategories.find((c) => c.key === project.category)?.label ?? project.category;
  const shown = project.tech.slice(0, MAX_CHIPS);
  const hidden = project.tech.slice(MAX_CHIPS);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/30 transition duration-300 ease-out hover:-translate-y-1 hover:bg-card/60 hover:shadow-lg hover:shadow-black/10 motion-reduce:hover:translate-y-0",
        hoverBorder[shape],
      )}
    >
      <div className="relative h-44 overflow-hidden border-b border-border/40 bg-muted/40">
        <ThemedImage
          thumbnail={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          loading={highPriority ? "eager" : "lazy"}
          fetchPriority={highPriority ? "high" : undefined}
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
        <span className="absolute right-2.5 top-2.5 inline-flex items-center rounded-full bg-background/75 p-1.5 shadow-sm backdrop-blur-sm">
          <PsSymbol shape={shape} size={12} strokeWidth={3.5} label={`Category: ${categoryLabel}`} className={psShapeMeta[shape].text} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Heading className="text-sm font-semibold leading-snug">{project.title}</Heading>

        <ul className="flex flex-wrap gap-1" aria-label="Tech stack">
          {shown.map((t) => (
            <li key={t}>
              <TechChip name={t} size="xs" />
            </li>
          ))}
          {hidden.length > 0 && (
            <li>
              <span
                title={hidden.join(", ")}
                className="inline-flex items-center rounded-md border border-border/60 bg-background/40 px-1.5 py-0.5 text-[11px] text-muted-foreground"
              >
                +{hidden.length}
                <span className="sr-only">: {hidden.join(", ")}</span>
              </span>
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} website (opens in a new tab)`}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Globe className="size-3.5" aria-hidden />
            Website
          </a>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Code className="size-3.5" aria-hidden />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
