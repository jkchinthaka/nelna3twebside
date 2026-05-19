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
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
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
