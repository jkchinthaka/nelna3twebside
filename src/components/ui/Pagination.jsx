import Button from './Button.jsx'

function Pagination({ page = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <nav className="mt-4 flex items-center justify-between" aria-label="Pagination">
      <Button variant="outline" onClick={() => onPageChange?.(page - 1)} disabled={page <= 1}>
        Previous
      </Button>
      <p className="text-sm text-slate-600 dark:text-slate-300">Page {page} of {totalPages}</p>
      <Button variant="outline" onClick={() => onPageChange?.(page + 1)} disabled={page >= totalPages}>
        Next
      </Button>
    </nav>
  )
}

export default Pagination
