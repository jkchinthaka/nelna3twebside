import { forwardRef } from 'react'
import { cn } from '../../lib/cn.js'

const IconButton = forwardRef(function IconButton(
  { className, label, size = 'md', variant = 'ghost', children, ...props },
  ref,
) {
  const sizeClass = size === 'sm' ? 'h-9 w-9' : size === 'lg' ? 'h-12 w-12' : 'h-11 w-11'
  const variantClass =
    variant === 'primary'
      ? 'bg-brand-green text-nelna-white hover:brightness-95'
      : variant === 'danger'
        ? 'bg-nelna-green-dark-500 text-nelna-white hover:bg-nelna-green-dark-600'
        : 'bg-nelna-white text-nelna-dark/90 hover:bg-nelna-green-soft border border-nelna-dark-soft'

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
