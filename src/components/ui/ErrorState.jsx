import Button from './Button.jsx'

function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this content. Please try again.',
  onRetry,
  retryLabel = 'Retry',
}) {
  return (
    <div className="surface-card border-brand-red-100 bg-brand-red-50/40 text-center dark:border-brand-red-900 dark:bg-brand-red-950/20">
      <div className="mx-auto max-w-lg py-4">
        <h3 className="text-lg font-semibold text-brand-red-700 dark:text-brand-red-200">{title}</h3>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{description}</p>
        {onRetry ? (
          <div className="mt-5">
            <Button variant="danger" onClick={onRetry}>
              {retryLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ErrorState
