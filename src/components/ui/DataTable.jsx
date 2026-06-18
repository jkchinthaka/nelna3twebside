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
    <div className={cn('overflow-hidden rounded-2xl border border-nelna-dark-soft bg-nelna-white dark:border-nelna-green-dark dark:bg-nelna-dark', className)}>
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm" aria-label={ariaLabel}>
          <thead className="bg-nelna-green-soft text-xs uppercase tracking-wide text-nelna-dark/80 dark:bg-nelna-green-dark dark:text-nelna-white/80">
            <tr>
              {desktopColumns.map((column) => (
                <th key={column.key} scope="col" className="px-4 py-3 font-semibold">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row[rowKey] || index} className="border-t border-nelna-green-soft align-top dark:border-nelna-green-dark">
                {desktopColumns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-nelna-dark dark:text-nelna-white/90">
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
            className="rounded-xl border border-nelna-dark-soft bg-nelna-white p-3 shadow-sm dark:border-nelna-green-dark dark:bg-nelna-green-dark"
          >
            {mobileColumns.map((column) => (
              <div key={column.key} className="flex items-start justify-between gap-3 py-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-wide text-nelna-dark/80 dark:text-nelna-dark/60">
                  {getColumnLabel(column)}
                </span>
                <div className="text-right text-nelna-dark dark:text-nelna-white">
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
