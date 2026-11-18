# Portfolio Overhaul Plan: Bootstrap → Next.js (Sanyi-style layout, PS1 theme)

> **For Claude Code:** This is the master plan for the redesign. Work through it **one phase at a time**. At the end of each phase, run the checks listed, commit, and **stop to show me what changed** before starting the next phase. If something in this plan conflicts with what you find in the repo, tell me before deviating.

---

## 0. Context

### Current site (what we're replacing)
- Static multi-page site: `index.html`, `projects.html`, `cover.css` (~21 KB), `script.js`.
- Libraries via CDN: Bootstrap 5.3, Bootstrap Icons, Devicon, Typed.js.
- Fonts: **Nunito** (body) and **Nova Klasse** (hero name, local `.otf` files in `assets/fonts/nova-klasse-font/`).
- Light/dark theme toggle stored in `localStorage` (`portfolio-bs-theme`), defaulting to `prefers-color-scheme`.

### The retro PlayStation theme we're KEEPING (from `cover.css`)
These are the identity of the site. Port them faithfully.

| Token | Value | Used for |
|---|---|---|
| `--ps-teal` | `#01aea0` | △ Triangle / Home |
| `--ps-red` | `#ff0021` | ○ Circle / About |
| `--ps-blue` | `#006eb8` (dark mode: `#2a69f0`) | ✕ Cross / Projects |
| `--ps-yellow` | `#ffc501` | □ Square / Contact |
| `--accent-pink` | `#ffa2d1` | accent |
| Light base / surface | `#dcdcdc` / `#ebebef`, text `#2b2b36`, muted `#6b6d76`, border `#b8b8c0` | PS1 grey console light mode |
| Dark base / surface | `#0a0a12` / `#16213e`, text `#f8f9fa`, muted `#a6cdef`, border `#2a3b5c` | dark mode |

PS elements currently in use:
1. **Nav active indicator:** a floating PS symbol under the active link (`△` U+25B3, `○` U+25CB, `✖` U+2716, `□` U+25A1), colored per the table, with the `ps-float` keyframe (bobs 5px up and down over 2s).
2. **`.ps-btn` badges:** pure-CSS round "controller buttons" (22px circle with a 2px border) holding an inner circle or a CSS cross, used in the hero "currently" card next to each line.
3. **Animated hero background:** 120° gradient across the base/surface/border colors, `background-size: 400%`, `gradient-shift` 8s loop.
4. **Glass navbar** that docks to full width once you scroll past the hero.
5. **Typed.js** rotating role: `student.` → `aspiring software engineer.` → `tech enthusiast.`
6. **Theme-aware project thumbnails** (`data-src-light` / `data-src-dark`).
7. **Project filters** (All / Foundational / FullStack / WordPress).

### Target look (sanyi.space): layout and styling to replicate
**Do not copy Sanyi's source code, text, images or videos.** Recreate the *layout and design language* with our own content and PS theme. **Colors come from my current site, not Sanyi's** (see §4.1).

