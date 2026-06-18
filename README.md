# Nelna Farm Website

Production-ready poultry farm website built with React, Tailwind CSS, and Firebase. Includes multi-language support (Sinhala, Tamil, English), SEO-friendly routing and metadata, public marketing pages, and an admin/distributor portal with role-based access.

## Features

- Responsive public website (Home, Products, About, Quality & Safety, Sustainability & CSR, News, Contact)
- Product catalog with PDF downloads
- Bulk inquiry/order forms stored in Firestore
- Admin portal for products, orders, inquiries, users, and news
- Distributor portal for order visibility
- Firebase Authentication, Firestore, Storage, Hosting
- SEO: meta tags, sitemap, robots.txt

## Tech Stack

- React (Vite)
- Tailwind CSS
- Firebase (Auth, Firestore, Storage, Hosting)

## Environment Setup

Create a `.env` file based on [.env.example](.env.example) and fill in Firebase credentials:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Optional: Cloud Function endpoint for email notifications
VITE_FUNCTIONS_BASE_URL=
```

## Install & Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

The production build writes static assets to `dist/`.

## Firebase Setup

1. Create a Firebase project.
2. Enable Authentication (Email/Password).
3. Create Firestore and Storage.
4. Copy credentials into `.env`.
5. Apply rules:

```bash
firebase deploy --only firestore:rules,storage:rules
```

## Firestore Collections

- `products`
- `orders`
- `inquiries`
- `users`
- `news`

## Email Notifications

Email notifications are optional and triggered via a Cloud Function endpoint set in `VITE_FUNCTIONS_BASE_URL`. Add a HTTPS function named `notify` to send order/inquiry alerts using your email provider.

## Deployment (Firebase Hosting)

```bash
npm run build
firebase deploy --only hosting
```


## CRITICAL: Cloudflare Pages build command

Your deploy log shows **"No build command specified. Skipping build step."** — Cloudflare never runs `vite build`, so `dist/` does not exist.

`wrangler.toml` only sets the **output directory** (`dist`). It does **not** set the build command. You must set it in the dashboard:

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **nelna3twebside**
2. **Settings** → **Build & deployments** → **Build configurations** → **Edit**
3. Set **Framework preset**: Vite / React (or None)
4. Set **Build command**: `npm run build` (or `bash build.sh`)
5. Set **Build output directory**: `dist` (may show as read-only when `wrangler.toml` is used — that is OK)
6. Set **Root directory**: `/`
7. **Save** and **Retry deployment**

Without step 4, every deploy will fail with `Output directory "dist" not found` once the dependency cache skips `npm install`.
## Deployment (Cloudflare Pages)

This project is a Vite + React SPA. Cloudflare must run `npm run build` so the `dist/` folder exists before deploy (`dist/` is gitignored).

### Cloudflare Pages settings

In **Workers & Pages -> your project -> Settings -> Build & deployments -> Build configurations**:

| Setting | Value |
| --- | --- |
| Framework preset | Vite / React |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

`wrangler.toml` sets `pages_build_output_dir = "./dist"` for Wrangler and Pages config-as-code. The **build command is not defined in `wrangler.toml`** — set it in the dashboard as above.

If the build command is left empty, Cloudflare logs *"No build command specified. Skipping build step."* and fails with *"Output directory dist not found."* A `postinstall` hook runs `npm run build` only when `CF_PAGES=1` as a fallback; still set the build command in the dashboard for a normal deploy.

### Redeploy checklist

```bash
npm install
npm run build
```

Confirm `dist/index.html` exists, push to your connected branch, then trigger a new deployment in Cloudflare.

### SPA routing

`public/_redirects` includes `/* /index.html 200` so client-side routes work on Pages.

## Admin Roles

Create user profiles in `users/{uid}` with a `role` field:

- `admin`
- `distributor`

Admins can manage products, orders, inquiries, users, and news. Distributors can view orders.

## Notes

- Replace placeholder contact data and maps with production values.
- Replace video placeholders with actual farm media assets.
- Update sitemap URLs in [public/sitemap.xml](public/sitemap.xml) with your domain.

