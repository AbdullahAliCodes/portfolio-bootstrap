/**
 * Hex mirror of the palette in src/app/globals.css, ONLY for contexts that can't read CSS
 * variables (generated OG/icon images, viewport theme-color). Components must use Tailwind
 * tokens instead. Keep in sync with globals.css.
 */
export const palette = {
  dark: { background: "#0a0a12", card: "#16213e", border: "#2a3b5c", foreground: "#f8f9fa", muted: "#a6cdef" },
  light: { background: "#dcdcdc", card: "#ebebef", border: "#b8b8c0", foreground: "#2b2b36", muted: "#5e5f69" },
  ps: { teal: "#01aea0", red: "#ff0021", blue: "#2a69f0", yellow: "#ffc501", pink: "#ffa2d1" },
} as const;
