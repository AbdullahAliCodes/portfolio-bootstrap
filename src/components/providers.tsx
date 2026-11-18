"use client";

import { MotionConfig } from "motion/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

/** Client-side providers. `reducedMotion="user"` makes every motion animation respect the OS setting. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <TooltipProvider delay={150}>{children}</TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
