#!/usr/bin/env node
/**
 * Verifies App.jsx lazy route imports resolve to existing page files.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const APP = join(ROOT, 'src', 'App.jsx')
const src = readFileSync(APP, 'utf8')

const importRe = /import\('\.\/pages\/([^']+)'\)/g
const missing = []
const checked = []

for (const match of src.matchAll(importRe)) {
  const rel = match[1]
  const path = join(ROOT, 'src', 'pages', rel)
  checked.push(`src/pages/${rel}`)
  if (!existsSync(path)) {
    missing.push(`src/pages/${rel}`)
  }
}

const routePaths = [...src.matchAll(/path="([^"]+)"/g)].map((m) => m[1])
const publicRoutes = [
  '/',
  '/about',
  '/quality-safety',
  '/contact',
  '/process',
  '/sustainability',
  '/certifications',
  '/traceability',
  '/faq',
  '/news',
  '/privacy',
  '/terms',
  '/portal',
  '/admin',
  '/distributor',
]

const undocumented = publicRoutes.filter(
  (route) => !routePaths.some((path) => path === route || path.startsWith(`${route}/`)),
)

if (missing.length > 0) {
  console.error('Route audit failed — missing page modules:\n')
  for (const path of missing) {
    console.error(`  - ${path}`)
  }
  process.exit(1)
}

if (undocumented.length > 0) {
  console.warn('Route audit warning — expected routes not found in App.jsx:')
  for (const route of undocumented) {
    console.warn(`  - ${route}`)
  }
}

console.log(`Route audit passed (${checked.length} lazy imports, ${routePaths.length} route paths).`)
