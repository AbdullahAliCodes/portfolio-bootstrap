"use client";

import { useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Light/dark toggle. Both icons are rendered and swapped with CSS (`dark:`), so the server
 * markup never depends on the theme and there's nothing to mismatch on hydration.
 * Easter egg: the icon does a full spin on every press.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [spins, setSpins] = useState(0);

  return (
    <button
      type="button"
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        setSpins((n) => n + 1);
      }}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <motion.span
        className="inline-flex"
        animate={{ rotate: reduceMotion ? 0 : spins * 360 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
      >
        <MoonStar className="hidden size-[18px] dark:block" aria-hidden />
        <Sun className="size-[18px] dark:hidden" aria-hidden />
      </motion.span>
    </button>
  );
}
