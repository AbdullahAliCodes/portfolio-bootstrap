import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
import { psShapeMeta, type PsShape } from "./shapes";

type PsSymbolProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  shape: PsShape;
  /** Rendered size in px. */
  size?: number;
  /** Stroke width in viewBox units (viewBox is 24). */
  strokeWidth?: number;
  /** Use the shape's canonical PS color. Set false to inherit currentColor. */
  colored?: boolean;
  /** Accessible name. When omitted the symbol is decorative (aria-hidden). */
  label?: string;
};

/**
 * A PlayStation face-button symbol as inline SVG (consistent across fonts/platforms).
 */
export function PsSymbol({
  shape,
  size = 16,
  strokeWidth = 2.5,
  colored = true,
  label,
  className,
  ...props
}: PsSymbolProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", colored && psShapeMeta[shape].text, className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      focusable="false"
      {...props}
    >
      {shape === "triangle" && <path d="M12 3.5 21.5 20h-19Z" />}
      {shape === "circle" && <circle cx="12" cy="12" r="8.5" />}
      {shape === "cross" && <path d="M5 5l14 14M19 5 5 19" />}
      {shape === "square" && <rect x="4" y="4" width="16" height="16" rx="1" />}
    </svg>
  );
}
