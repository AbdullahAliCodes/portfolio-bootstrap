/**
 * The four PlayStation face-button shapes and their canonical colors.
 * triangle = teal = home, circle = red = about, cross = blue = projects, square = yellow = contact.
 *
 * Class strings are written out in full so Tailwind can detect them.
 */
export type PsShape = "triangle" | "circle" | "cross" | "square";

export const PS_SHAPES: readonly PsShape[] = ["triangle", "circle", "cross", "square"];

export const psShapeMeta: Record<
  PsShape,
  {
    name: string;
    /** Text color (SVG uses currentColor). */
    text: string;
    /** Dark-mode-only text color, for hover / active states. */
    darkText: string;
    darkHoverText: string;
    darkGroupHoverText: string;
    border: string;
    hoverBorder: string;
    ring: string;
    bgSoft: string;
  }
> = {
  triangle: {
    name: "Triangle",
    text: "text-ps-teal",
    darkText: "dark:text-ps-teal",
    darkHoverText: "dark:hover:text-ps-teal",
    darkGroupHoverText: "dark:group-hover:text-ps-teal",
    border: "border-ps-teal",
    hoverBorder: "hover:border-ps-teal/70",
    ring: "ring-ps-teal",
    bgSoft: "bg-ps-teal/15",
  },
  circle: {
    name: "Circle",
    text: "text-ps-red",
    darkText: "dark:text-ps-red",
    darkHoverText: "dark:hover:text-ps-red",
    darkGroupHoverText: "dark:group-hover:text-ps-red",
    border: "border-ps-red",
    hoverBorder: "hover:border-ps-red/70",
    ring: "ring-ps-red",
    bgSoft: "bg-ps-red/15",
  },
  cross: {
    name: "Cross",
    text: "text-ps-blue",
    darkText: "dark:text-ps-blue",
    darkHoverText: "dark:hover:text-ps-blue",
    darkGroupHoverText: "dark:group-hover:text-ps-blue",
    border: "border-ps-blue",
    hoverBorder: "hover:border-ps-blue/70",
    ring: "ring-ps-blue",
    bgSoft: "bg-ps-blue/15",
  },
  square: {
    name: "Square",
    text: "text-ps-yellow",
    darkText: "dark:text-ps-yellow",
    darkHoverText: "dark:hover:text-ps-yellow",
    darkGroupHoverText: "dark:group-hover:text-ps-yellow",
    border: "border-ps-yellow",
    hoverBorder: "hover:border-ps-yellow/70",
    ring: "ring-ps-yellow",
    bgSoft: "bg-ps-yellow/15",
  },
};
