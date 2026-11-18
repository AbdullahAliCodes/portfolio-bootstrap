import { cn } from "@/lib/utils";
import { PsSymbol } from "./ps-symbol";
import { psShapeMeta, type PsShape } from "./shapes";

const sizes = {
  sm: { box: "size-[22px]", symbol: 10, stroke: 4.5 },
  md: { box: "size-8", symbol: 14, stroke: 3.5 },
} as const;

type PsButtonProps = {
  shape: PsShape;
  size?: keyof typeof sizes;
  /** Force the shape color in dark mode too (e.g. the item is selected). */
  active?: boolean;
  /** "inverse": white outline for use on a filled (primary) button; ignores shape colours. */
  tone?: "default" | "inverse";
  className?: string;
};

/**
 * Port of the legacy `.ps-btn`: a round, bordered "controller button" holding a PS symbol.
 * Purely visual (aria-hidden). Wrap it in a real <button>/<a> when it needs to be interactive.
 *
 * Light mode: the shape's color. Dark mode: muted, switching to the shape's color when the
 * badge (or a parent with `group`) is hovered, or when `active`.
 */
export function PsButton({ shape, size = "sm", active = false, tone = "default", className }: PsButtonProps) {
  const meta = psShapeMeta[shape];
  const s = sizes[size];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border-2 border-current transition-colors duration-200",
        s.box,
        tone === "inverse"
          ? "text-current"
          : [meta.text, active ? meta.darkText : "dark:text-muted-foreground", meta.darkHoverText, meta.darkGroupHoverText],
        className,
      )}
    >
      <PsSymbol shape={shape} size={s.symbol} strokeWidth={s.stroke} colored={false} />
    </span>
  );
}
