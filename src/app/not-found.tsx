import type { Metadata } from "next";
import Link from "next/link";
import { PsButton, PsSymbol } from "@/components/ps";
import { sections } from "@/data/portfolio";

export const metadata: Metadata = { title: "Game Over", robots: { index: false } };

export default function NotFound() {
  const { title, copy, cta } = sections.notFound;
  // The ✕ in the CTA copy is drawn as a PsButton instead.
  const [ctaBefore, ctaAfter] = cta.split("✕");
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div aria-hidden className="flex gap-3">
        <PsSymbol shape="triangle" size={18} />
        <PsSymbol shape="circle" size={18} />
        <PsSymbol shape="cross" size={18} />
        <PsSymbol shape="square" size={18} />
      </div>
      <h1 className="font-display text-5xl sm:text-7xl">{title}</h1>
      <p className="text-sm text-muted-foreground">
        <span className="font-mono">404</span> · {copy}
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 py-1.5 pl-3 pr-4 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {ctaBefore.trim()}
        <PsButton shape="cross" />
        {ctaAfter.trim()}
      </Link>
    </div>
  );
}
