"use client";

import Link from "next/link";
import { FolderGit2, House, User } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { PsSymbol, psShapeMeta, type PsShape } from "@/components/ps";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { nav, socials, type NavKey } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { useMediaQuery, useScrolledPast } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navIcons: Partial<Record<NavKey, React.ComponentType<{ className?: string }>>> = {
  home: House,
  about: User,
  projects: FolderGit2,
};

const github = socials.find((s) => s.kind === "github");

const itemClass =
  "relative inline-flex size-9 items-center justify-center rounded-full text-muted-foreground outline-none ring-0 transition-[color,box-shadow,background-color] duration-200 hover:text-foreground hover:ring-2 focus-visible:text-foreground focus-visible:ring-2 sm:size-10";

/**
 * Floating controller-face dock at the bottom centre. Appears after 200px of scroll on
 * desktop and is always shown on mobile, where it replaces the navbar links.
 * Each button gets a ring in its PS colour on hover/focus.
 */
export function Dock() {
  const active = useActiveSection();
  const scrolled = useScrolledPast(200);
  const isMobile = useMediaQuery("(max-width: 639px)");
  const visible = scrolled || isMobile;

  const navItems = nav.filter((n) => navIcons[n.key]);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transition-[opacity,translate] duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <nav
        aria-label="Quick navigation"
        className="flex items-center gap-1 rounded-full border border-border/60 bg-card/75 p-1.5 shadow-lg shadow-black/10 backdrop-blur-md"
      >
        {navItems.map((item) => {
          const Icon = navIcons[item.key]!;
          const isActive = active === item.key;
          return (
            <DockTooltip key={item.key} label={item.label}>
              <TooltipTrigger
                render={
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(itemClass, ringFor(item.shape), isActive && "bg-muted text-foreground")}
                  />
                }
              >
                <Icon className="size-4.5" aria-hidden />
                {isActive && (
                  <PsSymbol shape={item.shape} size={7} strokeWidth={4} className="absolute bottom-0.5 left-1/2 -translate-x-1/2" />
                )}
              </TooltipTrigger>
            </DockTooltip>
          );
        })}

        <span aria-hidden className="mx-1 h-5 w-px bg-border" />

        {github && (
          <DockTooltip label="GitHub">
            <TooltipTrigger
              render={
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (opens in a new tab)"
                  className={cn(itemClass, ringFor("square"))}
                />
              }
            >
              <SiGithub className="size-4" aria-hidden />
            </TooltipTrigger>
          </DockTooltip>
        )}

        <DockTooltip label="Theme">
          <TooltipTrigger render={<ThemeToggle className={cn(itemClass, "hover:bg-transparent hover:ring-ps-pink focus-visible:outline-none focus-visible:ring-ps-pink")} />} />
        </DockTooltip>
      </nav>
    </div>
  );
}

function ringFor(shape: PsShape) {
  return cn(psShapeMeta[shape].darkHoverRing, psShapeMeta[shape].focusRing);
}

function DockTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      {children}
      <TooltipContent side="top" sideOffset={10}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
