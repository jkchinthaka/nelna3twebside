import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn.js'

const Textarea = forwardRef(function Textarea(
  { id, label, hint, error, required, className, rows = 4, ...props },
  ref,
) {
  const generatedId = useId()
  const areaId = id || generatedId
  const hintId = hint ? `${areaId}-hint` : undefined
  const errorId = error ? `${areaId}-error` : undefined

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={areaId} className="block text-sm font-semibold tracking-[0.01em] text-slate-700 dark:text-slate-200">
          {label} {required ? <span className="text-brand-red-600">*</span> : null}
        </label>
      ) : null}
      <textarea
        id={areaId}
        ref={ref}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={cn(
          'field-base min-h-[120px]',
          error ? 'border-brand-red-500 focus-visible:border-brand-red-500 focus-visible:ring-brand-red-500' : '',
          className,
        )}
        {...props}
      />
      {hint ? <p id={hintId} className="text-xs font-medium text-slate-500 dark:text-slate-400">{hint}</p> : null}
      {error ? <p id={errorId} className="text-xs font-medium text-brand-red-600">{error}</p> : null}
    </div>
  )
})

export default Textarea
