import { cn } from "@/lib/utils";
import { PsSymbol } from "./ps-symbol";
import type { PsShape } from "./shapes";

type PsEyebrowProps = {
  shape: PsShape;
  label: string;
  className?: string;
};

/**
 * Sanyi-style section eyebrow ("— STACK"), with the leading rule replaced by a tiny PS symbol.
 */
export function PsEyebrow({ shape, label, className }: PsEyebrowProps) {
  return (
    <p className={cn("flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em]", className)}>
      <PsSymbol shape={shape} size={10} strokeWidth={3.5} />
      <span className="text-muted-foreground/60">{label}</span>
    </p>
  );
}
