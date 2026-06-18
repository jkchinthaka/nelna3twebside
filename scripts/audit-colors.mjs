#!/usr/bin/env node
/**
 * Scans the repo for colors outside the official Nelna palette.
 * Exits 1 when violations are found.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const SCAN_DIRS = ['src', 'public']
const SCAN_FILES = ['index.html', 'tailwind.config.js', 'vite.config.js']
const IGNORE_DIRS = new Set(['node_modules', 'dist', '.vite', '.git'])
const IGNORE_PATH_PARTS = ['/assets/search/', '\\assets\\search\\']

const ALLOWED_HEX = new Set([
  '#27743a', '#27743A',
  '#46af53', '#46AF53',
  '#0d3013', '#0D3013',
  '#d8c76b', '#D8C76B',
  '#ebe9da', '#EBE9DA',
  '#251b25', '#251B25',
])

const ALLOWED_RGBA_PATTERNS = [
  /^rgba?\(\s*39\s*,\s*116\s*,\s*58\s*,/i,
  /^rgba?\(\s*216\s*,\s*199\s*,\s*107\s*,/i,
  /^rgba?\(\s*37\s*,\s*27\s*,\s*37\s*,/i,
  /^rgba?\(\s*13\s*,\s*48\s*,\s*19\s*,/i,
  /^rgba?\(\s*235\s*,\s*233\s*,\s*218\s*,/i,
]

const ALLOWED_TW_PREFIXES = [
  'nelna-', 'brand-green', 'brand-yellow', 'brand-', 'cloud-', 'ink-',
  'forest-', 'cream-', 'primary', 'secondary', 'danger', 'success',
  'warning', 'info', 'surface', 'text-', 'border-', 'ring-nelna',
  'shadow-nelna', 'from-nelna', 'to-nelna', 'via-nelna', 'fill-nelna',
  'stroke-nelna', 'divide-nelna', 'placeholder-nelna', 'accent-nelna',
  'decoration-nelna', 'outline-nelna',
]

const DISALLOWED_TW =
  /\b(?:text|bg|border|ring|from|to|via|fill|stroke|outline|decoration|divide|placeholder|shadow|accent)-(?:slate|gray|grey|zinc|neutral|stone|emerald|lime|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|red|orange|amber|yellow|green|black|white)(?:-\d{2,3})?\b/g

const HEX_RE = /#(?:[0-9a-fA-F]{3,8})\b/g
const RGB_RE = /rgba?\([^)]+\)/gi
const HSL_RE = /hsla?\([^)]+\)/gi
const ARBITRARY_COLOR = /\[(?:#|rgb|hsl)[^\]]+\]/gi

const violations = []

function shouldIgnorePath(rel) {
  return IGNORE_PATH_PARTS.some((part) => rel.includes(part)) || rel.endsWith('.txt')
}

function isAllowedRgba(value) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  return ALLOWED_RGBA_PATTERNS.some((pattern) => pattern.test(normalized))
}

function isAllowedHex(hex, file, lineContent) {
  if (ALLOWED_HEX.has(hex) || ALLOWED_HEX.has(hex.toLowerCase()) || ALLOWED_HEX.has(hex.toUpperCase())) {
    return true
  }
  if (file.endsWith('brandColors.js')) return true
  if (file === 'tailwind.config.js' && lineContent.includes('NELNA_')) return true
  return false
}

function isAllowedTailwindClass(token) {
  return ALLOWED_TW_PREFIXES.some((prefix) => token.includes(prefix))
}

function scanFile(filePath) {
  const rel = relative(ROOT, filePath).replace(/\\/g, '/')
  if (shouldIgnorePath(rel)) return

  const content = readFileSync(filePath, 'utf8')
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    const lineNo = index + 1

    for (const match of line.matchAll(HEX_RE)) {
      if (!isAllowedHex(match[0], rel, line)) {
        violations.push({ file: rel, line: lineNo, kind: 'hex', value: match[0], snippet: line.trim().slice(0, 120) })
      }
    }

    for (const match of line.matchAll(RGB_RE)) {
      if (!isAllowedRgba(match[0])) {
        violations.push({ file: rel, line: lineNo, kind: 'rgb', value: match[0], snippet: line.trim().slice(0, 120) })
      }
    }

    for (const match of line.matchAll(HSL_RE)) {
      violations.push({ file: rel, line: lineNo, kind: 'hsl', value: match[0], snippet: line.trim().slice(0, 120) })
    }

    for (const match of line.matchAll(DISALLOWED_TW)) {
      if (!isAllowedTailwindClass(match[0])) {
        violations.push({ file: rel, line: lineNo, kind: 'tailwind', value: match[0], snippet: line.trim().slice(0, 120) })
      }
    }

    for (const match of line.matchAll(ARBITRARY_COLOR)) {
      violations.push({ file: rel, line: lineNo, kind: 'arbitrary', value: match[0], snippet: line.trim().slice(0, 120) })
    }
  })
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (IGNORE_DIRS.has(entry)) continue
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) walk(full)
    else if (/\.(js|jsx|ts|tsx|css|html|xml|txt|toml|json|svg)$/i.test(entry)) {
      scanFile(full)
    }
  }
}

for (const dir of SCAN_DIRS) {
  walk(join(ROOT, dir))
}

for (const file of SCAN_FILES) {
  try {
    scanFile(join(ROOT, file))
  } catch {
    // optional
  }
}

if (violations.length === 0) {
  console.log('Color audit passed — no disallowed colors found.')
  process.exit(0)
}

console.error(`Color audit failed — ${violations.length} violation(s):\n`)
for (const v of violations.slice(0, 80)) {
  console.error(`  ${v.file}:${v.line} [${v.kind}] ${v.value}`)
  console.error(`    ${v.snippet}`)
}
if (violations.length > 80) {
  console.error(`  … and ${violations.length - 80} more`)
}
process.exit(1)
