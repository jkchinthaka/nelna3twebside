/* eslint-disable react-refresh/only-export-components */
import React from 'react'

function ErrorScreen({ error, errorInfo }) {
  const isDev = import.meta.env.DEV

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red-700">Application Error</p>
        <h1 className="mt-3 text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          We could not render this screen correctly. Please refresh the page or return to the home page.
          If this keeps happening, contact support.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
            Reload Page
          </button>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-pill border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700"
          >
            Go to Home
          </a>
        </div>

        {isDev ? (
          <>
            <div className="mt-7 rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="mb-2 text-sm font-semibold text-red-800">Error</div>
              <pre className="whitespace-pre-wrap text-xs text-red-900">{String(error?.stack || error)}</pre>
            </div>

            {errorInfo?.componentStack ? (
              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-800">Component stack</div>
                <pre className="whitespace-pre-wrap text-xs text-slate-700">
                  {String(errorInfo.componentStack)}
                </pre>
              </div>
            ) : null}
          </>
        ) : null}

        {!isDev ? <p className="mt-6 text-xs text-slate-500">Reference: UI runtime rendering error.</p> : null}
      </div>
    </div>
  )
}

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
    // Keep console logging for debugging
    console.error('App crashed while rendering', error, errorInfo)
  }

  render() {
    if (this.state.error) {
      return <ErrorScreen error={this.state.error} errorInfo={this.state.errorInfo} />
    }

    return this.props.children
  }
}
