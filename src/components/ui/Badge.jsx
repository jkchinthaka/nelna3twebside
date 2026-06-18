import { cn } from '../../lib/cn.js'

const tones = {
  neutral: 'bg-nelna-green-soft text-nelna-dark border-nelna-dark/25',
  primary: 'bg-brand-green-100 text-brand-green-900 border-brand-green-300',
  accent: 'bg-brand-yellow-100 text-brand-yellow-950 border-brand-yellow-400',
  danger: 'bg-nelna-green-dark-100 text-nelna-green-dark-800 border-nelna-green-dark-300',
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
