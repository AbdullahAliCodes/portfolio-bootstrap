import { Briefcase } from "lucide-react";
import { CompactList } from "@/components/compact-list";
import { Section } from "@/components/section";
import { experience, sections } from "@/data/portfolio";

export function Experience({ index = 0 }: { index?: number }) {
  return (
    <Section id="experience" nav="about" index={index} eyebrow={{ shape: "circle", label: sections.experience.eyebrow }} title={sections.experience.title}>
      <CompactList icon={Briefcase} items={experience.map((e) => ({ title: e.role, badge: e.badge, line: e.line }))} />
    </Section>
  );
}
