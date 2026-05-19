import { useState } from 'react'
import { cn } from '../../lib/cn.js'

function Tooltip({ content, children, className }) {
  const [open, setOpen] = useState(false)

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-popover transition',
          open ? 'opacity-100' : 'opacity-0',
          className,
        )}
      >
        {content}
      </span>
    </span>
  )
}

export default Tooltip
