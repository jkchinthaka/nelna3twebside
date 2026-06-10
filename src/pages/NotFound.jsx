import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="bg-slate-50">
      <div className="page-shell flex min-h-[68vh] flex-col items-center justify-center py-14 text-center">
        <p className="text-7xl font-display font-extrabold text-brand-green-700">404</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Page not found</h1>
        <p className="mt-3 max-w-xl text-sm text-slate-600 md:text-base">
          The page you requested is unavailable or may have moved. You can continue browsing Nelna corporate pages below.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="btn-primary"
        >
          Back to home
        </Link>
        <Link
          to="/contact"
          className="inline-flex min-h-[44px] items-center justify-center rounded-pill border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
        >
          Contact support
        </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
