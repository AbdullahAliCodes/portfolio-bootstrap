"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavKey } from "@/data/portfolio";

/**
 * Which nav item is active. On the home page this follows the section in view
 * (sections declare their nav item with `data-nav`); on /projects it is always "projects".
 */
export function useActiveSection(): NavKey | null {
  const pathname = usePathname();
  const [inView, setInView] = useState<NavKey>("home");

  useEffect(() => {
    if (pathname !== "/") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    if (els.length === 0) return;
    const visible = new Set<Element>();

    const pick = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const el = atBottom ? els[els.length - 1] : els.find((e) => visible.has(e));
      if (el) setInView(el.dataset.nav as NavKey);
    };

    // A thin band ~40% down the viewport decides the "current" section.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        pick();
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    window.addEventListener("scroll", pick, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", pick);
    };
  }, [pathname]);

  if (pathname.startsWith("/projects")) return "projects";
  if (pathname !== "/") return null;
  return inView;
}
