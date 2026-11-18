import Link from "next/link";
import { PsSymbol } from "@/components/ps";
import { SocialLinks } from "@/components/social-links";
import { nav, profile, site } from "@/data/portfolio";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50">
      <div className="page-container flex flex-col gap-8 pb-28 pt-12 sm:pb-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <p className="font-display text-xl lowercase">{profile.displayName}</p>
            <p className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              {site.tagline.before}
              <PsSymbol shape="cross" size={11} strokeWidth={3.5} label="cross" />
              {site.tagline.after}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col-reverse gap-4 border-t border-border/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © <CurrentYear /> {profile.name}. All rights reserved.
          </p>
          <SocialLinks size="sm" />
        </div>
      </div>
    </footer>
  );
}
