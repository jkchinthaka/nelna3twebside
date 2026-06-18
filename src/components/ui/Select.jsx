import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn.js'

const Select = forwardRef(function Select(
  { id, label, hint, error, required, children, className, labelClassName, ...props },
  ref,
) {
  const generatedId = useId()
  const selectId = id || generatedId
  const hintId = hint ? `${selectId}-hint` : undefined
  const errorId = error ? `${selectId}-error` : undefined

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={selectId} className={cn('block text-sm font-medium text-nelna-dark/90 dark:text-nelna-white/90', labelClassName)}>
          {label} {required ? <span className="text-nelna-green-dark-600">*</span> : null}
        </label>
      ) : null}
      <select
        id={selectId}
        ref={ref}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={cn(
          'field-base',
          error ? 'border-nelna-green-dark-500 focus-visible:border-nelna-green-dark-500 focus-visible:ring-nelna-green-dark-500' : '',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {hint ? <p id={hintId} className="text-xs text-nelna-dark/70 dark:text-nelna-dark/60">{hint}</p> : null}
      {error ? <p id={errorId} className="text-xs font-medium text-nelna-green-dark-600">{error}</p> : null}
    </div>
  )
})

export default Select
