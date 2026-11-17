import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { BackToTop } from "@/components/layout/back-to-top";
import { Dock } from "@/components/layout/dock";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Providers } from "@/components/providers";
import { legacyThemeMigrationScript } from "@/components/theme-provider";
import { profile, site } from "@/data/portfolio";
import { palette } from "@/lib/palette";
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
  metadataBase: new URL(site.url),
  title: { default: `${site.title} · ${profile.title}`, template: `%s | ${site.title}` },
  description: site.description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.title,
    title: `${site.title} · ${profile.title}`,
    description: site.description,
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.title} · ${profile.title}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: palette.dark.background },
    { media: "(prefers-color-scheme: light)", color: palette.light.background },
  ],
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
        <Providers>
          <a
            href="#main"
            className="fixed left-4 top-3 z-[70] -translate-y-16 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main" tabIndex={-1} className="mx-auto w-full max-w-4xl flex-1 px-6 pb-24 pt-24 outline-none sm:pt-28">
            {children}
          </main>
          <Footer />
          <Dock />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
