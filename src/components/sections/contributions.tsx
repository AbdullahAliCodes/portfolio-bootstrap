import { ArrowUpRight } from "lucide-react";
import { ContributionsCalendar } from "@/components/contributions-calendar";
import { Section } from "@/components/section";
import { sections, site, socials } from "@/data/portfolio";

export function Contributions({ index = 0 }: { index?: number }) {
  const github = socials.find((s) => s.kind === "github");
  return (
    <Section
      id="contributions"
      nav="about"
      index={index}
      eyebrow={{ shape: "cross", label: sections.contributions.eyebrow }}
      title={sections.contributions.title}
      action={
        github && (
          <a
            href={github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            @{site.githubUsername}
            <ArrowUpRight className="size-3" aria-hidden />
          </a>
        )
      }
    >
      {/* One keyboard-focusable scroll region (the calendar is wider than phones). */}
      <div
        tabIndex={0}
        role="region"
        aria-label={sections.contributions.regionLabel}
        className="overflow-x-auto rounded-xl border border-border/50 bg-card/30 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_.react-activity-calendar\_\_scroll-container]:overflow-visible!"
      >
        <ContributionsCalendar username={site.githubUsername} fallback={sections.contributions.fallback} />
      </div>
    </Section>
  );
}
