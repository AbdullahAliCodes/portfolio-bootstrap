"use client";

import { Component, type ReactNode } from "react";
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

export function ContributionsCalendar({ username, fallback }: { username: string; fallback: string }) {
  const fallbackNode = <p className="py-8 text-center text-sm text-muted-foreground">{fallback}</p>;
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
