import { cn } from '../../lib/cn.js'

function LoadingSpinner({ className, label = 'Loading...' }) {
  return (
    <div className={cn('inline-flex items-center gap-2 text-sm text-nelna-dark/80 dark:text-nelna-white/80', className)} role="status" aria-live="polite">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-green-500 border-t-transparent" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export default LoadingSpinner
