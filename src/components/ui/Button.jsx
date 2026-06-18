import { forwardRef } from 'react'
import { cn } from '../../lib/cn.js'

const variants = {
  primary: 'bg-nelna-green-dark-500 text-nelna-white border-2 border-nelna-green-dark-500 hover:bg-nelna-green-dark-600 hover:border-nelna-green-dark-600 focus-visible:ring-nelna-green-dark-500',
  secondary: 'bg-transparent text-nelna-white border-2 border-nelna-white hover:bg-nelna-white hover:text-brand-green focus-visible:ring-nelna-white',
  green: 'bg-brand-green text-nelna-white border-2 border-brand-green hover:brightness-95 focus-visible:ring-brand-green',
  ghost: 'bg-transparent text-nelna-dark shadow-none hover:bg-nelna-gold-soft/80 focus-visible:ring-brand-green-500',
  outline: 'bg-nelna-white border-2 border-nelna-dark/30 text-nelna-dark shadow-none hover:border-brand-green-500 hover:bg-nelna-green-soft focus-visible:ring-brand-green-500',
  danger: 'bg-nelna-green-dark-500 text-nelna-white border-2 border-nelna-green-dark-500 hover:bg-nelna-green-dark-600 focus-visible:ring-nelna-green-dark-500',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
}

const Button = forwardRef(function Button(
  {
    className,
    variant = 'primary',
    size = 'md',
    type = 'button',
    loading = false,
    disabled,
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex min-w-[44px] items-center justify-center gap-2 rounded-md font-semibold tracking-[0.01em] shadow-card transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
})

export default Button
