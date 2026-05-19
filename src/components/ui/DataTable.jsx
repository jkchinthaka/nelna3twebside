import { cn } from '../../lib/cn.js'

function getColumnLabel(column) {
  if (typeof column.mobileLabel === 'string') return column.mobileLabel
  if (typeof column.label === 'string') return column.label
  return ''
}

function renderColumnValue(row, column, isMobile) {
  if (isMobile && typeof column.mobileRender === 'function') {
    return column.mobileRender(row)
  }

  if (typeof column.render === 'function') {
    return column.render(row)
  }

  return row[column.key] ?? '-'
}

function DataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  emptyFallback = null,
  className,
  ariaLabel = 'Data table',
}) {
  if (!rows.length && emptyFallback) {
    return emptyFallback
  }

  const desktopColumns = columns.filter((column) => column.desktopHidden !== true)
  const mobileColumns = columns.filter((column) => column.mobileHidden !== true)

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900', className)}>
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm" aria-label={ariaLabel}>
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              {desktopColumns.map((column) => (
                <th key={column.key} scope="col" className="px-4 py-3 font-semibold">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row[rowKey] || index} className="border-t border-slate-100 align-top dark:border-slate-700">
                {desktopColumns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-slate-800 dark:text-slate-200">
                    {renderColumnValue(row, column, false)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-3 md:hidden" role="list" aria-label={ariaLabel}>
        {rows.map((row, index) => (
          <article
            key={row[rowKey] || index}
            role="listitem"
            className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            {mobileColumns.map((column) => (
              <div key={column.key} className="flex items-start justify-between gap-3 py-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  {getColumnLabel(column)}
                </span>
                <div className="text-right text-slate-800 dark:text-slate-100">
                  {renderColumnValue(row, column, true)}
                </div>
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  )
}

export default DataTable
