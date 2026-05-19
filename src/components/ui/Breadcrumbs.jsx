import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

function Breadcrumbs({ items = [] }) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-300">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
              {item.to && !isLast ? (
                <Link className="font-medium hover:text-brand-green-700" to={item.to}>{item.label}</Link>
              ) : (
                <span className="font-medium text-slate-700 dark:text-slate-100">{item.label}</span>
              )}
              {!isLast ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
