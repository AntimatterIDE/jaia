# JAIA Health — Website

Marketing site for JAIA Health: a trusted partner for the modern private
practice. Built with Next.js (App Router), TypeScript (strict), Tailwind CSS
v4, shadcn/ui (Radix), React Bits (adapted), GSAP, Motion, and Lucide icons.

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npx tsc --noEmit   # typecheck
npx prettier --write .   # format
npm run qa         # axe + responsive + keyboard + motion + contrast smoke suite
                   # (expects the app on http://localhost:3123 — set QA_BASE_URL to override)
```

## Environment

Copy `.env.example` to `.env.local`.

- `REACTBITS_LICENSE_KEY` is needed **only** to pull new components from the
  React Bits Pro registries with `npx shadcn@latest add`. It is not read at
  build or runtime — components already installed are plain source files in this
  repo, so the site builds and runs without it.
- `OPENROUTER_API_KEY` powers the bottom-right sales chat. Without it the
  widget still renders and points visitors to `/contact`. Optional
  `OPENROUTER_MODEL` defaults to `openai/gpt-5.6-luna-pro`.

## Structure

- `content/services.ts` — authoritative service records plus the full page
  content for each service (all surfaces read from here)
- `content/site.ts` — site-wide copy (hero, outcomes, approach, FAQ, CTAs)
- `content/testimonials.ts` — client-supplied testimonials for the social
  proof section (initials avatars)
- `components/marketing/` — header, footer, and all page sections
- `components/AnimatedContent.tsx`, `components/SpotlightCard.tsx` — React Bits
  components adapted for SSR visibility and reduced motion
- `app/services/[slug]/` — SSG service pages (six routes), mirroring the
  homepage section rhythm
- `docs/` — project reference (master spec, image credits, content status); not
  publicly routed

## Notes

- The contact form validates fully but its backend is intentionally not
  connected; see `app/contact/actions.ts` for the typed handoff point (Resend +
  persistence). The in-chat inquiry form uses the same action and reports
  `not_configured` honestly instead of faking a send.
- The homepage hero renders over an animated backdrop that uses the JAIA mark
  as a clip path (`components/marketing/hero-backdrop.tsx`). It is loaded with
  `next/dynamic` to keep motion code out of the initial bundle, is `aria-hidden`,
  and collapses to a static composition under `prefers-reduced-motion`.
- Because hero copy sits over that artwork, `npm run qa` measures the rendered
  contrast of every hero text element at four widths and two animation phases.
  Treat those as regression guards before changing backdrop colours or opacity.
- Testimonials are published verbatim with initials avatars — see
  `docs/content-status.md`.
- The homepage capability stack and one include card per service page use
  client-supplied stock; the other service-page stills are AI-generated
  placeholders — see `docs/image-credits.md`.
