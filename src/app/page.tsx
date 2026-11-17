import { Section } from "@/components/section";

// TEMPORARY Phase 4 shell check; replaced by the real sections in Phase 5.
const filler = Array.from({ length: 6 }, (_, i) => i);

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-14">
      <section id="home" data-nav="home" className="flex min-h-[60vh] items-center">
        <h1 className="font-display text-5xl lowercase">shell check</h1>
      </section>
      {(
        [
          ["about", "about", "triangle", "stack", "What I Work With"],
          ["projects", "projects", "cross", "builds", "Featured Projects"],
          ["experience", "about", "circle", "experience", "Work"],
          ["contact", "contact", "square", "contact", "Want to work with me?"],
        ] as const
      ).map(([id, nav, shape, label, title], i) => (
        <Section key={id} id={id} nav={nav} index={i} eyebrow={{ shape, label }} title={title}>
          <div className="grid gap-3 sm:grid-cols-2">
            {filler.map((n) => (
              <div key={n} className="h-28 rounded-xl border border-border/50 bg-card/30" />
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
