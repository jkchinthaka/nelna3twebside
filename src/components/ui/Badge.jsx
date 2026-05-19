import { cn } from '../../lib/cn.js'

const tones = {
  neutral: 'bg-slate-100 text-slate-800 border-slate-300',
  primary: 'bg-brand-green-100 text-brand-green-900 border-brand-green-300',
  accent: 'bg-brand-yellow-100 text-brand-yellow-950 border-brand-yellow-400',
  danger: 'bg-brand-red-100 text-brand-red-800 border-brand-red-300',
}

function Badge({ className, tone = 'neutral', children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export default Badge
