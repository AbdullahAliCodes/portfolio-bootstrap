import { ArrowUpRight, Trophy } from "lucide-react";
import { PsSymbol } from "@/components/ps";
import { Section } from "@/components/section";
import { achievements, sections } from "@/data/portfolio";

/** Award cards; a PS "loading screen" placeholder while the list is empty. */
export function Achievements({ index = 0 }: { index?: number }) {
  return (
    <Section id="achievements" nav="about" index={index} eyebrow={{ shape: "triangle", label: sections.achievements.eyebrow }} title={sections.achievements.title}>
      {achievements.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/80 bg-transparent px-6 py-14 text-center dark:border-border/60">
          <PsSymbol shape="triangle" size={28} strokeWidth={2.5} className="motion-safe:animate-pulse" />
          <p className="font-display text-lg lowercase tracking-wide">{sections.achievements.placeholder}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{sections.achievements.placeholderHint}</p>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {achievements.map((a) => (
            <li
              key={`${a.title}-${a.issuer}`}
              className="surface-card flex gap-4 p-6 sm:p-7"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/80 text-ps-yellow-ink dark:bg-muted/70">
                <Trophy className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 space-y-0.5">
                <h3 className="text-base font-semibold sm:text-lg">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.issuer}</p>
                {a.line && <p className="pt-1 text-sm text-muted-foreground sm:text-base">{a.line}</p>}
                {a.href && (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 pt-1 text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-ps-blue-ink"
                  >
                    View <span className="sr-only">{a.title}</span>
                    <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
