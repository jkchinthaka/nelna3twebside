# Quality & Safety Page — QA Report

**Date:** 2026-06-10  
**Page:** `/quality-safety`  
**Branch:** `main`

---

## 1. Human UI/UX Review Summary

The Quality & Safety page was reviewed against corporate web standards for trust, clarity, and polish. The page now presents a clear hero → standards pillars → technology → certification trust panel → CTA journey. Visual hierarchy uses consistent Nelna brand tokens, equal-height pillar cards, and a compact certification grid that reads as official rather than decorative. Hero CTAs (Contact, Traceability) and certification footer CTAs (View Certifications, Request Certificate Details) give users obvious next steps without clutter.

---

## 2. HCI Issues Fixed

| Issue | Fix |
|-------|-----|
| Weak hero headline grammar/tone | Corporate copy: “Safety is not just a protocol. It is our commitment.” |
| Low contrast text on dark hero | `!text-nelna-white` on hero heading and subtitle |
| Inconsistent card heights | `flex h-full flex-col` on standards cards with `flex-1` body text |
| Certification section felt heavy / empty green bars | Reused compact `cert-trust-panel` grid (2/3/4 columns responsive) |
| Over-claiming lab statistics | Removed unverified “500 quality checks daily”; replaced with verifiable routine-check wording |
| Motion without reduced-motion respect | `useReducedMotion()` disables entrance animations when preferred |
| Missing section landmarks | `aria-labelledby` on sections; `sr-only` h2 for standards grid |
| Decorative icons exposed to AT | `aria-hidden="true"` on Lucide icons |
| Small / unclear focus on CTAs | `focus-visible:outline` on primary hero CTA |

---

## 3. Design Changes and Reasons

- **Hero:** Brand gradient overlay on optimized hero image; gold accent on “commitment” only (premium accent rule).
- **Standards cards:** Unified `nelna-white` surface, `nelna-green-soft` icon wells, `nelna-dark` typography — removed mixed `brand-*` / slate classes from this page.
- **Technology block:** Gold-soft decorative frame; lab image with `aspect-[4/3]` to prevent layout shift.
- **Certification panel:** Dark inner panel (`cert-trust-panel`), gold borders/dividers via existing CSS, logo circles with `object-fit: contain`, 8-item grid balanced at desktop (4×2).
- **Animations:** Lightweight Framer Motion fade/slide only; disabled when `prefers-reduced-motion` is set.

---

## 4. Content / Copy Changes and Reasons

| Before (or risk) | After | Reason |
|------------------|-------|--------|
| “Safety isn't just a protocol. It's our Commitment.” | “Safety is not just a protocol. It is our commitment.” | Corporate tone, consistent capitalization |
| Strong unverified daily check count | “routine laboratory and process checks” | Avoid overclaiming without lab verification |
| Placeholder certificate numbers/dates | Removed; status “Available on request” | Legal/trust — no fake certificate metadata |
| Generic hero subcopy | Mentions certified food safety, veterinary oversight, cold chain | Trust-building, accurate scope |

---

## 5. Brand Color Cleanup

On `QualitySafety.jsx`, all non-Nelna utility classes were removed (`text-brand-green`, `bg-brand-green-50`, slate/gray/white/black, old yellow/red). Approved tokens used throughout:

- Surfaces: `nelna-green-soft`, `nelna-white`, `nelna-green-dark`
- Text: `nelna-dark`, `nelna-white`, `nelna-gold` (accent only)
- Borders/highlights: `nelna-green-soft`, `nelna-gold-soft`

`CertificationBadge.jsx` icon well updated to `nelna-green-soft` / `nelna-green`.

---

## 6. Certification Data Warnings

**⚠️ Management verification required for all 8 certifications:**

| ID | Name | certificateNo | validFrom | validTo | file |
|----|------|---------------|-----------|---------|------|
| cert-iso-22000-2018 | ISO 22000 | empty | empty | empty | empty |
| cert-haccp | HACCP | empty | empty | empty | empty |
| cert-gmp | GMP | empty | empty | empty | empty |
| cert-iso-9001-2015 | ISO 9001 | empty | empty | empty | empty |
| cert-iso-14001-2015 | ISO 14001 | empty | empty | empty | empty |
| cert-sls-1218 | SLS Mark | empty | empty | empty | empty |
| cert-fssc-22000 | FSSC 22000 | empty | empty | empty | empty |
| cert-halal | Halal | empty | empty | empty | empty |

All entries display **“Available on request”** publicly. Logo images (`cert_*.png`) are correctly sized. **Do not publish certificate numbers, validity dates, or PDF links until verified by management.**

