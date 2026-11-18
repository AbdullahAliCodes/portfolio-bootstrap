import { PsSymbol } from "@/components/ps";
import { Section } from "@/components/section";
import { TechChip } from "@/components/tech-chip";
import { sections, skillGroups } from "@/data/portfolio";

export function Stack({ index = 0 }: { index?: number }) {
  return (
    <Section id="about" nav="about" index={index} eyebrow={{ shape: "triangle", label: sections.stack.eyebrow }} title={sections.stack.title}>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            className="surface-card p-6 sm:p-7"
          >
            <h3 className="flex items-center gap-2.5 text-base font-semibold sm:text-lg">
              <PsSymbol shape={group.shape} size={13} strokeWidth={3.25} />
              {group.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">{group.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((t) => (
                <li key={t}>
                  <TechChip name={t} />
                </li>
              ))}
              {group.concepts?.map((c) => (
                <li key={c}>
                  <TechChip name={c} className="border border-dashed border-border bg-transparent dark:bg-transparent" />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
