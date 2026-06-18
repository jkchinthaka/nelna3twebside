import Button from './Button.jsx'

function EmptyState({
  title = 'No data found',
  description = 'There is nothing to display right now.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="surface-card text-center">
      <div className="mx-auto max-w-lg py-6">
        <h3 className="text-lg font-semibold text-nelna-dark dark:text-nelna-white">{title}</h3>
        <p className="mt-2 text-sm text-nelna-dark/80 dark:text-nelna-white/80">{description}</p>
        {actionLabel ? (
          <div className="mt-5">
            <Button onClick={onAction} variant="outline">
              {actionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default EmptyState
