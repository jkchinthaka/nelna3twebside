import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn.js'

const Radio = forwardRef(function Radio(
  { id, label, hint, className, ...props },
  ref,
) {
  const generatedId = useId()
  const radioId = id || generatedId

  return (
    <div className="space-y-1">
      <label htmlFor={radioId} className="inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
        <input
          id={radioId}
          ref={ref}
          type="radio"
          className={cn(
            'h-4 w-4 border-slate-300 text-brand-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2',
            className,
          )}
          {...props}
        />
        <span>{label}</span>
      </label>
      {hint ? <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p> : null}
    </div>
  )
})

export default Radio
