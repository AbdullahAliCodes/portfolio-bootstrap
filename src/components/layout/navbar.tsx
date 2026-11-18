"use client";

import { useState } from "react";
import Link from "next/link";
import { House } from "lucide-react";
import { motion } from "motion/react";
import { PsSymbol, psShapeMeta, type PsShape } from "@/components/ps";
import { nav, type NavKey } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolledPast } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

/** Inactive symbols are greyed out and light up in their PS colour on hover. */
const groupHoverColor: Record<PsShape, string> = {
  triangle: "group-hover:text-ps-teal",
  circle: "group-hover:text-ps-red",
  cross: "group-hover:text-ps-blue",
  square: "group-hover:text-ps-yellow",
};

/**
 * A nav item's PS symbol. Each click remounts it (key = press count) to replay a controller
 * "button press": squash down, overshoot, settle. Count 0 renders static, so nothing plays
 * on page load. Reduced motion: the root MotionConfig skips the scale.
 */
function PressableSymbol({ shape, active, presses }: { shape: PsShape; active: boolean; presses: number }) {
  return (
    <motion.span
      key={presses}
      aria-hidden
      className="inline-flex"
      animate={presses > 0 ? { scale: [1, 0.55, 1.2, 1] } : undefined}
      transition={{ duration: 0.38, times: [0, 0.3, 0.65, 1], ease: "easeOut" }}
    >
      <PsSymbol
        shape={shape}
        size={10}
        strokeWidth={3.5}
        colored={false}
        className={cn(
          "transition-colors duration-200",
          active ? psShapeMeta[shape].text : cn("text-muted-foreground/50", groupHoverColor[shape]),
        )}
      />
    </motion.span>
  );
}

/**
 * Fixed top bar: home icon, segmented pill links (each with its PS symbol to the left of the
 * label, coloured when active) with a sliding active pill, and the theme toggle. Below `sm`
 * the links collapse and the bottom dock takes over navigation.
 */
export function Navbar() {
  const active = useActiveSection();
  const scrolled = useScrolledPast(8);
  const [presses, setPresses] = useState<Partial<Record<NavKey, number>>>({});

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-border/50 bg-background/75 backdrop-blur-md" : "border-transparent",
      )}
    >
      <nav aria-label="Main" className="page-container flex h-16 items-center justify-between">
        <Link
          href="/#home"
          aria-label="Home"
          className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <House className="size-4.5" aria-hidden />
        </Link>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-0.5 rounded-xl border border-border/40 bg-muted/40 p-0.5 sm:flex">
            {nav.map((item) => {
              const isActive = active === item.key;
              const meta = psShapeMeta[item.shape];
              return (
                <li key={item.key} className="relative">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "group relative isolate flex items-center gap-1.5 rounded-[10px] py-1.5 pl-2.5 pr-3 text-[13px] text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      meta.hoverInk,
                      "dark:hover:text-foreground",
                      isActive && cn("font-medium", meta.ink, "dark:text-foreground"),
                    )}
                    onClick={() => setPresses((p) => ({ ...p, [item.key]: (p[item.key] ?? 0) + 1 }))}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-[10px] bg-card shadow-sm ring-1 ring-border/60"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <PressableSymbol shape={item.shape} active={isActive} presses={presses[item.key] ?? 0} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
