import { cn } from '../../lib/cn.js'

function Card({ className, children }) {
  return (
    <div className={cn('surface-card calm-card p-5 md:p-6', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children }) {
  return <div className={cn('mb-4 flex flex-wrap items-center justify-between gap-3', className)}>{children}</div>
}

export function CardTitle({ className, children }) {
  return <h3 className={cn('text-lg font-bold tracking-tight text-nelna-dark dark:text-nelna-white', className)}>{children}</h3>
}

export function CardBody({ className, children }) {
  return <div className={cn('text-[0.95rem] leading-relaxed text-nelna-dark/90 dark:text-nelna-white/90', className)}>{children}</div>
}

export function CardFooter({ className, children }) {
  return <div className={cn('mt-4 flex flex-wrap items-center justify-end gap-2', className)}>{children}</div>
}

export default Card
