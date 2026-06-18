import { cn } from '../../lib/cn.js'

function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-lg bg-nelna-gold-soft dark:bg-nelna-green-dark', className)} aria-hidden="true" />
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {Array.from({ length: cols }).map((__, colIndex) => (
            <Skeleton key={colIndex} className="h-10" />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Skeleton
