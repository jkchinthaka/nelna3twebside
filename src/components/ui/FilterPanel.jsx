import { cn } from '../../lib/cn.js'

function FilterPanel({ className, children }) {
  return (
    <aside className={cn('surface-card space-y-4', className)}>
      {children}
    </aside>
  )
}

export default FilterPanel
