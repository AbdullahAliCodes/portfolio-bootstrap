# Abdullah Ali: portfolio

Personal portfolio: a single-column, Sanyi-inspired layout with a retro PlayStation (PS1) theme.

- **Stack:** Next.js (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI) · motion · next-themes
- **Content:** everything lives in [`src/data/portfolio.ts`](src/data/portfolio.ts)
- **Theme:** PS palette tokens in [`src/app/globals.css`](src/app/globals.css); PS primitives in [`src/components/ps`](src/components/ps)

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build && npm run start
```

## Deploy

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) so metadata, `sitemap.xml` and `robots.txt` use the real domain. On Vercel the production URL is picked up automatically if it's not set.

## Structure

```
src/app/            routes: / , /projects, not-found, OG image, icons, sitemap, robots
src/components/     layout/ (navbar, dock, footer…), sections/ (home), ps/ (PS symbols), ui/ (shadcn)
src/data/           portfolio.ts: all copy and links
legacy/             the previous Bootstrap site, kept for reference until the new one is approved
```

Conventions for contributors (and AI agents) are in [CLAUDE.md](CLAUDE.md).