Observed design language:
- **Stack:** Next.js App Router, Tailwind, shadcn/ui-style components (`bg-card/40`, `border-border/60`, `text-muted-foreground`), Lucide icons, Inter via `next/font`, and Framer Motion–style "blur fade" reveals.
- **Canvas:** a subtle **dot-grid pattern** over the page background, and a single centered column `max-w-4xl px-6` (≈896px).
- **Typography:** Inter throughout. Body text 14px, `text-muted-foreground`, `leading-relaxed`, `max-w-lg`. Section titles 20px, bold, `tracking-tight`. Card titles 14px, semibold.
- **Section header pattern:** a small **eyebrow label** (10px, uppercase, `tracking-[0.2em]`, muted at 60% opacity, preceded by a 16px horizontal rule), then an h2. For example, "— STACK" over "What I Work With", "— BUILDS" over "Featured Projects", and "— EXPERIENCE" over "Work".
- **Vertical rhythm:** `space-y-12 sm:space-y-14` between sections.
- **Top nav:** a home icon on the left, a **segmented pill group** of links on the right (`rounded-xl bg-muted/40 p-0.5`, links `text-[13px] px-3 py-1.5 rounded-[10px]`, active pill slides), and a theme toggle.
- **Floating bottom dock:** after scrolling, a pill-shaped icon dock appears at the bottom center, plus a **back-to-top** round button at the bottom right.
- **Scroll progress bar:** a thin gradient bar fixed at the top of the viewport.
- **Hero:** a large lowercase greeting, a one-line meta row, 3–4 short bio paragraphs, and a round avatar on the right with **status chips** under it. Below the bio is a row of **round icon-only social buttons** (`rounded-full border p-2.5`, hover `-translate-y-0.5`).
- **Stack section:** a 2-column grid of cards (`rounded-xl border-border/50 bg-card/30 p-4`). Each card has a title, a one-line description, and **tech chips with icons**.
- **Featured projects:** a 1/2/3-column grid of cards with a media area on top (`h-44 object-cover`, scales to 1.03 on hover), then the title, small tech badges and a "Website" pill button. Hovering a card lifts it 4px and brightens it. Below the grid is an outlined uppercase **"VIEW ALL PROJECTS →"** button.
- **Work/experience:** a compact list where each row has the organisation, a small badge and a role line.
- **Achievements:** a grid of award cards.
- **GitHub contributions** heatmap card.
- **Contact:** "Want to work with me?" with a single CTA button.
- **Footer:** name, tagline, nav links, socials, copyright.

---

## 1. Decisions

| Topic | Decision |
|---|---|
| Framework | **Next.js (latest stable, App Router, TypeScript)** via `npx create-next-app@latest`. Use whatever major version it installs, and don't hard-pin a version from memory. |
| Styling | **Tailwind CSS** (the version create-next-app ships with) + **shadcn/ui** for primitives (Button, Badge, Card, Tooltip, Separator). No Bootstrap. |
| Animation | **`motion`** (the current package name for Framer Motion). Build a `BlurFade` wrapper (opacity 0→1, blur 6px→0, y 6→0, staggered by index). Respect `prefers-reduced-motion`. |
| Icons | `lucide-react` for UI icons. Tech logos via **`react-icons/si`** (Simple Icons), replacing Devicon. |
| Theme | `next-themes` with `attribute="class"`, default **dark**, plus a toggle. Keep the PS1 grey light mode. |
| Colors | **Use my current site's palette exactly** (§0 table / §4.1). Don't use Sanyi's colors. |
| Fonts | `next/font/google` **Inter** for everything. `next/font/local` **Nova Klasse** (copy the `.otf` files) for the hero name and the PS symbol accents only. Drop Nunito. |
| Typing effect | A small custom `useTypewriter` hook or component, so we don't need the Typed.js dependency. |
| Content | **Single source of truth** in `src/data/portfolio.ts`. Components never hard-code content. |
| Contact | Replace the "under construction" form with a **mailto CTA** (Sanyi pattern). Email only, no phone number anywhere. |
| GitHub heatmap | `react-github-calendar` for user `AbdullahAliCodes`, themed with PS teal shades. |
| Remote images | Keep the three Zaio thumbnails remote: add `zaiocontent.s3.eu-west-2.amazonaws.com` to `images.remotePatterns`. |
| Old URLs | Permanent redirects `/index.html → /` and `/projects.html → /projects` in `next.config`, so existing links keep working. |
| Out of scope | No blog/MDX, no contact form backend, no "open to work" chip, no project dates or long descriptions. |

---

## 2. Target architecture

