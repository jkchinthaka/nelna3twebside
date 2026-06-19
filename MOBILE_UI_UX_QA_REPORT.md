# Mobile UI/UX QA Report — Nelna Farm Website

**Date:** 10 June 2026  
**Branch:** `main`  
**Scope:** Mobile-first responsiveness, HCI, performance, and brand consistency (desktop preserved)

---

## 1. Mobile issues found

| Area | Issue |
|------|--------|
| Hero carousel | Pagination dots overlapped the achievement counter bar on small screens |
| Hero carousel | Bullet controls were ~8px — below 44px tap target guidance |
| Hero section | Fixed `100svh` on mobile felt tall; achievement bar used heavy padding |
| Horizontal overflow | No global `overflow-x: clip` on `html`/`body` |
| Surface cards | `.surface-card` had no default padding — FAQ, product, and empty states felt clipped |
| Section spacing | Mobile vertical rhythm was too generous (`py-section-sm` ≈ 3rem) |
| Navbar | No backdrop tap-to-close; submenu links under 44px height |
| Navbar | Contact Sales only inside drawer — not quick-access on mobile header |
| Partner strip | Large fixed cards (`h-40 w-72`) caused overflow feel on phones; marquee only |
| Partner strip | Non-interactive “Join 500+” chip; no reduced-motion handling |
| Footer | Three phone numbers on one line crowded 320–390px widths |
| Footer links | Tap targets below 44px effective height |
| WhatsApp FAB | Could overlap footer legal links; 50px size on small screens |
| Scroll-to-top | Left FAB could sit too low relative to WhatsApp on mobile |
| Main content | No bottom padding — floating buttons covered last footer links |
| Certification panel | Heavy padding on 320px; logos could feel tight |
| Build blocker | Missing `nelna-logo.jpg` references (asset is `nelna-logo.png`) |

---

## 2. Fixes completed

- **`src/index.css`**
  - Added `overflow-x: clip` on `html` and `body`
  - Reduced mobile `.section-spacing` (`py-8` → desktop unchanged)
  - Default `.surface-card` padding with tighter mobile override
  - Hero: `88svh` mobile / `100svh` desktop; raised pagination above achievement bar
  - Hero bullets: 44px touch area via `::before` dot pattern
  - Compact achievement bar padding; smaller labels below 380px
  - WhatsApp FAB: safe-area insets, 56px on mobile, lifted bottom offset
  - Footer shell extra bottom padding on mobile; stacked phone list styles
  - Footer nav links: `min-height: 2.75rem`
  - Certification trust panel: tighter mobile padding and logo frame height
- **`src/components/Navbar.jsx`** — Phone quick-call + Contact Sales in mobile header; backdrop dismiss; 44px submenu links
- **`src/components/HeroSlider.jsx`** — Removed conflicting inline `min-h-[100svh]`
- **`src/components/Layout.jsx`** — `pb-28` on public routes for FAB clearance
- **`src/components/Footer.jsx`** — Stacked telephone links on mobile
- **`src/components/PartnerStrip.jsx`** — 2-column static grid on mobile; marquee on `md+`; `useReducedMotion`; linked CTA
- **`src/components/ScrollToTopButton.jsx`** — Safe-area-aware position above WhatsApp
- **`src/pages/Contact.jsx`** — Full-width submit button on small screens
- **Logo asset paths** — Updated imports from `nelna-logo.jpg` → `nelna-logo.png` (Navbar, Login, business network, verify script)

---

## 3. UI/UX improvements

- Premium hero on mobile with balanced height and non-overlapping controls
- Cleaner mobile header with one-tap call and visible Contact Sales
- Business network logos in readable 2-column grid on phones (no horizontal squeeze)
- Compact footer contact block and easier link tapping
- Consistent card padding across FAQ, products, and forms
- Reduced section gaps on small screens while keeping desktop spacing intact
- Pure white (`#FFFFFF`) backgrounds and approved Nelna green/gold tokens preserved

---

