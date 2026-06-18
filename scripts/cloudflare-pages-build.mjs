/**
 * Cloudflare Pages: run production build during `npm install` when CF_PAGES=1.
 * Needed when the dashboard Build command is empty and dependency install runs.
 */
import { execSync } from 'node:child_process'

if (process.env.CF_PAGES === '1') {
  console.log('[cloudflare-pages] CF_PAGES detected — running production build...')
  execSync('npm run build', { stdio: 'inherit' })
}
