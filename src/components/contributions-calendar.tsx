"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

// The calendar fetches from a third-party API in the browser: load its JS lazily and never on the server.
const GitHubCalendar = dynamic(() => import("react-github-calendar").then((m) => m.GitHubCalendar), {
  ssr: false,
  loading: () => <CalendarSkeleton />,
});

/** PS-teal scale built from theme tokens (the library mixes these with color-mix()). */
const tealScale = ["color-mix(in oklab, var(--border) 55%, transparent)", "var(--ps-teal)"];

class CalendarErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function CalendarSkeleton() {
  return <div aria-hidden className="h-[132px] w-full animate-pulse rounded-lg bg-muted/40 motion-reduce:animate-none" />;
}

/** Mounts children only once the placeholder scrolls near the viewport. */
function useNearViewport<T extends Element>(margin = "300px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, near] as const;
}

/**
 * The calendar's fetch + ~370-cell SVG render is the heaviest thing on the page, so it is
 * deferred until its section approaches the viewport (keeps it off the initial load).
 */
export function ContributionsCalendar({ username, fallback }: { username: string; fallback: string }) {
  const [ref, near] = useNearViewport<HTMLDivElement>();
  const fallbackNode = <p className="py-8 text-center text-sm text-muted-foreground">{fallback}</p>;
  if (!near) {
    return (
      <div ref={ref}>
        <CalendarSkeleton />
      </div>
    );
  }
  return (
    <CalendarErrorBoundary fallback={fallbackNode}>
      <div className="text-muted-foreground [&_svg]:max-w-none">
        <GitHubCalendar
          username={username}
          errorMessage={fallback}
          blockSize={11}
          blockMargin={3}
          fontSize={12}
          colorScheme="dark"
          theme={{ light: tealScale, dark: tealScale }}
        />
      </div>
    </CalendarErrorBoundary>
  );
}
