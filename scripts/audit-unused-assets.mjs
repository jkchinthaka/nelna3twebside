#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const IMAGE_EXT = /\.(png|jpe?g|webp|avif|svg|gif)$/i
const TEXT_EXT = /\.(js|jsx|ts|tsx|css|html|json|md|mjs)$/i
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git'])

function walkFiles(dir, filter, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue
      walkFiles(full, filter, out)
    } else if (filter(full)) {
      out.push(relative(ROOT, full).replace(/\\/g, '/'))
    }
  }
  return out
}

const assets = [
  ...walkFiles(join(ROOT, 'src'), (p) => IMAGE_EXT.test(p)),
  ...walkFiles(join(ROOT, 'public'), (p) => IMAGE_EXT.test(p)),
].sort()

const textFiles = [
  ...walkFiles(join(ROOT, 'src'), (p) => TEXT_EXT.test(p)),
  ...walkFiles(join(ROOT, 'public'), (p) => TEXT_EXT.test(p)),
  ...walkFiles(join(ROOT, 'scripts'), (p) => TEXT_EXT.test(p)),
]

for (const file of ['index.html', 'vite.config.js', 'tailwind.config.js', 'package.json']) {
  const full = join(ROOT, file)
  if (existsSync(full)) textFiles.push(file)
}

let corpus = ''
for (const file of textFiles) {
  if (file.includes('audit-unused-assets.mjs')) continue
  try {
    corpus += `\n${readFileSync(join(ROOT, file), 'utf8')}`
  } catch {
    // ignore unreadable files
  }
}

function isReferenced(assetPath) {
  const normalized = assetPath.replace(/\\/g, '/')
  const basename = normalized.split('/').pop()
  const assetTail = normalized.includes('/assets/')
    ? normalized.split('/assets/').slice(1).join('/assets/')
    : normalized.replace(/^public\//, '')

  const checks = [
    basename,
    normalized,
    `../assets/${assetTail}`,
    `assets/${assetTail}`,
    `'../assets/${assetTail}'`,
    `"../assets/${assetTail}"`,
    `'./assets/${assetTail}'`,
    `/${basename}`,
    `/${assetTail}`,
  ]

  if (normalized.startsWith('public/')) {
    checks.push(normalized.replace(/^public\//, '/'))
  }

  return checks.some((needle) => needle && corpus.includes(needle))
}

const used = []
const unused = []
const review = []

for (const asset of assets) {
  if (isReferenced(asset)) {
    used.push(asset)
    continue
  }

  const basename = asset.split('/').pop() || ''
  const isDuplicateCopy = basename.includes(' - Copy.')
  const isTypoCertFolder = asset.includes('/qulity/')
  const isKnownOrphan = ['Group 1.png', 'lines-01.png', 'lines-02.png'].includes(basename)
  const isUnusedGallery = /^nelna-gallery-(09|10|12|13|15)\./.test(basename)
  const isRootAsset1Duplicate = asset === 'src/assets/Asset 1.png'

  if (
    isDuplicateCopy ||
    isTypoCertFolder ||
    isKnownOrphan ||
    isUnusedGallery ||
    isRootAsset1Duplicate
  ) {
    unused.push(asset)
  } else {
    review.push(asset)
  }
}

console.log(JSON.stringify({ total: assets.length, used: used.length, unused, review }, null, 2))
