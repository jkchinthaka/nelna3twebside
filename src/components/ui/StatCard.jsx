import { cn } from '../../lib/cn.js'

function StatCard({ title, value, hint, tone = 'default', className }) {
  const toneClass =
    tone === 'danger'
      ? 'border-nelna-green-dark-200 bg-nelna-green-dark-50/50'
      : tone === 'accent'
        ? 'border-brand-yellow-200 bg-brand-yellow-50/50'
        : 'border-brand-green-200 bg-brand-green-50/40'

  return (
    <div className={cn('rounded-2xl border p-4 shadow-card', toneClass, className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-nelna-dark/70 dark:text-nelna-dark/60">{title}</p>
      <p className="mt-2 text-2xl font-bold text-nelna-dark dark:text-nelna-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-nelna-dark/80 dark:text-nelna-white/80">{hint}</p> : null}
    </div>
  )
}

export default StatCard
