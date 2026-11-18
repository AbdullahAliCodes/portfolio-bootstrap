"use client";

import Link from "next/link";
import { House } from "lucide-react";
import { motion } from "motion/react";
import { PsSymbol, psShapeMeta } from "@/components/ps";
import { nav } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolledPast } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

/**
 * Fixed top bar: home icon, segmented pill links with a sliding active pill and a floating
 * PS symbol under the active link, and the theme toggle. Below `sm` the links collapse and
 * the bottom dock takes over navigation.
 */
export function Navbar() {
  const active = useActiveSection();
  const scrolled = useScrolledPast(8);

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
                      "relative isolate block rounded-[10px] px-3 py-1.5 text-[13px] text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      meta.hoverInk,
                      "dark:hover:text-foreground",
                      isActive && cn("font-medium", meta.ink, "dark:text-foreground"),
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-[10px] bg-card shadow-sm ring-1 ring-border/60"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </Link>
                  {isActive && (
                    <motion.span
                      layoutId="nav-symbol"
                      aria-hidden
                      className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    >
                      <PsSymbol shape={item.shape} size={9} strokeWidth={3.5} className="block motion-safe:animate-ps-float" />
                    </motion.span>
                  )}
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
