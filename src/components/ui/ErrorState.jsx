import Button from './Button.jsx'

function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this content. Please try again.',
  onRetry,
  retryLabel = 'Retry',
}) {
  return (
    <div className="surface-card border-nelna-green-dark-100 bg-nelna-green-dark-50/40 text-center dark:border-nelna-green-dark-900 dark:bg-nelna-green-dark-950/20">
      <div className="mx-auto max-w-lg py-4">
        <h3 className="text-lg font-semibold text-nelna-green-dark-700 dark:text-nelna-green-dark-200">{title}</h3>
        <p className="mt-2 text-sm text-nelna-dark/90 dark:text-nelna-white/90">{description}</p>
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