```
/ (repo root)
├─ legacy/                      ← old site moved here during the build, deleted once I approve the new site
├─ public/
│  ├─ images/                   ← headshot + local project thumbnails (light/dark variants)
│  └─ og.png
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx             ← fonts, ThemeProvider, Navbar, Dock, ScrollProgress, Footer
│  │  ├─ page.tsx               ← home: Hero, Stack, FeaturedProjects, Experience, Education, Achievements, Contributions, Contact
│  │  ├─ projects/page.tsx      ← all projects + PS-colored filters
│  │  ├─ globals.css            ← Tailwind + CSS variables (shadcn tokens mapped to PS palette)
│  │  ├─ opengraph-image.tsx    ← optional generated OG image
│  │  ├─ sitemap.ts / robots.ts
│  │  └─ not-found.tsx          ← "GAME OVER — press ✕ to continue" 404
│  ├─ components/
│  │  ├─ ui/                    ← shadcn primitives
│  │  ├─ ps/                    ← PS theme primitives (see §4)
│  │  │  ├─ ps-symbol.tsx       ← <PsSymbol shape="triangle|circle|cross|square" />
│  │  │  ├─ ps-button.tsx       ← port of .ps-btn (round controller button)
│  │  │  └─ ps-eyebrow.tsx      ← section eyebrow label with a PS symbol
│  │  ├─ layout/ navbar.tsx, dock.tsx, scroll-progress.tsx, back-to-top.tsx, footer.tsx, theme-toggle.tsx
│  │  ├─ sections/ hero.tsx, stack.tsx, featured-projects.tsx, experience.tsx, education.tsx, achievements.tsx, contributions.tsx, contact.tsx
│  │  ├─ project-card.tsx, project-filters.tsx, tech-chip.tsx, section.tsx, blur-fade.tsx, typewriter.tsx, themed-image.tsx
│  ├─ data/portfolio.ts         ← ALL content
│  └─ lib/utils.ts              ← cn()
└─ CLAUDE.md                    ← project conventions (see §7)
```

---

## 3. Content inventory → `src/data/portfolio.ts`

Port **exactly** this content from the current site. Shape it as typed objects (`Profile`, `Social`, `SkillGroup`, `Project`, `Experience`, `Education`, `Achievement`). Don't invent dates, descriptions or claims.

**Profile**
- Name: Abdullah Ali. The hero shows `abdullah ali` in lowercase.
- Typed roles: `student.`, `aspiring software engineer.`, `tech enthusiast.`
- Title: Full Stack Developer
- "Currently": `Computer Science [III] | Wits` (○ badge), `Mathematics Tutor` (✕ badge)
- Bio (reflow the existing text into 2–4 short Sanyi-style paragraphs, without adding new claims): aspiring software developer/engineer, third-year Computer Science at Wits; enjoys problem solving through code; tutors Mathematics part-time; into sports, video games and digital marketing.
- Email: `abdullahali.dullz@gmail.com`
- Avatar: `assets/images/abdullah-ali-headshot.jpeg` → `public/images/`
- **No phone number.** Don't carry it over anywhere.

**Socials** (round icon buttons in the hero and footer)
- GitHub: `https://github.com/AbdullahAliCodes`
- LinkedIn: `https://www.linkedin.com/in/abdullah-ali-31463783/`
- Instagram: `https://www.instagram.com/uncledullaz/`

**Skills.** The current list is HTML, CSS, JavaScript, Git, Firebase, OOP, React, Python, Node.js. Expand it using the project tech stacks into Sanyi-style groups:
- **Frontend:** React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Chakra UI
- **Backend:** Node.js, Express, Python, REST APIs, Gemini API
- **Database & data:** Supabase, PostgreSQL, Firebase
- **Tools & platforms:** Git, Vercel, Render, Azure, Auth0, Paystack, WordPress / Elementor

Each group gets a short one-line description of what the category covers. Show `OOP` as a concepts chip or drop it.

**Projects** (`category` drives the filters; thumbnails need light + dark variants where they exist; no dates or description fields)

