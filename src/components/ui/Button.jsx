import { forwardRef } from 'react'
import { cn } from '../../lib/cn.js'

const variants = {
  primary: 'bg-[#27743a] text-white hover:bg-[#27743a] hover:brightness-95 focus-visible:ring-[#27743a]',
  secondary: 'bg-[#f8bc24] text-[#1f3b24] hover:bg-[#f8bc24] hover:brightness-95 focus-visible:ring-[#f8bc24]',
  ghost: 'bg-transparent text-slate-800 hover:bg-slate-200/80 focus-visible:ring-[#27743a]',
  outline: 'bg-white border border-slate-400 text-slate-800 hover:border-[#27743a] hover:bg-slate-50 focus-visible:ring-[#27743a]',
  danger: 'bg-[#da2328] text-white hover:bg-[#da2328] hover:brightness-95 focus-visible:ring-[#da2328]',
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
        'inline-flex min-w-[44px] items-center justify-center gap-2 rounded-pill font-bold tracking-[0.01em] shadow-card transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75',
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
