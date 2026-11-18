import type { ComponentType } from "react";

export type CompactItem = { title: string; badge?: string; line?: string };

/** Sanyi-style compact list: icon tile, title + small badge, muted role line. */
export function CompactList({ items, icon: Icon }: { items: CompactItem[]; icon: ComponentType<{ className?: string }> }) {
  return (
    <ul className="surface-card divide-y divide-border/40 overflow-hidden">
      {items.map((item) => (
        <li key={item.title} className="flex items-start gap-4 p-6 sm:p-7">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground dark:bg-muted/70">
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 space-y-1">
            <p className="flex flex-wrap items-center gap-2.5 text-base font-semibold sm:text-lg">
              {item.title}
              {item.badge && (
                <span className="rounded-md bg-muted/80 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground dark:bg-muted/70">
                  {item.badge}
                </span>
              )}
            </p>
            {item.line && <p className="text-sm text-muted-foreground sm:text-base">{item.line}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
