import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, site } from "@/data/portfolio";
import { palette } from "@/lib/palette";

export const alt = `${site.title}: ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const novaKlasse = await readFile(join(process.cwd(), "src/app/fonts/novaklasse-semibold-BF65f32c1d1314a.otf"));

const { dark, ps } = palette;

function Symbol({ shape, color }: { shape: "triangle" | "circle" | "cross" | "square"; color: string }) {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      {shape === "triangle" && <path d="M12 3.5 21.5 20h-19Z" />}
      {shape === "circle" && <circle cx="12" cy="12" r="8.5" />}
      {shape === "cross" && <path d="M5 5l14 14M19 5 5 19" />}
      {shape === "square" && <rect x="4" y="4" width="16" height="16" rx="1" />}
    </svg>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: dark.foreground,
          backgroundColor: dark.background,
          backgroundImage: `radial-gradient(${dark.border} 1.5px, transparent 1.5px), linear-gradient(120deg, ${dark.background} 0%, ${dark.card} 45%, ${dark.border} 70%, ${dark.background} 100%)`,
          backgroundSize: "32px 32px, 100% 100%",
        }}
      >
        <div style={{ display: "flex", gap: 22 }}>
          <Symbol shape="triangle" color={ps.teal} />
          <Symbol shape="circle" color={ps.red} />
          <Symbol shape="cross" color={ps.blue} />
          <Symbol shape="square" color={ps.yellow} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontFamily: "Nova Klasse", fontSize: 128, lineHeight: 1 }}>{profile.displayName}</div>
          <div style={{ fontSize: 40, color: dark.muted }}>{profile.title.toLowerCase()}</div>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            backgroundImage: `linear-gradient(90deg, ${ps.teal}, ${ps.red}, ${ps.blue}, ${ps.yellow})`,
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Nova Klasse", data: novaKlasse, weight: 600, style: "normal" }] },
  );
}
