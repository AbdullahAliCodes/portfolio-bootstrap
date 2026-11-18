"use client";

import { ArrowUp } from "lucide-react";
import { useScrolledPast } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

/** Round back-to-top button, bottom right, shown after scrolling down. */
export function BackToTop() {
  const visible = useScrolledPast(400);

  return (
    <button
      type="button"
      inert={!visible}
      aria-label="Back to top"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className={cn(
        "fixed bottom-4 right-4 z-50 inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-card/75 text-muted-foreground shadow-lg shadow-black/10 backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:bottom-6 sm:right-6",
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}
