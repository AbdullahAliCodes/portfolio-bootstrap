"use client";

import { useSearchParams } from "next/navigation";
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

/** Reads ?filter= from the URL. Must sit inside <Suspense> (Cache Components). */
export function ProjectBrowserFromUrl() {
  const filter = parseFilter(useSearchParams().get("filter"));
  return <ProjectBrowser filter={filter} />;
}

/**
 * Filter chips + animated grid. Filter changes go into the URL with the History API
 * (Next.js syncs useSearchParams), so filtered views are shareable without a navigation.
 */
export function ProjectBrowser({ filter }: { filter: FilterKey }) {
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const setFilter = (key: FilterKey) => {
    const url = key === "all" ? "/projects" : `/projects?filter=${key}`;
    window.history.replaceState(null, "", url);
  };

  return (
    <div className="space-y-6">
      <ProjectFilters value={filter} counts={counts} onChange={setFilter} />
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>
      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">{sections.allProjects.empty}</p>
      ) : (
        <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
