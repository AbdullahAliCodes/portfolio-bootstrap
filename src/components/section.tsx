import { BlurFade } from "@/components/blur-fade";
import { PsEyebrow } from "@/components/ps";
import type { PsShape } from "@/components/ps/shapes";
import type { NavKey } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow: { shape: PsShape; label: string };
  title: string;
  /** Nav item this section belongs to (drives the active nav indicator). */
  nav?: NavKey;
  /** Stagger index for the reveal. */
  index?: number;
  /** Optional element on the right of the header (e.g. a link). */
  action?: React.ReactNode;
  headingLevel?: "h1" | "h2";
  /** Above-the-fold: reveal with CSS on first paint instead of on scroll (see BlurFade). */
  immediate?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Eyebrow + title header and body, each revealed with BlurFade. */
export function Section({
  id,
  eyebrow,
  title,
  nav,
  index = 0,
  action,
  headingLevel = "h2",
  immediate = false,
  className,
  children,
}: SectionProps) {
  const Heading = headingLevel;
  return (
    <section id={id} data-nav={nav} aria-labelledby={`${id}-title`} className={cn("scroll-mt-24", className)}>
      <BlurFade immediate={immediate} index={index} className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div className="space-y-3">
          <PsEyebrow shape={eyebrow.shape} label={eyebrow.label} />
          <Heading id={`${id}-title`} className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </Heading>
        </div>
        {action}
      </BlurFade>
      <BlurFade immediate={immediate} index={index + 1}>
        {children}
      </BlurFade>
    </section>
  );
}
