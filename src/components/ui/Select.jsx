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
        <label htmlFor={selectId} className={cn('block text-sm font-medium text-slate-700 dark:text-slate-200', labelClassName)}>
          {label} {required ? <span className="text-brand-red-600">*</span> : null}
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
          error ? 'border-brand-red-500 focus-visible:border-brand-red-500 focus-visible:ring-brand-red-500' : '',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {hint ? <p id={hintId} className="text-xs text-slate-500 dark:text-slate-400">{hint}</p> : null}
      {error ? <p id={errorId} className="text-xs font-medium text-brand-red-600">{error}</p> : null}
    </div>
  )
})

export default Select
