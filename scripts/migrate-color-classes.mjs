#!/usr/bin/env node
/** One-time codemod: replace disallowed Tailwind color classes with Nelna tokens. */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(process.cwd(), 'src')

const REPLACEMENTS = [
  // white / black
  [/\btext-white\b/g, 'text-nelna-white'],
  [/\bbg-white\b/g, 'bg-nelna-white'],
  [/\bborder-white\b/g, 'border-nelna-white'],
  [/\bring-white\b/g, 'ring-nelna-white'],
  [/\btext-black\b/g, 'text-nelna-dark'],
  [/\bbg-black\b/g, 'bg-nelna-dark'],
  [/\b!bg-white\b/g, '!bg-nelna-white'],
  [/\b!text-white\b/g, '!text-nelna-white'],
  [/\bhover:bg-white\b/g, 'hover:bg-nelna-white'],
  [/\bhover:text-white\b/g, 'hover:text-nelna-white'],
  [/\bhover:text-black\b/g, 'hover:text-nelna-dark'],
  [/\bhover:bg-black\b/g, 'hover:bg-nelna-dark'],
  [/\bhover:border-white\b/g, 'hover:border-nelna-white'],
  [/\bfocus:bg-white\b/g, 'focus:bg-nelna-white'],
  [/\bgroup-hover:bg-white\b/g, 'group-hover:bg-nelna-white'],
  [/\bgroup-hover:text-white\b/g, 'group-hover:text-nelna-white'],

  // slate text
  [/\btext-slate-950\b/g, 'text-nelna-dark'],
  [/\btext-slate-900\b/g, 'text-nelna-dark'],
  [/\btext-slate-800\b/g, 'text-nelna-dark'],
  [/\btext-slate-700\b/g, 'text-nelna-dark/90'],
  [/\btext-slate-600\b/g, 'text-nelna-dark/80'],
  [/\btext-slate-500\b/g, 'text-nelna-dark/70'],
  [/\btext-slate-400\b/g, 'text-nelna-dark/60'],
  [/\btext-slate-300\b/g, 'text-nelna-white/80'],
  [/\btext-slate-200\b/g, 'text-nelna-white/90'],
  [/\btext-slate-100\b/g, 'text-nelna-white'],
  [/\btext-slate-50\b/g, 'text-nelna-white'],

  // slate bg
  [/\bbg-slate-950\b/g, 'bg-nelna-dark'],
  [/\bbg-slate-900\b/g, 'bg-nelna-dark'],
  [/\bbg-slate-800\b/g, 'bg-nelna-green-dark'],
  [/\bbg-slate-700\b/g, 'bg-nelna-green-dark'],
  [/\bbg-slate-600\b/g, 'bg-nelna-green'],
  [/\bbg-slate-500\b/g, 'bg-nelna-green'],
  [/\bbg-slate-400\b/g, 'bg-nelna-green-light'],
  [/\bbg-slate-300\b/g, 'bg-nelna-gold-soft'],
  [/\bbg-slate-200\b/g, 'bg-nelna-gold-soft'],
  [/\bbg-slate-100\b/g, 'bg-nelna-green-soft'],
  [/\bbg-slate-50\b/g, 'bg-nelna-green-soft'],
  [/\bbg-slate-50\/50\b/g, 'bg-nelna-green-soft'],

  // slate border
  [/\bborder-slate-900\b/g, 'border-nelna-dark'],
  [/\bborder-slate-800\b/g, 'border-nelna-dark'],
  [/\bborder-slate-700\b/g, 'border-nelna-green-dark'],
  [/\bborder-slate-600\b/g, 'border-nelna-green'],
  [/\bborder-slate-500\b/g, 'border-nelna-green'],
  [/\bborder-slate-400\b/g, 'border-nelna-dark/30'],
  [/\bborder-slate-300\b/g, 'border-nelna-dark/25'],
  [/\bborder-slate-200\b/g, 'border-nelna-dark-soft'],
  [/\bborder-slate-100\b/g, 'border-nelna-green-soft'],

  // gray (mirror slate)
  [/\btext-gray-(\d{2,3})\b/g, (_, n) => (Number(n) >= 700 ? 'text-nelna-dark' : `text-nelna-dark/${Math.min(90, 50 + Number(n) / 10 | 0)}`)],
  [/\bbg-gray-(\d{2,3})\b/g, (_, n) => (Number(n) >= 700 ? 'bg-nelna-dark' : 'bg-nelna-green-soft')],
  [/\bborder-gray-(\d{2,3})\b/g, 'border-nelna-dark-soft'],

  // zinc / neutral
  [/\btext-zinc-/g, 'text-nelna-dark/'],
  [/\bbg-zinc-/g, 'bg-nelna-'],
  [/\bborder-zinc-/g, 'border-nelna-dark-soft'],
  [/\btext-neutral-/g, 'text-nelna-dark/'],
  [/\bbg-neutral-/g, 'bg-nelna-green-soft'],
  [/\bborder-neutral-/g, 'border-nelna-dark-soft'],

  // emerald
  [/\btext-emerald-/g, 'text-nelna-green'],
  [/\bbg-emerald-/g, 'bg-nelna-green'],
  [/\bborder-emerald-/g, 'border-nelna-green'],

  // red (errors → green-dark accent)
  [/\btext-red-/g, 'text-nelna-green-dark'],
  [/\bbg-red-/g, 'bg-nelna-green-soft'],
  [/\bborder-red-/g, 'border-nelna-green-dark'],

  // brand-red
  [/\bbrand-red\b/g, 'nelna-green-dark'],
  [/\btext-brand-red\b/g, 'text-nelna-green-dark'],
  [/\bbg-brand-red\b/g, 'bg-nelna-green-dark'],
  [/\bborder-brand-red\b/g, 'border-nelna-green-dark'],

  // rings / shadows
  [/\bring-slate-/g, 'ring-nelna-dark/'],
  [/\bshadow-slate-/g, 'shadow-nelna-dark/'],
  [/\bring-gray-/g, 'ring-nelna-dark/'],

  // dark: variants
  [/\bdark:bg-slate-950\b/g, 'dark:bg-nelna-dark'],
  [/\bdark:bg-slate-900\b/g, 'dark:bg-nelna-dark'],
  [/\bdark:bg-slate-800\b/g, 'dark:bg-nelna-green-dark'],
  [/\bdark:bg-slate-700\b/g, 'dark:bg-nelna-green-dark'],
  [/\bdark:text-slate-100\b/g, 'dark:text-nelna-white'],
  [/\bdark:text-slate-200\b/g, 'dark:text-nelna-white'],
  [/\bdark:text-slate-300\b/g, 'dark:text-nelna-white/80'],
  [/\bdark:text-slate-400\b/g, 'dark:text-nelna-white/70'],
  [/\bdark:text-slate-500\b/g, 'dark:text-nelna-white/60'],
  [/\bdark:text-slate-600\b/g, 'dark:text-nelna-white/80'],
  [/\bdark:text-slate-700\b/g, 'dark:text-nelna-white/90'],
  [/\bdark:text-slate-800\b/g, 'dark:text-nelna-white'],
  [/\bdark:text-slate-900\b/g, 'dark:text-nelna-white'],
  [/\bdark:border-slate-700\b/g, 'dark:border-nelna-green-dark'],
  [/\bdark:border-slate-600\b/g, 'dark:border-nelna-green'],
  [/\bdark:border-slate-500\b/g, 'dark:border-nelna-green'],
  [/\bdark:border-slate-400\b/g, 'dark:border-nelna-white/30'],
  [/\bdark:border-slate-300\b/g, 'dark:border-nelna-white/25'],
  [/\bdark:border-slate-200\b/g, 'dark:border-nelna-dark-soft'],
  [/\bdark:border-slate-100\b/g, 'dark:border-nelna-green-soft'],
]

function migrateContent(content) {
  let next = content
  for (const [pattern, replacement] of REPLACEMENTS) {
    next = next.replace(pattern, replacement)
  }
  return next
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (/\.(jsx|js|tsx|ts|css)$/.test(entry)) {
      const original = readFileSync(full, 'utf8')
      const updated = migrateContent(original)
      if (updated !== original) writeFileSync(full, updated)
    }
  }
}

walk(ROOT)
console.log('Tailwind color class migration complete.')
