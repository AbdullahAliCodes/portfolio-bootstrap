import type { ComponentType } from "react";
import type { IconBaseProps } from "react-icons";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiInstagram } from "react-icons/si";
import { socials, type SocialKind } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export const socialIcons: Record<SocialKind, ComponentType<IconBaseProps>> = {
  github: SiGithub,
  linkedin: FaLinkedin,
  instagram: SiInstagram,
};

/** Row of round icon-only social buttons (Sanyi pattern). */
export function SocialLinks({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map((s) => {
        const Icon = socialIcons[s.kind];
        return (
          <li key={s.kind}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} (opens in a new tab)`}
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-border/60 bg-card/40 text-muted-foreground transition duration-300 ease-out hover:-translate-y-0.5 hover:border-border hover:bg-card/70 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                size === "md" ? "p-2.5" : "p-2",
              )}
            >
              <Icon aria-hidden className={size === "md" ? "size-4" : "size-3.5"} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
