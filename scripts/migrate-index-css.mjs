#!/usr/bin/env node
/** Replace disallowed hex/rgb in index.css with Nelna CSS variables. */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const file = join(process.cwd(), 'src', 'index.css')
let css = readFileSync(file, 'utf8')

const replacements = [
  [/#27743a/gi, 'var(--nelna-green)'],
  [/#46af53/gi, 'var(--nelna-green-light)'],
  [/#0d3013/gi, 'var(--nelna-green-dark)'],
  [/#d8c76b/gi, 'var(--nelna-gold)'],
  [/#ebe9da/gi, 'var(--nelna-white)'],
  [/#251b25/gi, 'var(--nelna-dark-bg)'],
  [/#ffffff\b/gi, 'var(--nelna-white)'],
  [/#fff\b/gi, 'var(--nelna-white)'],
  [/#000000\b/gi, 'var(--nelna-dark-bg)'],
  [/#000\b/gi, 'var(--nelna-dark-bg)'],
  [/#da2328/gi, 'var(--nelna-green-dark)'],
  [/#b81c21/gi, 'var(--nelna-green-dark)'],
  [/#d97706/gi, 'var(--nelna-gold)'],
  [/#25d366/gi, 'var(--nelna-green)'],
  [/#f0f6f1/gi, 'var(--nelna-green-soft)'],
  [/#e3efe6/gi, 'var(--nelna-green-soft)'],
  [/#c5dcc9/gi, 'var(--nelna-green-soft)'],
  [/#9fc4a8/gi, 'var(--nelna-green-light)'],
  [/#e8e6d8/gi, 'var(--nelna-gold-soft)'],
  [/#f5f3ea/gi, 'var(--nelna-white)'],
  [/#f8fafc/gi, 'var(--nelna-white)'],
  [/#f1f5f9/gi, 'var(--nelna-green-soft)'],
  [/#f8fcfa/gi, 'var(--nelna-green-soft)'],
  [/#d6e4dc/gi, 'var(--nelna-dark-soft)'],
  [/#cbd8e2/gi, 'var(--nelna-dark-soft)'],
  [/#0f172a/gi, 'var(--nelna-dark-bg)'],
  [/#223548/gi, 'var(--nelna-green-dark)'],
  [/#4f6378/gi, 'var(--nelna-dark-bg)'],
  [/#334155/gi, 'var(--nelna-green-dark)'],
  [/#1a1a1a/gi, 'var(--nelna-dark-bg)'],
  [/#555555/gi, 'var(--nelna-dark-bg)'],
  [/#888888/gi, 'var(--nelna-dark-bg)'],
  [/#374151/gi, 'var(--nelna-green-dark)'],
  [/#ad740f/gi, 'var(--nelna-gold)'],
  [/#fff5f5/gi, 'var(--nelna-green-soft)'],
  [/#e8e8e8/gi, 'var(--nelna-dark-soft)'],
  [/#f5f9f5/gi, 'var(--nelna-green-soft)'],
  [/#f7f6f0/gi, 'var(--nelna-white)'],
  [/#f9fcfa/gi, 'var(--nelna-green-soft)'],
  [/#d5e6dc/gi, 'var(--nelna-dark-soft)'],
  [/#f7fbf8/gi, 'var(--nelna-green-soft)'],
  [/#faf6ea/gi, 'var(--nelna-gold-soft)'],
  [/#f8fbf9/gi, 'var(--nelna-green-soft)'],
  [/#fdf6e0/gi, 'var(--nelna-gold-soft)'],
  [/#dbe6f3/gi, 'var(--nelna-white)'],
  [/#111827/gi, 'var(--nelna-dark-bg)'],
  [/#1f2937/gi, 'var(--nelna-green-dark)'],
  [/#17212f/gi, 'var(--nelna-green-dark)'],
  [/#2f4258/gi, 'var(--nelna-green-dark)'],
  [/#94a3b8/gi, 'var(--nelna-white)'],
  [/#e2e8f0/gi, 'var(--nelna-white)'],
  [/#f8fafc/gi, 'var(--nelna-white)'],
  [/#1e293b/gi, 'var(--nelna-green-dark)'],
  [/#64748b/gi, 'var(--nelna-dark-bg)'],
  [/rgba\(\s*235\s*,\s*233\s*,\s*218/gi, 'rgba(255, 255, 255'],
  [/rgba\(\s*15\s*,\s*23\s*,\s*42/gi, 'rgba(37, 27, 37'],
]

for (const [pattern, value] of replacements) {
  css = css.replace(pattern, value)
}

// Normalize :root brand block
const rootBlock = `:root {
  color-scheme: light;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Official Nelna palette */
  --nelna-green: #27743A;
  --nelna-green-light: #46AF53;
  --nelna-green-dark: #0D3013;
  --nelna-gold: #D8C76B;
  --nelna-white: #FFFFFF;
  --nelna-dark-bg: #251B25;
  --nelna-green-soft: rgba(39, 116, 58, 0.08);
  --nelna-gold-soft: rgba(216, 199, 107, 0.18);
  --nelna-dark-soft: rgba(37, 27, 37, 0.08);

  --primary-green: var(--nelna-green);
  --brand-green: var(--nelna-green);
  --brand-green-rgb: 39, 116, 58;
  --brand-yellow: var(--nelna-gold);
  --primary: var(--nelna-green);
  --secondary: var(--nelna-gold);
  --danger: var(--nelna-green-dark);
  --focus-ring: var(--nelna-green);

  --forest: var(--nelna-green);
  --forest-mid: var(--nelna-green-light);
  --cream: var(--nelna-white);
  --cream-warm: var(--nelna-gold-soft);
  --overlay-dark: linear-gradient(
    180deg,
    rgba(13, 48, 19, 0.35) 0%,
    rgba(13, 48, 19, 0.55) 45%,
    rgba(37, 27, 37, 0.72) 100%
  );
  --overlay-light: rgba(255, 255, 255, 0.92);
  --success: var(--nelna-green);
  --warning: var(--nelna-gold);
  --error: var(--nelna-green-dark);

  --surface: var(--nelna-white);
  --surface-2: var(--nelna-white);
  --surface-3: var(--nelna-green-soft);
  --card-fill: var(--nelna-green-soft);
  --card-border: var(--nelna-dark-soft);
  --border: var(--nelna-dark-soft);
  --text: var(--nelna-dark-bg);
  --text-2: var(--nelna-green-dark);
  --text-3: var(--nelna-dark-bg);
  --text-inverse: var(--nelna-white);
`

css = css.replace(/:root \{[\s\S]*?--text-inverse:[^;]+;/m, rootBlock.trim())

const darkBlock = `.dark {
  color-scheme: dark;
  --surface: var(--nelna-dark-bg);
  --surface-2: var(--nelna-green-dark);
  --surface-3: var(--nelna-green-dark);
  --card-fill: var(--nelna-green-dark);
  --card-border: var(--nelna-dark-soft);
  --border: var(--nelna-dark-soft);
  --text: var(--nelna-white);
  --text-2: var(--nelna-white);
  --text-3: var(--nelna-white);
  --text-inverse: var(--nelna-white);
}`

css = css.replace(/\.dark \{[\s\S]*?--text-inverse:[^;]+;\s*\}/m, darkBlock)

writeFileSync(file, css)
console.log('index.css color migration complete.')
