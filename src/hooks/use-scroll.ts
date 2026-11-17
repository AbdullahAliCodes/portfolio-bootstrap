"use client";

import { useSyncExternalStore } from "react";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

/** True once the page has scrolled more than `px` (false on the server). */
export function useScrolledPast(px: number) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > px,
    () => false,
  );
}

/** Matches a media query (false on the server). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
