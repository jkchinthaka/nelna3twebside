import { forwardRef } from 'react'
import { cn } from '../../lib/cn.js'

const IconButton = forwardRef(function IconButton(
  { className, label, size = 'md', variant = 'ghost', children, ...props },
  ref,
) {
  const sizeClass = size === 'sm' ? 'h-9 w-9' : size === 'lg' ? 'h-12 w-12' : 'h-11 w-11'
  const variantClass =
    variant === 'primary'
      ? 'bg-brand-green-500 text-white hover:bg-brand-green-600'
      : variant === 'danger'
        ? 'bg-brand-red-500 text-white hover:bg-brand-red-600'
        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2',
        sizeClass,
        variantClass,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})

export default IconButton
