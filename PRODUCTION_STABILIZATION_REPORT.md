# Production Stabilization Report — Nelna Farm Website

**Date:** 10 June 2026  
**Branch:** `main`  
**Backup tag:** `backup-main-before-production-stabilization`

---

## 1. Errors found

| Category | Issue |
|----------|--------|
| **Security (critical)** | `backend/.env` and `src/assets/search/backend/.env` were committed to Git |
| **Build hygiene** | Missing `yarn-debug.log*` / `yarn-error.log*` in `.gitignore` |
| **Deployment** | No Cloudflare `_headers` for long-lived static asset caching |
| **QA tooling** | No unified `check:all` or automated route import audit |
| **Dependencies** | `react-router-dom` at 7.12.0 with known security advisories |
| **SEO** | Sitemap missing `/products`; robots.txt had stale TODO comment |
| **Mobile UX** | Quality & Safety hero used fixed `min-h-[500px]` causing cramped mobile layout |
| **Performance / CLS** | Certification logos missing explicit width/height |
| **Documentation** | Route smoke checklist incomplete for production routes |
| **npm audit** | 15 transitive dependency vulnerabilities remain (Firebase/grpc/protobuf chain) |

---

## 2. Errors fixed

- Removed tracked `.env` files from Git index (local files preserved, now ignored)
- Expanded `.gitignore` for `**/backend/.env` and yarn log patterns
- Added `public/_headers` for Cloudflare Pages immutable asset caching
- Verified `public/_redirects` SPA fallback (`/* /index.html 200`)
- Added `scripts/audit-routes.mjs` and `npm run audit:routes`
- Added `npm run check:all` (lint + routes + colors + build)
- Upgraded `react-router-dom` to `^7.18.0`
- Fixed Quality & Safety hero responsive height and heading `clamp()`
- Added certification logo dimensions to reduce layout shift
- Updated sitemap and robots.txt
- Expanded `routeSmokeChecklist.js` for all production routes

---

## 3. Build issues fixed

| Check | Result |
|-------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass (36 critical assets verified) |
| `npm run audit:colors` | Pass |
| `npm run audit:routes` | Pass (29 lazy imports) |
| `npm run check:all` | Pass |
| `node scripts/find-missing-assets.mjs` | 0 missing assets |

---

## 4. Runtime issues fixed

- Prior `OptimizedPicture` object/array `sources` crash already fixed on main
- Defensive rendering in `CertificationTrustPanel` and `QualitySafety` (icon/data guards) verified
- All listed routes return HTTP 200 from production preview (`vite preview` on port 4176)
- SPA shell loads for `/`, `/quality-safety`, `/about`, `/contact`, and all other listed routes

**Note:** SPA fetch tests confirm routing shell delivery; full client-side render QA still requires browser DevTools (no console errors / no ErrorBoundary screen).

---

## 5. Mobile issues fixed

Prior mobile pass on main (commit `de8f524b`) already addressed hero overlap, tap targets, footer stacking, and overflow. This pass additionally:

- Quality & Safety hero: `50svh` / `min-h-[18rem]` on mobile vs `60vh` / `500px` on desktop
- Responsive heading via `clamp()` on Quality & Safety H1

---

## 6. Performance optimizations

- Cloudflare `_headers` — 1-year immutable cache for `/assets/*`, images (webp/avif/png/jpg/jpeg/svg)
- Certification logos: explicit `width`/`height` to reduce CLS
- Hero carousel (existing): first slide eager, others lazy
- Partner strip (existing): static 2-col grid on mobile, marquee only on desktop
- Farm3D / Three.js (existing): lazy-loaded and gated to desktop + hover + no reduced motion
- Vite manual chunking preserved for react, router, motion, swiper, firebase, i18n

**Remaining:** Large gallery JPGs and certification PNGs (600KB–2MB+) should be converted to WebP/AVIF via vite-imagetools in a follow-up pass.

---

## 7. Accessibility fixes

- Certification logos: descriptive `alt` text preserved
- Quality & Safety hero heading uses readable `clamp()` sizing
- ErrorBoundary buttons maintain 44px min-height and visible focus outlines (existing)
- Mobile nav / footer tap targets from prior mobile pass retained
- `prefers-reduced-motion` respected in animated sections (existing)

---

## 8. SEO fixes

- Added `https://nelna.lk/products` to `public/sitemap.xml`
- Cleaned `public/robots.txt` (removed TODO, kept nelna.lk sitemap URL)
- `index.html` meta/OG tags use Nelna branding (existing)
- Certificate data uses “Available on request” — no invented certificate numbers/dates

---

## 9. Security / Git hygiene fixes

| Action | Detail |
|--------|--------|
| Untrack secrets | `git rm --cached backend/.env src/assets/search/backend/.env` |
| `.gitignore` | Added `**/backend/.env`, yarn log patterns |
| Verified not tracked | `node_modules/`, `dist/`, `.vite/`, root `.env` |
| `.env.example` | Kept as template only (no real secrets) |
| Backup tag | `backup-main-before-production-stabilization` pushed to origin |

**Action required:** If the removed `.env` files contained real production keys, rotate those credentials in Firebase/backend services.

---

## 10. Files changed

| File | Change |
|------|--------|
| `.gitignore` | Yarn logs, nested backend `.env` patterns |
| `public/_headers` | **New** — Cloudflare cache headers |
| `public/robots.txt` | Removed TODO |
| `public/sitemap.xml` | Added `/products` |
| `package.json` | `check:all`, `audit:routes`, router upgrade |
| `package-lock.json` | Lockfile update |
| `scripts/audit-routes.mjs` | **New** — lazy route import audit |
| `src/pages/QualitySafety.jsx` | Mobile hero + heading clamp |
| `src/components/CertificationTrustPanel.jsx` | Logo dimensions |
| `src/data/routeSmokeChecklist.js` | Full route list |
| Git index | Removed `backend/.env`, `src/assets/search/backend/.env` |

---

## 11. Tests run

```bash
git checkout main && git pull origin main
git tag backup-main-before-production-stabilization
git push origin backup-main-before-production-stabilization
npm install
npm run lint
npm run build
npm run audit:colors
npm run audit:routes
npm run check:all
node scripts/find-missing-assets.mjs
npm audit --omit=dev
npm run preview
# HTTP smoke: all 15 routes → 200
```

| Script | Result |
|--------|--------|
| `npm test` | Not configured |
| `npm run typecheck` | Not configured |
| Lighthouse | Not run |

---

## 12. Remaining manual checks

1. Browser QA at 320–768px — confirm no horizontal overflow
2. Open `/quality-safety` and `/` — confirm no “Something went wrong” ErrorBoundary
3. Test mobile hamburger, Contact form submit, WhatsApp FAB, footer links
4. Verify Cloudflare Pages deploy picks up `_headers` and `_redirects`
5. Set production `VITE_SITE_URL=https://nelna.lk` in Cloudflare environment (not committed)
6. Rotate credentials if previously committed `.env` values were real

---

## 13. Remaining business approval items

- Confirm official certificate numbers/dates before publishing (currently “Available on request”)
- Approve compressed WebP/AVIF conversion for hero gallery and large PNG certifications
- Confirm production domain `nelna.lk` in Cloudflare + `VITE_SITE_URL`
- Review npm audit transitive vulnerabilities — major Firebase/grpc upgrades need staged testing
- Consider removing unused duplicate `Navbar_enhanced.jsx` after team confirmation

---

*Generated during production stabilization pass on `main`.*
