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
        <label htmlFor={areaId} className="block text-sm font-semibold tracking-[0.01em] text-nelna-dark/90 dark:text-nelna-white/90">
          {label} {required ? <span className="text-nelna-green-dark-600">*</span> : null}
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
          error ? 'border-nelna-green-dark-500 focus-visible:border-nelna-green-dark-500 focus-visible:ring-nelna-green-dark-500' : '',
          className,
        )}
        {...props}
      />
      {hint ? <p id={hintId} className="text-xs font-medium text-nelna-dark/70 dark:text-nelna-dark/60">{hint}</p> : null}
      {error ? <p id={errorId} className="text-xs font-medium text-nelna-green-dark-600">{error}</p> : null}
    </div>
  )
})

export default Textarea
