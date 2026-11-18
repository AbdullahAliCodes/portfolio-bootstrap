import { PsButton } from "@/components/ps";
import { Section } from "@/components/section";
import { profile, sections } from "@/data/portfolio";

export function Contact({ index = 0 }: { index?: number }) {
  return (
    <Section id="contact" nav="contact" index={index} eyebrow={{ shape: "square", label: sections.contact.eyebrow }} title={sections.contact.title}>
      <div className="surface-card p-6 sm:p-7">
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{sections.contact.copy}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          {/* PS "✕ to confirm" */}
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-1.5 pr-4 text-sm font-medium text-primary-foreground shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:translate-y-0"
          >
            <PsButton shape="cross" tone="inverse" />
            {sections.contact.cta}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </Section>
  );
}
