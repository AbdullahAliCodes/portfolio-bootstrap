"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export const THEME_STORAGE_KEY = "theme";
/** Key used by the old Bootstrap site; migrated by the inline script in layout.tsx. */
export const LEGACY_THEME_STORAGE_KEY = "portfolio-bs-theme";

/**
 * next-themes renders an inline <script> to set the theme before paint. React warns about
 * <script> elements rendered on the client, so (per the Next.js "Preventing flash" guide)
 * it is `text/javascript` on the server and inert `text/plain` on the client;
 * next-themes already sets suppressHydrationWarning on it.
 */
const scriptProps = {
  type: typeof window === "undefined" ? "text/javascript" : "text/plain",
} as ComponentProps<typeof NextThemesProvider>["scriptProps"];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}

/**
 * Runs in <head> before next-themes' script: carries a returning visitor's old-site choice
 * over to the new key, then removes the old key.
 */
export const legacyThemeMigrationScript = `(function(){try{var o=localStorage.getItem(${JSON.stringify(
  LEGACY_THEME_STORAGE_KEY,
)});if(o!==null){if(!localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})&&(o==="light"||o==="dark"))localStorage.setItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)},o);localStorage.removeItem(${JSON.stringify(LEGACY_THEME_STORAGE_KEY)})}}catch(e){}})()`;
