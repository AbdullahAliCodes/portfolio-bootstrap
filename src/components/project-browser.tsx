"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProjectCard } from "@/components/project-card";
import { ProjectFilters, type FilterKey } from "@/components/project-filters";
import { projectCategories, projects, sections } from "@/data/portfolio";

const validKeys = new Set<string>(projectCategories.map((c) => c.key));

const counts = Object.fromEntries(
  projectCategories.map((c) => [c.key, c.key === "all" ? projects.length : projects.filter((p) => p.category === c.key).length]),
) as Record<FilterKey, number>;

function parseFilter(raw: string | null): FilterKey {
  return raw && validKeys.has(raw) ? (raw as FilterKey) : "all";
}

/*
 * ?filter= as an external store. Unlike useSearchParams this needs no <Suspense>: the
 * server snapshot ("all") matches the prerendered HTML, so hydration keeps the existing DOM
 * (and its LCP image) and only re-renders if the URL actually holds a filter.
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

function readFilter(): FilterKey {
  return parseFilter(new URLSearchParams(window.location.search).get("filter"));
}

function writeFilter(key: FilterKey) {
  const url = key === "all" ? "/projects" : `/projects?filter=${key}`;
  // Next.js integrates with the History API, so this keeps its router state in sync.
  window.history.replaceState(null, "", url);
  listeners.forEach((l) => l());
}

/** Filter chips + animated grid; the active filter lives in the URL so views are shareable. */
export function ProjectBrowser() {
  const filter = useSyncExternalStore(subscribe, readFilter, () => "all" as const);
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="space-y-6">
      <ProjectFilters value={filter} counts={counts} onChange={writeFilter} />
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>
      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">{sections.allProjects.empty}</p>
      ) : (
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ProjectCard project={p} headingLevel="h2" highPriority={i === 0} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
