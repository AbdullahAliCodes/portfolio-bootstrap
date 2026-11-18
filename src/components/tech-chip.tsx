import type { ComponentType } from "react";
import { Braces, Code, CreditCard, HardDrive, Layers, Webhook } from "lucide-react";
import type { IconBaseProps } from "react-icons";
import {
  SiAuth0,
  SiChakraui,
  SiCss,
  SiElementor,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRender,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWordpress,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { cn } from "@/lib/utils";

type IconType = ComponentType<IconBaseProps & { className?: string }>;

/** Tech name (as written in src/data/portfolio.ts) → logo. Simple Icons first, Lucide fallback. */
const techIcons: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  HTML5: SiHtml5,
  CSS: SiCss,
  CSS3: SiCss,
  "Custom CSS": SiCss,
  "Tailwind CSS": SiTailwindcss,
  "Chakra UI": SiChakraui,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  "REST APIs": Webhook,
  "Gemini API": SiGooglegemini,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  Firebase: SiFirebase,
  Git: SiGit,
  Vercel: SiVercel,
  Render: SiRender,
  Azure: VscAzure,
  Auth0: SiAuth0,
  Paystack: CreditCard,
  WordPress: SiWordpress,
  Elementor: SiElementor,
  "Slider Revolution": Layers,
  "Local Storage": HardDrive,
  OOP: Braces,
};

export function getTechIcon(name: string): IconType {
  return techIcons[name] ?? Code;
}

type TechChipProps = {
  name: string;
  size?: "sm" | "xs";
  className?: string;
};

/** A small rounded chip with the tech's logo and name. */
export function TechChip({ name, size = "sm", className }: TechChipProps) {
  const Icon = techIcons[name] ?? Code;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-muted/80 font-medium text-foreground dark:bg-muted/70",
        size === "sm" ? "gap-2 px-3 py-1.5 text-sm" : "gap-1.5 px-2.5 py-1 text-xs",
        className,
      )}
    >
      <Icon aria-hidden className={size === "sm" ? "size-4 shrink-0" : "size-3.5 shrink-0"} />
      {name}
    </span>
  );
}
