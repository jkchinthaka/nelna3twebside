/**
 * Ensures `dist/` exists when Cloudflare Pages skips the build step
 * (e.g. dashboard build command left empty). Runs only on Pages builds.
 */
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const isPagesBuild = process.env.CF_PAGES === '1'

if (isPagesBuild && !existsSync('dist/index.html')) {
  execSync('npm run build', { stdio: 'inherit' })
}
