# Ironforge — 3D Gym Website

A production-ready, 3D-animated marketing site for a gym, built to turn visitors into **free-trial bookings** and **WhatsApp inquiries**.

**Stack:** Next.js 14 (App Router, TypeScript) · Tailwind CSS · React Three Fiber + drei · GSAP ScrollTrigger · Lenis · Framer Motion · React Hook Form + Zod

All content shown is **placeholder** ("Ironforge", Koramangala, Bengaluru). Swap it in one file — see below.

---

## 1. Run it locally

Requires Node.js 18.17+ (20+ recommended).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Other scripts:

```bash
npm run build   # production build (type-checks + lints)
npm run start   # serve the production build
npm run lint
```

> `next/font` downloads Google Fonts (Bebas Neue, Inter) at build time, so the first build needs internet access.

---

## 2. Edit the content — `data/site.ts`

**Everything** the visitor reads lives in [`data/site.ts`](data/site.ts). No component changes needed.

| What | Where in `data/site.ts` |
| --- | --- |
| Gym name, address, phone, email, social links, Google rating | `siteConfig` |
| WhatsApp number (digits only, with country code, e.g. `919876543210`) | `siteConfig.whatsappNumber` |
| **Brand accent colour** (CSS + 3D scene follow it) | `siteConfig.brand.accent` |
| Hero headline / subheadline | `siteConfig.headline`, `siteConfig.subheadline` |
| Opening hours (also feeds SEO schema) | `siteConfig.hours` |
| Map location | `siteConfig.address` |
| SEO title, description, keywords | `siteConfig.seo` |
| Counters | `stats` |
| Programs (title, icon, timings, details) | `programs` |
| Membership prices & features | `plans` — `price` is the total for `months` |
| Trainers | `trainers` |
| Before/after members | `transformations` |
| Class timetable | `timetable` |
| Google reviews | `testimonials` |
| Free-trial form dropdowns | `trialSlots`, `trialGoals` |

**Images:** drop files into `public/images/` and point the paths in `data/site.ts` at them (e.g. `/images/trainer-arjun.jpg`). Placeholders are SVGs. Suggested sizes: trainers 800×1000, transformations 800×1000 (same crop for before/after).

**Public URL:** copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your real domain (used for canonical URLs, sitemap, Open Graph).

---

## 3. How leads work

1. Visitor submits the **free trial form** (name, Indian 10-digit mobile, preferred slot, goal) — validated with Zod on the client **and** the server.
2. WhatsApp opens with a pre-filled message to your number.
3. The form also `POST`s to **`/api/book`**, which validates again and calls `recordLead()` in [`lib/leads.ts`](lib/leads.ts).

Right now `recordLead()` logs to the server console (Vercel → project → **Logs**). To connect real delivery, add your provider call inside that one function — e.g. email via Resend, or append a row to Google Sheets (Sheets API or an Apps Script web-app URL). Store secrets as Vercel environment variables.

A hidden honeypot field silently drops basic spam bots.

---

## 4. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project →** import the repo. Framework is auto-detected (Next.js) — no settings to change.
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` (your domain).
4. Deploy. Attach your custom domain under **Settings → Domains**.

After deploying, check `/sitemap.xml`, `/robots.txt`, and share the URL in WhatsApp to verify the Open Graph preview (the image is generated at `/opengraph-image`).

---

## 5. Performance, accessibility & fallbacks

- The 3D canvas (`components/three/*`) is **lazy-loaded** after first paint via `next/dynamic` and `requestIdleCallback`; a branded loader shows progress.
- **Low-power / mobile** devices (small screen, touch-first, ≤4 cores or ≤4 GB RAM) get fewer particles, no shadows, and DPR 1; everyone is capped at DPR 1.5.
- **`prefers-reduced-motion`:** smooth scrolling and scroll animations are disabled and the hero renders as a single static frame.
- **No WebGL:** a static hero image (`public/images/hero-fallback.svg`) is shown instead.
- The warehouse HDRI is **self-hosted** (`public/hdri/warehouse.hdr`), so the 3D scene has no third-party runtime dependency.
- Semantic landmarks, skip link, visible focus states, labelled form fields with `role="alert"` errors, keyboard-operable slider/cards.

Run Lighthouse against the **deployed** production URL (not `npm run dev`) in an incognito window — dev mode is not representative.

---

## 6. Project structure

```
app/            layout, page, /api/book, sitemap, robots, OG image
components/
  sections/     Navbar, Hero, Stats, Programs, Plans, BmiCalculator, Trainers,
                Transformations, Timetable, Testimonials, BookingForm, Contact, Footer
  three/        Dumbbell (procedural), HeroScene, ParticleField, SceneCanvas, SceneShell
  ui/           Button, Reveal, AnimatedNumber, BeforeAfterSlider, SmoothScroll, ...
data/site.ts    ALL content
lib/            validation (Zod), whatsapp, leads, device detection, scroll state
public/         images, HDRI
```

---

## 7. What the gym owner needs to provide

See [`OWNER_CHECKLIST.md`](OWNER_CHECKLIST.md).
