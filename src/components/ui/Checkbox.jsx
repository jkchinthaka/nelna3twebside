import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn.js'

const Checkbox = forwardRef(function Checkbox(
  { id, label, hint, className, ...props },
  ref,
) {
  const generatedId = useId()
  const checkboxId = id || generatedId

  return (
    <div className="space-y-1">
      <label htmlFor={checkboxId} className="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-sm text-nelna-dark/90 dark:text-nelna-white/90">
        <input
          id={checkboxId}
          ref={ref}
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border-nelna-dark/25 text-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2',
            className,
          )}
          {...props}
        />
        <span>{label}</span>
      </label>
      {hint ? <p className="text-xs text-nelna-dark/70 dark:text-nelna-dark/60">{hint}</p> : null}
    </div>
  )
})

export default Checkbox
