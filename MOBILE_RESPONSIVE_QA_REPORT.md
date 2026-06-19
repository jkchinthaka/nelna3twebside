# Mobile Responsive QA Report — Nelna Farm Website

**Date:** 10 June 2026  
**Branch:** `main`  
**Production URL:** https://nelna3twebside.pages.dev/

---

## 1. Mobile issues found

| Area | Issue |
|------|--------|
| Global | Missing `width: 100%` / `min-width: 0` on root containers; grid children could not shrink |
| Global | Images lacked consistent `max-width: 100%` (except hero fill images) |
| Hero | Achievement bar used `left`/`right` positioning that could edge-overflow on narrow screens |
| Hero | Hero home section could allow horizontal bleed from negative margin stack |
| Navbar | Nav pill could overflow between 1024–1279px desktop breakpoint |
| Footer | Long address/email text could overflow without word-wrap |
| Contact | Hero heading fixed `text-4xl` wrapped badly on 320px |
| Contact | Flex card content lacked `min-w-0` for text truncation/wrap |
| Home | Business CTA buttons not full-width on small phones |
| Home | Testimonial carousel dots below 44px tap target; quotes could overflow |
| Quality cards | CTA not full-width on mobile |
| Partner strip | Section could participate in horizontal overflow chain |

---

## 2. Files changed

| File | Changes |
|------|---------|
| `src/index.css` | Global responsive foundation, containers, achievement bar, footer wrap, nav tablet overflow, hero overflow |
| `src/components/Layout.jsx` | `w-full min-w-0 overflow-x-clip` on shell and main |
| `src/pages/Home.jsx` | Page wrapper overflow guard, process image dimensions |
| `src/pages/Contact.jsx` | Responsive hero heading, `min-w-0` on card content |
| `src/components/BusinessSupplySection.jsx` | Full-width mobile CTAs |
| `src/components/QualitySafetyCards.jsx` | Full-width mobile CTA |
| `src/components/PartnerStrip.jsx` | Section width guards |
| `src/components/TestimonialCarousel.jsx` | Break-words, 44px dots, reduced motion |

---

## 3. Responsive fixes completed

- **Root foundation:** `html`, `body`, `#root` → `width: 100%`, `min-width: 0`
- **Media:** `img`, `video`, `canvas` → `max-width: 100%`; hero images keep full-bleed cover
- **Grids:** `min-width: 0` on grid children to prevent flex/grid blowout
- **Containers:** `.page-shell`, `.site-navbar__shell`, `.site-footer__shell`, `.site-cta-band__shell` → width + min-width guards
- **Achievement bar:** Centered with `translateX(-50%)` and `width: min(68.75rem, calc(100% - padding))`
- **Hero:** `.hero-home` / `.hero-section` overflow-x clip + max-width 100%
- **Navbar:** Tablet nav horizontal scroll (1024–1279px) with hidden scrollbar; tighter link padding
- **Footer:** `overflow-wrap: anywhere` on brand/contact text
- **Forms:** `.field-base` max-width 100%, min-height 44px (existing)
- **CTAs:** Full-width buttons on mobile across business/quality sections
- **Testimonials:** Accessible 44px pagination controls

---

## 4. Pages tested

`/`, `/about`, `/quality-safety`, `/contact`, `/process`, `/sustainability`, `/certifications`, `/traceability`, `/faq`, `/news`, `/privacy`, `/terms`

---

## 5. Viewports tested

320, 360, 375, 390, 414, 430, 480, 640, 768, 1024px (CSS/layout validation + production build)

---

## 6. Remaining risks

1. **Large PNG/JPG assets** (gallery, certifications) still heavy on mobile networks — WebP conversion recommended
2. **Automated browser overflow scan** not in CI — manual DevTools check still advised after deploy
3. **About page decorative blur** elements are large but parent sections use `overflow-hidden`
4. **`nelna-logo.png`** (~621KB) — compress for faster mobile header paint

---

## 7. Performance improvements

- Image dimension attributes on home process cards (reduced CLS)
- Testimonial carousel respects `prefers-reduced-motion` (less main-thread animation)
- Hero below-fold slides remain lazy-loaded (existing)

---

## 8. Final test results

| Command | Result |
|---------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |
| `npm run audit:colors` | Pass |
| `npm test` | Not configured |

---

*Mobile responsive pass completed on `main` — fixes address root overflow causes, not only CSS clipping.*
