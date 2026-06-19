import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const ASSETS = join(ROOT, 'src', 'assets')
const SRC = join(ROOT, 'src')

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (/\.(jsx?|tsx?|js)$/i.test(entry.name)) acc.push(full)
  }
  return acc
}

const imports = new Set()
for (const file of walk(SRC)) {
  const src = readFileSync(file, 'utf8')
  for (const match of src.matchAll(/from ['"]\.\.\/assets\/([^'"?]+)/g)) {
    imports.add(match[1])
  }
}

const missing = [...imports].filter((rel) => !existsSync(join(ASSETS, rel))).sort()
console.log(`Missing assets (${missing.length}):`)
for (const rel of missing) console.log(`  - src/assets/${rel}`)
