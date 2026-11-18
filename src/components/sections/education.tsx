import { GraduationCap } from "lucide-react";
import { CompactList } from "@/components/compact-list";
import { Section } from "@/components/section";
import { education, sections } from "@/data/portfolio";

export function Education({ index = 0 }: { index?: number }) {
  return (
    <Section id="education" nav="about" index={index} eyebrow={{ shape: "square", label: sections.education.eyebrow }} title={sections.education.title}>
      <CompactList icon={GraduationCap} items={education.map((e) => ({ title: e.institution, badge: e.badge, line: e.qualification }))} />
    </Section>
  );
}