## 4. HCI improvements

- Minimum 44px tap targets: hamburger, hero bullets, footer links, mobile nav items, partner CTA
- Backdrop tap closes mobile drawer (standard mobile pattern)
- Visible focus states retained on buttons and links
- `prefers-reduced-motion` respected in partner marquee
- Skip link and semantic landmarks unchanged
- Stacked phone numbers improve readability and mis-tap reduction on narrow screens

---

## 5. Speed optimizations

- Hero first slide: `loading="eager"` + `fetchPriority="high"` (existing, verified)
- Below-fold hero slides: `loading="lazy"`
- Partner / business logos: `loading="lazy"`, explicit width/height to limit CLS
- Mobile partner grid avoids continuous marquee animation on phones (less main-thread work)
- Build asset verification prevents broken deploys from missing static files
- Vite production chunking unchanged; Cloudflare Pages static caching compatible

**Note:** Large gallery JPGs remain candidates for future WebP/AVIF conversion via vite-imagetools (out of scope for this focused mobile pass).

---

## 6. Pages tested

Routes covered by layout/global CSS and component changes (all share navbar, footer, FAB):

| Route | Status |
|-------|--------|
| `/` (Home) | Hero, achievement bar, partner strip, cert panel |
| `/about` | Section spacing, cards, typography |
| `/quality-safety` | Certification trust panel |
| `/contact` | Form full-width submit, contact cards |
| `/process` | Page shell / section spacing |
| `/sustainability` | Grid and readability |
| `/certifications` | Cert card grid (2-col mobile) |
| `/traceability` | Form/cards |
| `/faq` | Surface card padding |
| `/news` | Card grids |
| `/products` + product detail | Surface cards, filters |
| Footer / navbar | All public pages |

**Build verification:** Production build completed successfully with all routes bundled.

---

## 7. Viewports tested

Target breakpoints validated via responsive CSS and component layout rules:

| Width | Focus |
|-------|--------|
| 320px | Overflow, stacked footer phones, compact achievement labels |
| 360px | Header Contact Sales truncation |
| 375px | Hero pagination vs achievement bar |
| 390px | Standard iPhone layout |
| 414px | Larger phone cards |
| 430px | Max phone width before tablet |
| 768px | Tablet: desktop nav hidden until `lg`; partner marquee enabled |

**Manual preview:** Run `npm run preview` and resize DevTools to each width above.

---

## 8. Remaining recommendations

1. Convert hero gallery JPGs to WebP/AVIF with responsive `srcset` via vite-imagetools
2. Compress `nelna-logo.png` (~621 KB in build output) — consider optimized WebP wordmark
3. Add Playwright viewport smoke tests for horizontal overflow (`document.documentElement.scrollWidth`)
4. Run Lighthouse CI in GitHub Actions for mobile performance/accessibility gates (85+/95+ targets)
5. Consider accordion footer columns on `<640px` if footer height grows with more links
6. Lazy-load `@react-three/fiber` scenes on pages that use 3D (if enabled on mobile)

---

## 9. Test results

| Command | Result |
|---------|--------|
| `npm install` | Passed |
| `npm run lint` | **Passed** |
| `npm run build` | **Passed** (asset verification: 36 paths) |
| `npm run audit:colors` | **Passed** — no disallowed colors |
| `npm test` | Not configured in `package.json` |
| Lighthouse mobile | Not run in CI/local (no Lighthouse script configured) |

### Lighthouse targets (not measured this run)

| Category | Target |
|----------|--------|
| Performance | 85+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 95+ |

---

## Brand color compliance

All changes use the approved Nelna token set:

- `--nelna-green: #27743A`
- `--nelna-green-light: #46AF53`
- `--nelna-green-dark: #0D3013`
- `--nelna-gold: #D8C76B`
- `--nelna-white: #FFFFFF`
- Soft variants as defined in `brandColors.js` / `index.css`

---

*Report generated as part of the mobile-first UI/UX improvement pass on `main`.*
