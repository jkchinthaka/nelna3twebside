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
        <label htmlFor={inputId} className={cn('block text-sm font-semibold tracking-[0.01em] text-nelna-dark/90 dark:text-nelna-white/90', labelClassName)}>
          {label} {required ? <span className="text-nelna-green-dark-600">*</span> : null}
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
          error ? 'border-nelna-green-dark-500 focus-visible:border-nelna-green-dark-500 focus-visible:ring-nelna-green-dark-500' : '',
          className,
        )}
        {...props}
      />
      {hint ? (
        <p id={hintId} className="text-xs font-medium text-nelna-dark/70 dark:text-nelna-dark/60">{hint}</p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-nelna-green-dark-600">{error}</p>
      ) : null}
    </div>
  )
})

export default Input
