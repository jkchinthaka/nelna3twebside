#!/usr/bin/env node
/** Second-pass: remaining non-Nelna Tailwind color utilities. */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(process.cwd(), 'src')

const REPLACEMENTS = [
  [/\bborder-slate-50\b/g, 'border-nelna-green-soft'],
  [/\bbg-orange-\d+\b/g, 'bg-nelna-gold-soft'],
  [/\btext-orange-\d+\b/g, 'text-nelna-gold'],
  [/\bring-orange-\d+\b/g, 'ring-nelna-gold'],
  [/\bhover:bg-orange-\d+\b/g, 'hover:bg-nelna-gold-soft'],
  [/\bhover:text-orange-\d+\b/g, 'hover:text-nelna-green-dark'],
  [/\bgroup-hover:text-orange-\d+\b/g, 'group-hover:text-nelna-green-dark'],
  [/\bgroup-hover:bg-orange-\d+\b/g, 'group-hover:bg-nelna-gold-soft'],
  [/\bbg-blue-\d+\b/g, 'bg-nelna-green-soft'],
  [/\btext-blue-\d+\b/g, 'text-nelna-green'],
  [/\bborder-blue-\d+\b/g, 'border-nelna-green-soft'],
  [/\bbg-indigo-\d+\b/g, 'bg-nelna-green-soft'],
  [/\btext-indigo-\d+\b/g, 'text-nelna-green-dark'],
  [/\bring-indigo-\d+\b/g, 'ring-nelna-green-dark'],
  [/\btext-yellow-\d+\b/g, 'text-nelna-gold'],
  [/\bbg-yellow-\d+\b/g, 'bg-nelna-gold-soft'],
  [/\btext-cyan-\d+\b/g, 'text-nelna-green-light'],
  [/\bbg-cyan-\d+\b/g, 'bg-nelna-green-soft'],
  [/\bfrom-orange-\d+\b/g, 'from-nelna-gold'],
  [/\bto-amber-\d+\b/g, 'to-nelna-gold'],
  [/\bfrom-blue-\d+\b/g, 'from-nelna-green'],
  [/\bto-cyan-\d+\b/g, 'to-nelna-green-light'],
  [/\bfrom-white\b/g, 'from-nelna-white'],
  [/\bvia-white\b/g, 'via-nelna-white'],
  [/\bto-white\b/g, 'to-nelna-white'],
  [/\bto-transparent\b/g, 'to-transparent'],
  [/\bbg-\[#25D366\]\b/g, 'bg-nelna-green'],
  [/\btext-\[#25D366\]\b/g, 'text-nelna-green'],
  [/\bbg-\[#f5fbf6\]\b/g, 'bg-nelna-green-soft'],
  [/\bto-\[#f8faf8\]\b/g, 'to-nelna-white'],
  [/\bfrom-\[#f5fbf6\]\b/g, 'from-nelna-green-soft'],
  [/\bborder-t-white\b/g, 'border-t-nelna-white'],
  [/\bring-black\b/g, 'ring-nelna-dark'],
  [/\bbg-orange-500\b/g, 'bg-nelna-gold'],
  [/\bbg-blue-500\b/g, 'bg-nelna-green'],
]

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'assets' && dir.endsWith('src')) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (/\.(jsx|js|tsx|ts|css)$/.test(entry)) {
      const original = readFileSync(full, 'utf8')
      let updated = original
      for (const [pattern, replacement] of REPLACEMENTS) {
        updated = updated.replace(pattern, replacement)
      }
      if (updated !== original) writeFileSync(full, updated)
    }
  }
}

walk(ROOT)
console.log('Second-pass color migration complete.')
