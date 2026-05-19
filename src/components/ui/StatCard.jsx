import { cn } from '../../lib/cn.js'

function StatCard({ title, value, hint, tone = 'default', className }) {
  const toneClass =
    tone === 'danger'
      ? 'border-brand-red-200 bg-brand-red-50/50'
      : tone === 'accent'
        ? 'border-brand-yellow-200 bg-brand-yellow-50/50'
        : 'border-brand-green-200 bg-brand-green-50/40'

  return (
    <div className={cn('rounded-2xl border p-4 shadow-card', toneClass, className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{hint}</p> : null}
    </div>
  )
}

export default StatCard