| Title | Category | Tech | Live | Repo | Thumb |
|---|---|---|---|---|---|
| RaceIQ: F1 Stats Tracker | fullstack ⭐ | React, TypeScript, Node.js, Supabase, PostgreSQL, Gemini API, Auth0, Vercel, Render, Chakra UI | https://race-iq.vercel.app/ | https://github.com/Race1Q/RaceIQ | `raceiq-thumbnail-{light,dark}.png` |
| Hood Goods: Artisan Marketplace | fullstack ⭐ | React, JavaScript, Node.js, Supabase, Auth0, Azure | https://victorious-mud-0224f2003.6.azurestaticapps.net/ | https://github.com/AbdullahAliCodes/HoodGoods | `hoodgoods-thumbnail-{light,dark}.png` |
| StokGeld: Stokvel Management System | fullstack ⭐ | React, JavaScript, Tailwind, Node.js, Express, Supabase, PostgreSQL, Vercel, Render, Paystack | https://stokvel-sd.vercel.app/ | none | `stokvel-thumbnail-{light,dark}.png` |
| Horizon Star Academy | wordpress | WordPress, Elementor, Slider Revolution, custom CSS | https://staracademy.co.za/ | none | `hsa-thumbnail.png` |
| Google Keep Clone | foundational | React, JavaScript, CSS, Local Storage | https://goggles-keeping-cloon.netlify.app/ | https://github.com/AbdullahAliCodes/google-keep-clone-react | `google-keep-thumbnail-{light,dark}.png` |
| Twitter Clone | foundational | HTML, CSS, JavaScript | https://twooter-eloonmoosk-clone.netlify.app/ | https://github.com/AbdullahAliCodes/twitter-clone-htmlcss | `x-thumbnail-{light,dark}.png` |
| Netflix Landing Page | foundational | HTML, CSS | https://flix-of-the-net.netlify.app/ | https://github.com/AbdullahAliCodes/netflix-clone-htmlcss | remote (Zaio S3) |
| YouTube Landing Page | foundational | HTML, CSS | https://yourtubs-clone.netlify.app/ | https://github.com/AbdullahAliCodes/youtube-clone-htmlcss | remote (Zaio S3) |
| Tesla Landing Page | foundational | HTML, CSS | https://modern-car-brand-elon.netlify.app/ | https://github.com/AbdullahAliCodes/tesla-clone-htmlcss | remote (Zaio S3) |

⭐ = `featured: true` (shown on the home page). Take the exact remote image URLs from `legacy/projects.html`.

**Experience:** Mathematics Tutor. No dates.
**Education:** BSc Computer Science, University of the Witwatersrand (3rd year). No dates.
**Achievements:** an empty `achievements: Achievement[]` array for now. The section renders a "coming soon" placeholder while it's empty (see Phase 5).

---

## 4. Design system: Sanyi layout × PS1 theme

### 4.1 Color tokens (`globals.css`)
Map shadcn's semantic variables onto **my current site's palette**, so every component inherits the theme.

**Dark (default), using the current dark mode values:**
```
--background: #0a0a12          --foreground: #f8f9fa
--card: #16213e                --card-foreground: #f8f9fa
--muted: #16213e               --muted-foreground: #a6cdef
--border: #2a3b5c              --ring: #2a69f0
--primary: #2a69f0             --primary-hover: #1d4ed8      --primary-foreground: #fff
--ps-teal: #01aea0  --ps-red: #ff0021  --ps-blue: #2a69f0  --ps-yellow: #ffc501  --ps-pink: #ffa2d1
```
**Light (PS1 grey console), using the current light mode values:**
```
--background: #dcdcdc          --foreground: #2b2b36
--card: #ebebef                --muted: #ebebef              --muted-foreground: #6b6d76
--border: #b8b8c0              --ring: #006eb8
--primary: #006eb8             --primary-hover: #005086      --primary-foreground: #fff
--ps-blue: #006eb8  (other PS colors as above)
```
Use Sanyi's translucent layering on top of these, e.g. cards as `bg-card/40` and borders as `border-border/60`, so surfaces sit softly on the background.

Register the PS colors in Tailwind's theme so `text-ps-teal`, `bg-ps-red/10` and similar classes work.

