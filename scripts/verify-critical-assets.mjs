#!/usr/bin/env node
/**
 * Fails fast when critical static assets referenced by the app are missing.
 * Prevents opaque Vite "Could not resolve" errors on Cloudflare Pages.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const ASSETS = join(ROOT, 'src', 'assets')

const REQUIRED = [
  'nelna-logo.png',
  'Vector Smart Object.png',
]

function assetsFromBusinessNetworkLogos() {
  try {
    const src = readFileSync(join(ROOT, 'src', 'data', 'businessNetworkLogos.js'), 'utf8')
    return [...src.matchAll(/from '\.\.\/assets\/([^']+)'/g)].map((m) => m[1])
  } catch {
    return []
  }
}

const missing = []

for (const file of [...REQUIRED, ...assetsFromBusinessNetworkLogos()]) {
  const path = join(ASSETS, file)
  if (!existsSync(path)) {
    missing.push(`src/assets/${file}`)
  }
}

if (missing.length > 0) {
  console.error('Critical asset verification failed — missing files:\n')
  for (const path of missing) {
    console.error(`  - ${path}`)
  }
  console.error(
    '\nRestore these files before deploying. Commit 56d0fb4 accidentally removed image assets.',
  )
  process.exit(1)
}

console.log(`Asset verification passed (${REQUIRED.length + assetsFromBusinessNetworkLogos().length} paths checked).`)
