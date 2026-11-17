"use client";

import { PsSymbol, type PsShape } from "@/components/ps";
import { projectCategories, type ProjectCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export type FilterKey = ProjectCategory | "all";

const activeStyles: Record<PsShape | "none", string> = {
  none: "border-foreground/40 bg-foreground/10 text-foreground",
  triangle: "border-ps-teal bg-ps-teal/15 text-ps-teal-ink",
  circle: "border-ps-red bg-ps-red/15 text-ps-red-ink",
  cross: "border-ps-blue bg-ps-blue/15 text-ps-blue-ink",
  square: "border-ps-yellow bg-ps-yellow/15 text-ps-yellow-ink",
};

/** PS-coloured filter chips. Toggle buttons (aria-pressed) in a labelled group. */
export function ProjectFilters({
  value,
  counts,
  onChange,
}: {
  value: FilterKey;
  counts: Record<FilterKey, number>;
  onChange: (key: FilterKey) => void;
}) {
  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {projectCategories.map((c) => {
        const active = value === c.key;
        return (
          <button
            key={c.key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(c.key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              active
                ? activeStyles[c.shape ?? "none"]
                : "border-border/60 bg-card/30 text-muted-foreground hover:border-border hover:bg-card/60 hover:text-foreground",
            )}
          >
            {c.shape && <PsSymbol shape={c.shape} size={11} strokeWidth={3.5} />}
            {c.label}
            <span className={cn("tabular-nums", active ? "opacity-80" : "text-muted-foreground")}>{counts[c.key]}</span>
          </button>
        );
      })}
    </div>
  );
}