### 4.2 Background
Use a Sanyi-style **dot grid** (radial-gradient dots, ~24px spacing, around 6% opacity) over `--background` across the whole page. Behind the hero only, keep the current `gradient-shift` animation using the current gradient stops (dark `#0a0a12 → #16213e → #2a3b5c → #16213e → #0a0a12`; light `#dcdcdc → #ebebef → #b8b8c0 → #ebebef → #dcdcdc`), masked to fade out at the bottom. Disable both animations under `prefers-reduced-motion`.

### 4.3 PS primitives (`components/ps/`)
- **`<PsSymbol shape size className />`**: an inline SVG for each shape (triangle, circle, cross, square), using `currentColor` and the canonical color per shape. Prefer SVG over Unicode glyphs so it renders consistently.
- **`<PsButton shape />`**: a port of `.ps-btn`, the round bordered "controller button" holding the symbol. Sizes are sm (22px) and md (32px). Light mode uses the per-shape color. Dark mode uses `--muted-foreground` by default and the shape color on hover/active, matching the current behavior.
- **`<PsEyebrow shape label />`**: Sanyi's eyebrow label, but the leading 16px rule becomes a tiny colored PS symbol.

### 4.4 Where the PS theme shows up (the "fusion" rules)
| Sanyi element | PS treatment |
|---|---|
| Top nav pill links | Home △ teal, About ○ red, Projects ✕ blue, Contact □ yellow. The active pill shows its symbol floating beneath it (port `ps-float`). On hover, the link text tints to the shape color in light mode, as it does now. The sliding active-pill background uses `motion` `layoutId`. |
| Section eyebrows | Stack △, Projects ✕, Experience ○, Education □, Achievements △, Contributions ✕, Contact □. Each eyebrow uses its shape's color. |
| Hero status chips | Use `PsButton` badges: ○ `Computer Science [III] · Wits`, ✕ `Mathematics Tutor`. Only these two. |
| Hero name | `abdullah ali` in **Nova Klasse**, large and lowercase (Sanyi's "hi, i'm …" scale). The typewriter sits beneath it as the meta line, e.g. `third-year cs @ wits · ` + typed role with a blinking caret. |
| Floating bottom dock | Styled like a PS controller face. Icons: Home, About, Projects, GitHub, Theme. On hover each icon gets a ring in its PS color and a tooltip. |
| Scroll progress bar | A 4-stop gradient of teal → red → blue → yellow (replaces Sanyi's blue→purple). |
| Project filter buttons | All = neutral. Foundational = teal △, FullStack = blue ✕, WordPress = yellow □. The active filter is filled with its color at 15% plus a colored border. |
| Project cards | Sanyi card anatomy. A small PS symbol in the card's top-right corner marks its category. On hover the border tints to the category color. |
| Achievements placeholder | A dashed-border card with a pulsing △ and "coming soon", styled like a PS "loading" screen. |
| Primary CTA ("Say hello") | Hint at the PS "✕ to confirm" idea: a `✕` PsButton inside the button before the label. |
| 404 page | "GAME OVER" in Nova Klasse plus a "press ✕ to return home" link. |
| Theme toggle | The current moon/sun icons, but a toggle press spins the icon (small easter egg). |

### 4.5 Motion
- `BlurFade` on every section block, staggered by `delay = 0.04 * index` and triggered once in view.
- Card hover: `-translate-y-1` and border/background brighten, with a 300ms ease-out.
- Navbar entrance fade/slide. The dock appears after scrolling about 200px.
- Everything is gated behind `useReducedMotion()`.

---

## 5. Phased execution

> Work on the current branch. Commit at the end of every phase with a clear message.

### Phase 1: Scaffold and preserve legacy
1. Move the current site files (`index.html`, `projects.html`, `cover.css`, `script.js`, `assets/`, any Bootstrap `dist/`) into `legacy/` with `git mv` so history is preserved.
2. Run `npx create-next-app@latest .` with TypeScript, ESLint, Tailwind, App Router, `src/` dir, import alias `@/*`. (If it refuses because the directory isn't empty, scaffold into a temp folder and move the files in.)
3. Install `motion lucide-react next-themes react-icons react-github-calendar clsx tailwind-merge`, then run `npx shadcn@latest init` and add `button badge card tooltip separator`.
4. Copy the assets: the headshot and local thumbnails → `public/images/`, and the Nova Klasse `.otf` files → `src/app/fonts/`.
5. In `next.config`, add the redirects for `/index.html` and `/projects.html`, plus the Zaio S3 host in `images.remotePatterns`.
6. Create `CLAUDE.md` (see §7).

**Check:** `npm run dev` serves the default page, and `npm run build` passes. **Stop and report.**

### Phase 2: Design tokens, fonts, theme
1. Write `globals.css` with the token sets from §4.1, the dot-grid background, and the hero gradient keyframes.
2. Set up the fonts in `layout.tsx`: Inter as `--font-sans`, Nova Klasse as `--font-display`.
3. Add `ThemeProvider` (next-themes) and `ThemeToggle`. Migrate the old `localStorage` key: on first load, if `portfolio-bs-theme` exists, seed next-themes with it, then remove the old key.
4. Build the PS primitives (`PsSymbol`, `PsButton`, `PsEyebrow`) and a temporary `/dev/ps` page that shows every shape, size and color in both themes.

**Check:** the `/dev/ps` page looks right in light and dark, and the colors match the current site. There's no theme flash on reload. **Stop and show me screenshots of both themes.**

### Phase 3: Content layer
1. Create `src/data/portfolio.ts` with types and all content from §3.
2. Write a tech → icon map in `tech-chip.tsx` (Simple Icons via `react-icons/si`, with a Lucide fallback).

**Check:** `tsc --noEmit` passes. **Stop and report.**

### Phase 4: Layout shell
1. **Navbar:** fixed at the top, `max-w-4xl` container, home icon on the left, the segmented pill group with PS active indicators on the right, and the theme toggle. Highlight the active section on scroll with IntersectionObserver. On mobile, collapse the links and rely on the bottom dock.
2. **Dock:** floating at the bottom center, showing after 200px of scroll, with tooltips.
3. **ScrollProgress:** a PS 4-color gradient bar.
4. **BackToTop** button at the bottom right.
5. **Footer:** name, tagline ("built with next.js · press ✕ to continue" or similar), nav, socials, © year.
6. **`<Section id eyebrow={{shape,label}} title>`** wrapper and **`BlurFade`**.

**Check:** the shell works at 375px, 768px and 1280px, and keyboard focus is visible everywhere. **Stop and report.**

### Phase 5: Home page sections (in order)
1. **Hero:** two columns on ≥sm (text on the left, avatar and the two PS status chips on the right; stacked on mobile). Nova Klasse name, typewriter meta line, bio paragraphs (`text-sm text-muted-foreground max-w-lg leading-relaxed`), and the round social icon buttons.
2. **Stack:** eyebrow △ "stack", title "What I Work With", a 2-column grid of 4 group cards with tech chips.
3. **Featured Projects:** eyebrow ✕ "builds", a grid of `featured` projects, and an outlined "VIEW ALL PROJECTS →" link to `/projects`.
4. **Experience:** eyebrow ○ "experience", a Sanyi-style compact list.
5. **Education:** eyebrow □ "education", the same list style.
6. **Achievements:** eyebrow △ "achievements", title "Achievements". While `achievements` is empty, render the "coming soon" placeholder card from §4.4. When entries are added later, render them as a Sanyi-style 2-column card grid (title, issuer/event, short line, optional link). Build that grid now so filling the array is all it takes.
7. **GitHub Contributions:** eyebrow ✕ "open source", a `react-github-calendar` card with the PS teal color scale. It must not break the build if the GitHub fetch fails, so wrap it in an error boundary or fallback.
8. **Contact:** eyebrow □ "contact", "Want to work with me?", one or two lines of copy, and a "✕ Say hello" mailto button.

**Check:** the full home page renders in both themes and on mobile. **Stop and show me screenshots.**

### Phase 6: Projects page
1. `/projects`: an eyebrow and title, PS-colored filter chips (All / Foundational / FullStack / WordPress), and a grid of all projects.
2. Filtering uses `motion` `AnimatePresence` plus `layout` for smooth reflow, and syncs to the URL as `?filter=fullstack` so filtered views are shareable.
3. **`ThemedImage`:** shows the light or dark thumbnail based on the theme. Avoid a hydration mismatch by rendering both with CSS `dark:hidden` / `hidden dark:block`, rather than switching `src` in JS. Projects with one thumbnail just render it.
4. Card links: "Website" (live) and "Source" (repo, if present). Both open in a new tab with `rel="noopener noreferrer"`.

**Check:** the filters work, the URL updates, and the images swap with the theme without flashing. **Stop and report.**

### Phase 7: Polish, SEO, accessibility, performance
- **Metadata:** title template `%s | Abdullah Ali`, description, `metadataBase`, OpenGraph and Twitter tags, `opengraph-image`, favicon/icons (consider a PS-symbol favicon), `theme-color` per scheme (`#0A0A12` / `#DCDCDC`).
- `sitemap.ts`, `robots.ts`, and the `not-found.tsx` "GAME OVER" page.
- All images through `next/image` with proper `sizes`. Hero avatar gets `priority`.
- **Accessibility:** a skip-to-content link, `aria-label`s on icon-only buttons, decorative PS symbols set to `aria-hidden`, color contrast ≥ 4.5:1 in both themes (check the yellow on the light grey especially, and darken it for text use if needed), and full keyboard navigation of the nav, dock and filters.
- Reduced motion respected everywhere.
- Delete the `/dev/ps` page.
- Run `npm run lint`, `npm run build`, and Lighthouse on the production build (`npm run start`). **Targets: ≥ 95 Performance / Accessibility / Best Practices / SEO.**
- Once I approve the new site, delete `legacy/` in a separate commit.

**Stop and report the scores.**

---

## 6. Acceptance criteria (definition of done)
- [ ] Visually reads as Sanyi's layout: single `max-w-4xl` column, dot grid, eyebrow+title sections, card grids, pill nav, floating dock, scroll progress.
- [ ] Colors match my current site in both themes (navy-black dark mode, PS1 grey light mode).
- [ ] PS identity is unmistakable: the four symbols and colors in the nav, eyebrows, chips, filters, dock and progress bar, plus the Nova Klasse hero name.
- [ ] All content from the old site is present except the phone number. No invented facts.
- [ ] Achievements section shows a "coming soon" placeholder and is ready to take real entries.
- [ ] Light/dark both polished, with no theme flash and no hydration warnings in the console.
- [ ] Responsive at 375 / 768 / 1280 / 1536px.
- [ ] Lighthouse ≥ 95 across the board. Zero ESLint errors. `npm run build` is clean.
- [ ] Old URLs redirect.

## 7. `CLAUDE.md` to create in Phase 1
```md
# Portfolio: conventions
- Next.js App Router + TypeScript + Tailwind + shadcn/ui + motion. No Bootstrap, no jQuery.
- ALL content lives in src/data/portfolio.ts. Never hard-code copy in components.
- Theme colors only through CSS variables / Tailwind tokens (bg-background, text-muted-foreground, text-ps-teal…). No raw hex in components. The palette comes from the original site's cover.css.
- PS shapes: triangle=teal=home, circle=red=about, cross=blue=projects, square=yellow=contact. Use <PsSymbol>/<PsButton>/<PsEyebrow>.
- Layout: single column `mx-auto max-w-4xl px-6`, sections spaced `space-y-12 sm:space-y-14`, every section uses <Section> + <BlurFade>.
- Never add a phone number. Never invent dates, descriptions or achievements.
- Respect prefers-reduced-motion. Icon-only buttons need aria-label. Decorative symbols aria-hidden.
- Before every commit: npm run lint && npm run build.
- The old site is in legacy/ for reference only. Don't import from it.
```
