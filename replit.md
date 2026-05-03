# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains an API server (unused) and the main Lotus Design frontend artifact.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9

## Artifacts

### `artifacts/lotus-design` — Lotus Print & Custom Gift Website
A full-featured ultra-premium e-commerce/showcase website for a personalised gifts and printing studio in Nepalgunj, Banke, Nepal.

**Tech:** React + Vite + Tailwind CSS v4 + Framer Motion + Lenis smooth scroll + shadcn/ui + lucide-react

**Brand palette:** Hot pink `#E91E8C`, Purple `#8B2FC9`, Electric blue `#2196F3`, Gold `#C4903A`

**Key files:**
- `artifacts/lotus-design/src/App.tsx` — main app file, all sections and components
- `artifacts/lotus-design/src/index.css` — CSS variables, marquee animations, WhatsApp FAB pulse
- `artifacts/lotus-design/public/images/logo.png` — transparent logo (background removed)
- `artifacts/lotus-design/public/images/hero-bg.png` — hero background
- `artifacts/lotus-design/public/images/about-workshop.png` — about section image

**Sections (top to bottom):**
1. Loading screen — logo + gradient line animation
2. Announcement banner — dismissible promo strip (pink gradient)
3. Nav — desktop links + mobile hamburger (slide-in drawer)
4. Hero — full-screen parallax, headline, WhatsApp CTA
5. About — text + workshop image + mini stats
6. Stats bar — animated count-up (5000+ customers, 12000+ products, etc.)
7. Services — 8-card grid
8. Portfolio — filterable grid with gradient fallback cards + hover reveal
9. Work Reel — infinite dual-row marquee (16 product cards each)
10. Why Choose Us — 4-column cards
11. How to Order — sticky 4-step progress tracker (desktop), scrollable panels
12. Payment Methods — eSewa, Khalti, Bank, COD cards + payment detail modal + bank details
13. Testimonials — 6 reviews, 5-star ratings, Google badge, Verified badges
14. Special Occasions — Birthday/Wedding/Anniversary/Corporate cards (WhatsApp deep-link)
15. Pricing Guide — 12 product cards with Rs. pricing
16. FAQ — 7 animated accordion items (Framer Motion expand/collapse)
17. Contact — map + contact details + social links + WhatsApp CTA
18. Footer — logo + copyright + social icons
19. Floating WhatsApp FAB — bottom-right, green pulse animation
20. Back-to-top button — bottom-left, appears after 15% scroll
21. Scroll progress bar — fixed top, gradient fills as you scroll
22. Mouse spotlight — subtle pink glow follows cursor on desktop

**Constants:**
- WhatsApp: `https://wa.me/9779848363025`
- eSewa/Khalti: `9848363025`
- Bank: Rastriya Banijya Bank, account `4400100000060001`
- Facebook: `lotusdesign977`, Instagram: `lotusprint977`, TikTok: `lotusdesign977`

**Custom components defined in App.tsx (before App function):**
- `TikTokIcon` — custom SVG (lucide has no TikTok)
- `useCounter` hook — animated count-up
- `StatItem` — individual stat with count-up
- `OrderStepPanel` — scrollable step for How to Order section
- `HowToOrderSection` — sticky tracker + scrollable panels
- `FaqItem` — animated accordion item (Framer Motion height animation)

**CSS classes in index.css:**
- `.glass-card` — frosted glass card style
- `.text-gradient-brand` — pink→purple→blue gradient text
- `.wa-fab` — WhatsApp pulse animation
- `.animate-marquee-left`, `.animate-marquee-right` — dual-direction marquee
- `.reel-track:hover` — pauses marquee on hover
- `.mouse-spotlight` — radial gradient follows cursor

### `artifacts/api-server` — API Server (unused)
Express server, not actively used by the frontend.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/lotus-design run dev` — run frontend locally
