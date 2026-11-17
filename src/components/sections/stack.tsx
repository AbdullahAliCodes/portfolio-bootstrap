import { PsSymbol } from "@/components/ps";
import { Section } from "@/components/section";
import { TechChip } from "@/components/tech-chip";
import { sections, skillGroups } from "@/data/portfolio";

export function Stack({ index = 0 }: { index?: number }) {
  return (
    <Section id="about" nav="about" index={index} eyebrow={{ shape: "triangle", label: sections.stack.eyebrow }} title={sections.stack.title}>
      <div className="grid gap-3 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-xl border border-border/50 bg-card/30 p-4 transition-colors duration-300 hover:border-border hover:bg-card/50"
          >
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <PsSymbol shape={group.shape} size={11} strokeWidth={3.5} />
              {group.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((t) => (
                <li key={t}>
                  <TechChip name={t} />
                </li>
              ))}
              {group.concepts?.map((c) => (
                <li key={c}>
                  <TechChip name={c} className="border-dashed" />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
