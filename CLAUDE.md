# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Next.js dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run studio       # Sanity Studio dev server (separate port)
npm run studio:build # Build Sanity Studio for deployment
```

No test suite exists. Type-check manually: `npx tsc --noEmit`.

## Architecture

**Stack:** Next.js 16 App Router · Sanity v5 CMS · Tailwind CSS v4 · GSAP + Lenis scroll

### Pages

All routes live under `src/app/`. The active home is the root `page.tsx` (Design 2 — the v2 layout). Inner pages: about, careers, contact, news, projects, upcoming-projects, directors-desk. `/studio/[[...tool]]` mounts the embedded Sanity Studio.

### Components

`src/components/sections/` — full-page sections shared across routes.  
`src/components/sections/v2/` — home page (Design 2) specific sections.

### Sanity content layer

**Schemas** live in `sanity/schemaTypes/` organized as:
- `objects/` — reusable embedded types (`seo`, `pageHero`)
- `pages/` — one singleton per inner page (about, careers, contact, news, projects, upcoming-projects, directors-desk)
- Root-level: `homePage.ts`, `siteSettings.ts`, `projectType.ts`, `postType.ts`, `newsArticleType.ts`, `authorType.ts`

**Queries** are all in `src/sanity/lib/queries.ts`. Every page fetches via `sanityFetch` (from `src/sanity/lib/live.ts`) which wraps next-sanity's live API — returns `{ data }`.

**Static fallback:** `src/lib/projects.ts` holds hardcoded project data. The Sanity `project` collection is the authoritative source; the static file is a fallback for fields not yet filled in Sanity. The project detail page at `src/app/projects/[slug]/page.tsx` merges both.

### GSAP / scroll animations

Always call `ensureGsap()` (from `src/lib/gsap.ts`) before using GSAP or ScrollTrigger — it handles plugin registration and font/load refresh. Call `scheduleScrollRefresh()` after creating triggers to handle React Strict Mode double-mount. Wrap all GSAP setup in `gsap.context()` and revert in the effect cleanup.

### Sanity env vars

`SANITY_API_READ_TOKEN` (or legacy `SANITY_API_TOKEN`) — required for live/preview fetching.

### Video assets

Hero scrub video: `public/videos/home2-scrub.mp4`. See `public/videos/README.md` for the ffmpeg re-encode command (all-keyframe, CRF 18, faststart). Poster: `public/videos/home2-poster.webp`.
