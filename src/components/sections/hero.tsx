import Image from "next/image";
import { BlurFade } from "@/components/blur-fade";
import { PsButton, PsSymbol } from "@/components/ps";
import { SocialLinks } from "@/components/social-links";
import { Typewriter } from "@/components/typewriter";
import { profile } from "@/data/portfolio";

/** Hero: Nova Klasse name, typed meta line, bio, socials; avatar + PS status chips on the right. */
export function Hero() {
  return (
    <section id="home" data-nav="home" aria-labelledby="home-title" className="relative scroll-mt-24">
      {/* Animated PS gradient behind the hero only, full-bleed, fading out at the bottom. */}
      <div
        aria-hidden
        className="hero-gradient pointer-events-none absolute -top-28 left-1/2 -z-10 h-[calc(100%+11rem)] w-screen -translate-x-1/2 sm:-top-32"
      />

      <div className="grid items-start gap-8 sm:grid-cols-[1fr_auto] sm:gap-10">
        <div className="order-2 space-y-5 sm:order-1">
          <BlurFade immediate index={0} className="space-y-3">
            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <PsSymbol shape="triangle" size={10} strokeWidth={3.5} />
              {profile.title}
            </p>
            <h1 id="home-title" className="font-display text-5xl leading-[0.95] lowercase sm:text-6xl">
              {profile.displayName}
            </h1>
            {/* min-height: the longest typed role wraps on phones; reserve the line to avoid layout shift */}
            <p className="min-h-10 text-sm text-muted-foreground sm:min-h-5">
              {profile.metaPrefix}
              <Typewriter words={profile.roles} className="text-foreground" />
            </p>
          </BlurFade>

          <BlurFade immediate index={2} className="max-w-lg space-y-3 text-sm leading-relaxed text-muted-foreground">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </BlurFade>

          <BlurFade immediate index={3}>
            <SocialLinks />
          </BlurFade>
        </div>

        <BlurFade immediate index={1} className="order-1 flex flex-row items-center gap-4 sm:order-2 sm:flex-col sm:items-end">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-full border border-border/60 bg-muted shadow-lg shadow-black/10 sm:size-36">
            <Image
              src={profile.avatar.src}
              alt={profile.avatar.alt}
              fill
              priority
              sizes="(min-width: 640px) 144px, 96px"
              className="object-cover"
            />
          </div>
          <ul className="flex flex-col gap-2 sm:items-end" aria-label="Currently">
            {profile.status.map((s) => (
              <li
                key={s.label}
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-card/40 py-1 pl-1 pr-3 text-xs text-foreground backdrop-blur-sm"
              >
                <PsButton shape={s.shape} />
                {s.label}
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  );
}
