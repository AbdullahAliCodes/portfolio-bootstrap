import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider, legacyThemeMigrationScript } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const novaKlasse = localFont({
  variable: "--font-nova-klasse",
  display: "swap",
  src: [
    { path: "./fonts/novaklasse-semibold-BF65f32c1d1314a.otf", weight: "600", style: "normal" },
    { path: "./fonts/novaklasse-semibdoblique-BF65f32c1d466fc.otf", weight: "600", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Abdullah Ali",
  description: "Portfolio of Abdullah Ali.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // next-themes sets the theme class on <html> before hydration.
      suppressHydrationWarning
      className={`${inter.variable} ${novaKlasse.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: legacyThemeMigrationScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
