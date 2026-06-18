# Nelna Brand Colors & HCI QA Report

**Branch:** `fix/strict-nelna-brand-colors-hci`  
**Date:** 2026-06-10

## Summary

Enforced the official Nelna six-color palette across the public site, admin UI, Tailwind theme, CSS variables, SVG brand assets, and Three.js scenes—without changing layout, section order, or visual direction. Added an automated color audit script and removed tracked `node_modules` from Git.

## What Changed

### Color system centralization
- **`src/data/brandColors.js`** — Single source of truth for all six hex tokens and three soft rgba variants; legacy aliases map only to approved values.
- **`tailwind.config.js`** — Removed old `brand-red`, slate-like ink values, and non-approved scales; semantic tokens (`primary`, `brand`, `brand-yellow`, `cloud`, etc.) resolve to Nelna colors only.
- **`src/index.css`** — `:root` CSS variables aligned to official tokens; shadows, gradients, and overlays use rgba derived from brand RGB tuples only.

### Color fixes (examples)
- Replaced slate/gray/black/white Tailwind classes site-wide with `nelna-*` and semantic brand tokens.
- Updated brand stripe SVGs (`stripe-yellow-green.svg`, `stripe-yellow-red.svg`) from legacy black/gold/red to `#251B25`, `#D8C76B`, `#0D3013`, `#27743A`.
- Migrated old gold rgba `(248,188,36)` → official gold `(216,199,107)`; WhatsApp FAB shadows from WhatsApp green → `nelna-green`; black shadows → `nelna-dark` rgba.
- Removed unused `src/App.css` (Vite boilerplate with non-brand colors).

### HCI / accessibility polish (minimal, layout preserved)
- **Primary buttons** — `.btn-primary` uses `--nelna-green` with hover `--nelna-green-dark` for clearer CTA hierarchy and contrast.
- **Hero overlays** — About and Quality & Safety hero gradients use `nelna-dark-bg` instead of `black`/`slate-900` for brand-consistent readability on images.
- **Toast info state** — Replaced `sky-*` classes with `nelna-green-soft` / `nelna-green-dark` for palette consistency.
- **Focus / readability** — Public content readability rules keep dark text on light cards when global `.dark` is active.
- **CSS build fix** — Escaped Tailwind opacity selectors (`dark\:text-nelna-white\/90`) so PostCSS parses correctly.

### Tooling
- **`scripts/audit-colors.mjs`** — Scans `src/`, `public/`, `index.html`, `tailwind.config.js`, `vite.config.js`; ignores `src/assets/search/` reference archive and `.txt` files; exits `1` on violations.
- **`package.json`** — Added `"audit:colors": "node scripts/audit-colors.mjs"`.

### Repo hygiene
- **`.gitignore`** — Already covered `node_modules/`, `dist/`, `.vite/`, `.env*`.
- **Git tracking** — Removed ~27k tracked `node_modules` files from the index (`git rm -r --cached node_modules`). `dist/`, `.env`, and `.vite/` were not tracked.

### SEO
- **`public/sitemap.xml`** — Already uses production domain `https://nelna.lk/` (no placeholder URLs).
- **`public/robots.txt`** — Valid; points to `https://nelna.lk/sitemap.xml`.

## Color Audit Result

```
npm run audit:colors
Color audit passed — no disallowed colors found.
```

## Commands Run

```bash
npm install
npm run lint          # pass
npm run build         # pass
npm run audit:colors  # pass (exit 0)
npm run preview       # local visual sanity check
```

## Test Results

| Check            | Result |
|------------------|--------|
| `npm run lint`   | Pass   |
| `npm run build`  | Pass   |
| `npm run audit:colors` | Pass |
| Additional test scripts | None in `package.json` |

## Remaining Manual Tasks

1. **Cloudflare Pages** — Set dashboard **Build command** to `npm run build` (output dir `dist` is configured in `wrangler.toml`).
2. **Sitemap `lastmod`** — Update dates when pages change.
3. **Visual QA in staging** — Confirm hero, navbar mobile, forms, and dark footer on real devices after deploy.
4. **Rotate secrets** — If `.env` was ever committed historically on another branch, rotate Firebase/API keys manually (not tracked on this branch).

## `.env` Warning

`.env` was **not** found in Git tracking on this branch. If it exists in remote history elsewhere, rotate credentials before production deploy.
