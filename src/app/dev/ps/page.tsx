import type { Metadata } from "next";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PS_SHAPES, PsButton, PsEyebrow, PsSymbol, psShapeMeta } from "@/components/ps";
import { cn } from "@/lib/utils";

// TEMPORARY design-system check page (REDESIGN_PLAN Phase 2). Delete in Phase 7.
export const metadata: Metadata = { title: "PS primitives", robots: { index: false } };

const tokens = [
  ["background", "bg-background"],
  ["card", "bg-card"],
  ["muted", "bg-muted"],
  ["border", "bg-border"],
  ["foreground", "bg-foreground"],
  ["muted-fg", "bg-muted-foreground"],
  ["primary", "bg-primary"],
  ["primary-hover", "bg-primary-hover"],
  ["ps-teal", "bg-ps-teal"],
  ["ps-red", "bg-ps-red"],
  ["ps-blue", "bg-ps-blue"],
  ["ps-yellow", "bg-ps-yellow"],
  ["ps-pink", "bg-ps-pink"],
] as const;

const navDemo = [
  { label: "Home", shape: "triangle", active: true },
  { label: "About", shape: "circle", active: false },
  { label: "Projects", shape: "cross", active: false },
  { label: "Contact", shape: "square", active: false },
] as const;

const eyebrows = [
  ["triangle", "stack"],
  ["cross", "builds"],
  ["circle", "experience"],
  ["square", "education"],
  ["triangle", "achievements"],
  ["cross", "open source"],
  ["square", "contact"],
] as const;

const navHover = {
  triangle: "hover:text-ps-teal",
  circle: "hover:text-ps-red",
  cross: "hover:text-ps-blue",
  square: "hover:text-ps-yellow",
} as const;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default function PsDevPage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-12 px-6 py-12 sm:space-y-14">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">dev only</p>
          <h1 className="text-2xl font-bold tracking-tight">PS primitives</h1>
        </div>
        <ThemeToggle />
      </header>

      <Block title="Hero backdrop + display font">
        <div className="relative overflow-hidden rounded-xl border border-border/60">
          <div className="hero-gradient absolute inset-0 -z-0" aria-hidden />
          <div className="relative space-y-2 px-6 pb-16 pt-10">
            <p className="font-display text-5xl lowercase sm:text-6xl">abdullah ali</p>
            <p className="text-sm text-muted-foreground">
              third-year cs @ wits · <span className="text-foreground">aspiring software engineer.</span>
            </p>
          </div>
        </div>
      </Block>

      <Block title="Tokens">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {tokens.map(([name, cls]) => (
            <div key={name} className="space-y-1.5">
              <div className={cn("h-12 rounded-lg border border-border/60", cls)} />
              <p className="font-mono text-[11px] text-muted-foreground">{name}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="PsSymbol">
        <div className="rounded-xl border border-border/50 bg-card/30 p-4">
          {PS_SHAPES.map((shape) => (
            <div key={shape} className="flex items-center gap-5 py-2">
              <span className="w-20 text-sm text-muted-foreground">{psShapeMeta[shape].name}</span>
              {[10, 16, 24, 40].map((size) => (
                <PsSymbol key={size} shape={shape} size={size} />
              ))}
              <PsSymbol shape={shape} size={24} colored={false} className="text-muted-foreground" />
              <span className="font-display text-2xl">{shape === "triangle" ? "△" : shape === "circle" ? "○" : shape === "cross" ? "✕" : "□"}</span>
            </div>
          ))}
          <p className="pt-2 text-xs text-muted-foreground">
            Sizes 10 / 16 / 24 / 40px, then uncolored (currentColor), then the Unicode glyph in Nova Klasse for comparison.
          </p>
        </div>
      </Block>

      <Block title="PsButton (port of .ps-btn)">
        <div className="space-y-4 rounded-xl border border-border/50 bg-card/30 p-4 text-sm">
          {(["sm", "md"] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-4">
              <span className="w-20 text-muted-foreground">{size}</span>
              {PS_SHAPES.map((shape) => (
                <PsButton key={shape} shape={shape} size={size} />
              ))}
              <span className="text-muted-foreground">active →</span>
              {PS_SHAPES.map((shape) => (
                <PsButton key={shape} shape={shape} size={size} active />
              ))}
            </div>
          ))}
          <div className="space-y-2 border-t border-border/50 pt-4">
            <p className="text-xs text-muted-foreground">Hero &ldquo;currently&rdquo; chips (hover a row in dark mode):</p>
            <div className="group flex w-fit items-center gap-2.5">
              <PsButton shape="circle" />
              <span>Computer Science [III] · Wits</span>
            </div>
            <div className="group flex w-fit items-center gap-2.5">
              <PsButton shape="cross" />
              <span>Mathematics Tutor</span>
            </div>
          </div>
        </div>
      </Block>

      <Block title="PsEyebrow">
        <div className="grid gap-6 rounded-xl border border-border/50 bg-card/30 p-4 sm:grid-cols-2">
          {eyebrows.map(([shape, label]) => (
            <div key={label} className="space-y-1.5">
              <PsEyebrow shape={shape} label={label} />
              <p className="text-xl font-bold tracking-tight">Section title</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Nav pill + floating indicator (preview)">
        <div className="flex justify-center rounded-xl border border-border/50 bg-card/30 px-4 pb-8 pt-6">
          <nav aria-label="Preview" className="flex gap-0.5 rounded-xl bg-muted/40 p-0.5">
            {navDemo.map((item) => (
              <span
                key={item.label}
                className={cn(
                  "relative rounded-[10px] px-3 py-1.5 text-[13px] text-muted-foreground transition-colors",
                  navHover[item.shape],
                  "dark:hover:text-foreground",
                  item.active && "bg-background/80 text-foreground shadow-sm",
                  item.active && psShapeMeta[item.shape].text,
                  item.active && "dark:text-foreground",
                )}
              >
                {item.label}
                {item.active && (
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <PsSymbol shape={item.shape} size={10} strokeWidth={3.5} className="motion-safe:animate-ps-float" />
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </Block>

      <Block title="Type scale">
        <div className="space-y-3 rounded-xl border border-border/50 bg-card/30 p-4">
          <p className="text-xl font-bold tracking-tight">Section title, 20px bold, tracking-tight</p>
          <p className="text-sm font-semibold">Card title, 14px semibold</p>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            Body copy, 14px muted with relaxed leading and a max-w-lg measure. This is how bio paragraphs and
            card descriptions will read across the site in both themes.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary-hover">
              Primary
            </button>
            <span className="rounded-md border border-border/60 bg-card/40 px-2 py-0.5 text-xs text-muted-foreground">badge</span>
          </div>
        </div>
      </Block>
    </main>
  );
}