---

## 7. Performance Optimizations

| Asset | Before (source) | After (build output) |
|-------|-----------------|----------------------|
| `nelna-gallery-17.jpg` (hero) | ~1.26 MB raw 3840×2160 | WebP ~51 KB + JPEG fallback ~125 KB @ 1920w |
| `nelna-gallery-18.jpg` (lab) | ~1.42 MB raw 3840×2160 | WebP ~57 KB + JPEG fallback ~94 KB @ 1200w |

- Added `OptimizedPicture.jsx` helper for vite-imagetools `?as=picture` imports (WebP + JPEG fallback).
- Hero: `loading="eager"`, `fetchPriority="high"`.
- Lab image: `loading="lazy"`, explicit aspect ratio.
- No Three.js or heavy 3D on this page.
- **dist/assets total:** ~84,921,120 bytes → **~78,528,804 bytes** (~6.4 MB reduction from QS hero/lab optimization).

### Remaining oversized assets (site-wide, not yet optimized)

| File | Approx. size | Notes |
|------|--------------|-------|
| recipe6.jpg – recipe7.jpg | 10–11 MB each | Recipes page only |
| recipe1–4.jpg | 5–7 MB each | Recipes page only |
| lab.png | ~2 MB | Process timeline |
| Cold-Chain Distribution.png | ~2 MB | Home / Process |
| chairman.png | ~1.9 MB | About page |
| nelna-gallery-*.jpg (others) | 1.1–2.3 MB | Carousel / galleries |

`cert_*.png` — left unchanged (already optimized).  
`Group 1.png` / `mongo3dlogo.png` — audit recommended if referenced.

---

## 8. Accessibility Fixes

- Meaningful `alt` on hero, lab, and certification logos (`{shortName} certification logo`).
- Logical heading order: `h1` hero → `h2` sections → `h3` card titles.
- `sr-only` heading for standards grid.
- Focus-visible outlines on interactive elements.
- Certification logo `width`/`height` (72×72) to reduce CLS.
- `decoding="async"` on images.
- Section `aria-labelledby` attributes.

---

## 9. SEO Fixes

- **Title:** `Quality & Safety | Nelna Farm` (via `Layout.jsx` route meta).
- **Meta description:** Mentions certified food safety, quality systems, cold-chain controls, and traceability.
- No misleading certificate numbers in public markup.
- Structured data not added (insufficient verified certificate metadata).

---

## 10. Tests Run

| Command | Result |
|---------|--------|
| `npm install` | OK (postinstall asset verify passed) |
| `npm run lint` | **Passed** |
| `npm run build` | **Passed** (8.16s) |
| `npm run audit:colors` | **Passed** — no disallowed colors |
| `npm test` | Not configured in `package.json` |
| Conflict marker grep | **Clean** — no `<<<<<<<` markers |

### Build — 10 Largest Output Files (post-change)

1. recipe6-CqAWCQ1S.jpg — 10,972,620 bytes  
2. recipe7-k7wPuyaE.jpg — 10,490,625 bytes  
3. recipe2-ReEnlOh0.jpg — 7,599,113 bytes  
4. recipe1-viYWS2Lk.jpg — 6,623,679 bytes  
5. recipe4-CXyAi03-.jpg — 6,058,010 bytes  
6. recipe3-Xs1pQ1Ez.jpg — 5,820,748 bytes  
7. nelna-gallery-11-ITS-gF6x.jpg — 2,314,561 bytes  
8. nelna-gallery-19-DnE2KiYR.jpg — 2,189,823 bytes  
9. lab-_A8HQGFN.png — 2,072,130 bytes  
10. Cold-Chain Distribution-Bk_JtzlA.png — 1,985,648 bytes  

---

## 11. Remaining Manual Approval Items

- [ ] **Management** must verify certificate numbers, validity dates, issuer details, and PDF files for all 8 certifications before publishing detailed metadata.
- [ ] **Lab / QA team** must verify “quality checks” and laboratory process claims on this page.
- [ ] **Final content approval** required before production launch.
- [ ] **Optional follow-up:** Site-wide imagetools pass for recipe/gallery/lab/chairman assets to further reduce bundle size.

---

## Files Changed

- `src/pages/QualitySafety.jsx`
- `src/components/OptimizedPicture.jsx` (new)
- `src/data/certifications.js`
- `src/components/CertificationBadge.jsx`
- `src/components/Layout.jsx`
- `src/pages/Certifications.jsx`
- `QUALITY_SAFETY_QA_REPORT.md` (this file)
