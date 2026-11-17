import type { ComponentType } from "react";

export type CompactItem = { title: string; badge?: string; line?: string };

/** Sanyi-style compact list: icon tile, title + small badge, muted role line. */
export function CompactList({ items, icon: Icon }: { items: CompactItem[]; icon: ComponentType<{ className?: string }> }) {
  return (
    <ul className="divide-y divide-border/40 overflow-hidden rounded-xl border border-border/50 bg-card/30">
      {items.map((item) => (
        <li key={item.title} className="flex items-start gap-3 p-4 transition-colors hover:bg-card/50">
          <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/40 text-muted-foreground">
            <Icon className="size-4" aria-hidden />
          </span>
          <div className="min-w-0 space-y-0.5">
            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              {item.title}
              {item.badge && (
                <span className="rounded-md border border-border/60 bg-background/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {item.badge}
                </span>
              )}
            </p>
            {item.line && <p className="text-sm text-muted-foreground">{item.line}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
