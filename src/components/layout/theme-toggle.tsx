"use client";

import { useState, type ComponentProps } from "react";
import { MoonStar, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Light/dark toggle. Both icons are rendered and swapped with CSS (`dark:`), so the server
 * markup never depends on the theme and there's nothing to mismatch on hydration.
 * Easter egg: the icon does a full spin on every press (skipped under reduced motion
 * by the root MotionConfig).
 *
 * Extra props are forwarded so it can be used as a Tooltip trigger.
 */
export function ThemeToggle({ className, onClick, ...props }: ComponentProps<"button">) {
  const { resolvedTheme, setTheme } = useTheme();
  const [spins, setSpins] = useState(0);

  return (
    <button
      type="button"
      aria-label="Toggle light and dark theme"
      {...props}
      onClick={(e) => {
        onClick?.(e);
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
        animate={{ rotate: spins * 360 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
      >
        <MoonStar className="hidden size-4.5 dark:block" aria-hidden />
        <Sun className="size-4.5 dark:hidden" aria-hidden />
      </motion.span>
    </button>
  );
}
