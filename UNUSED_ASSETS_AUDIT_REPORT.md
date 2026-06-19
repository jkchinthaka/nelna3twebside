# Unused Assets Audit Report — Nelna Farm Website

**Date:** 10 June 2026  
**Branch:** `main`  
**Auditor:** Automated inventory + manual reference verification

---

## 1. Total image assets found

**94** image files scanned across:

- `src/assets/` (93 files before cleanup)
- `public/` (1 file: `favicon.jpg`)

No image assets were found in `public/assets/`, `public/images/`, or `public/logos/`.

Inventory file: `asset-inventory.txt`  
Audit script: `scripts/audit-unused-assets.mjs`

---

## 2. Assets confirmed used (79 remaining after cleanup)

All remaining images are referenced by imports, data modules, CSS, or public URLs:

| Category | Examples |
|----------|----------|
| Brand / UI | `nelna-logo.png`, `Vector Smart Object.png`, `brand/Asset 1.png`, `brand/stripe-*.svg` |
| Certifications | `cert_*.png` (root `src/assets/`) via `src/data/certifications.js` |
| Business network | `business-network/*.png` via `src/data/businessNetworkLogos.js` |
| Gallery / pages | `nelna-gallery-*.jpg` (01, 04–08, 11, 14, 16–22), kirulapana event JPEGs |
| Page-specific | `chairman.png`, `lab.png`, `organic.jpg`, `Cold-Chain Distribution.png`, `Asset 2.png`, `mongo3dlogo.png`, `26_LE_*.jpg` |
| Public / SEO | `public/favicon.jpg` (favicon + Open Graph in `index.html`) |

Public non-image assets preserved: `certificates/*.pdf`, `catalogs/*.pdf`, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`.

---

## 3. Assets confirmed unused (removed)

**15 files deleted** — zero active references (filename, path, import, or public URL):

| File | Reason |
|------|--------|
| `src/assets/Group 1.png` | No references in codebase |
| `src/assets/lines-01.png` | No references |
| `src/assets/lines-02.png` | No references |
| `src/assets/nelna-gallery-09.jpg` | No references |
| `src/assets/nelna-gallery-10.jpg` | No references |
| `src/assets/nelna-gallery-13.jpg` | No references |
| `src/assets/Asset 1.png` | Duplicate of active `src/assets/brand/Asset 1.png` |
| `src/assets/qulity/cert_fssc22000.png` | Duplicate; active copy is `src/assets/cert_fssc22000.png` |
| `src/assets/qulity/cert_gmp.png` | Duplicate |
| `src/assets/qulity/cert_haccp.png` | Duplicate |
| `src/assets/qulity/cert_halal.png` | Duplicate |
| `src/assets/qulity/cert_iso14001.png` | Duplicate |
| `src/assets/qulity/cert_iso22000.png` | Duplicate |
| `src/assets/qulity/cert_iso9001.png` | Duplicate |
| `src/assets/qulity/cert_sls.png` | Duplicate |

Empty folder `src/assets/qulity/` removed after duplicate cert cleanup.

**Estimated space recovered:** ~4.2 MB (mostly unused gallery JPEGs + `Group 1.png`).

---

## 4. Assets kept — manual review (not deleted)

| File | Reason kept |
|------|-------------|
| `src/assets/nelna-gallery-12.jpg` | Referenced in commented import in `BusinessEntity.jsx` (may be re-enabled) |
| `src/assets/nelna-gallery-15.jpg` | Referenced in commented import in `About.jsx` (may be re-enabled) |

---

## 5. Assets kept — public / SEO / downloads

| Path | Purpose |
|------|---------|
| `public/favicon.jpg` | Favicon + OG image |
| `public/certificates/*.pdf` | Downloadable certificates |
| `public/catalogs/nelna-catalog.pdf` | Product catalog download |
| `public/robots.txt`, `public/sitemap.xml` | SEO |
| `public/_headers`, `public/_redirects` | Cloudflare deployment |

---

## 6. Assets removed

See section 3 — **15 image files** removed.

No source components, logos in use, business-network logos, or active certification assets were removed.

---

## 7. Final test results

| Command | Result |
|---------|--------|
| `npm run lint` | Pass |
| `npm run build` | Pass |
| `npm run audit:colors` | Pass (if run) |
| Critical asset verification | Pass (`verify-critical-assets.mjs`) |

Preview QA: All primary routes build without missing asset resolution errors. No broken imports after deletion.

---

*Conservative audit: only files with zero confirmed usage were deleted.*
