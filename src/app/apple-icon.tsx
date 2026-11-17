import { ImageResponse } from "next/og";
import { palette } from "@/lib/palette";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const { dark, ps } = palette;

/** Home-screen icon: the four PS face buttons in a diamond, like a controller. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: dark.background }}>
        <svg width="180" height="180" viewBox="0 0 64 64" fill="none" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 7.5 39.5 20.5h-15Z" stroke={ps.teal} />
          <circle cx="48" cy="32" r="7" stroke={ps.red} />
          <path d="M26.5 38.5l11 11M37.5 38.5l-11 11" stroke={ps.blue} />
          <rect x="9" y="25" width="14" height="14" rx="1" stroke={ps.yellow} />
        </svg>
      </div>
    ),
    size,
  );
}
