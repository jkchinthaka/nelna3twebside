import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn.js'

const Input = forwardRef(function Input(
  { id, label, hint, error, required, className, labelClassName, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className={cn('block text-sm font-semibold tracking-[0.01em] text-slate-700 dark:text-slate-200', labelClassName)}>
          {label} {required ? <span className="text-brand-red-600">*</span> : null}
        </label>
      ) : null}
      <input
        id={inputId}
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
      />
      {hint ? (
        <p id={hintId} className="text-xs font-medium text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-brand-red-600">{error}</p>
      ) : null}
    </div>
  )
})

export default Input
