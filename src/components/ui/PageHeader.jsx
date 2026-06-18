import { cn } from '../../lib/cn.js'

function PageHeader({ eyebrow, title, subtitle, actions, className }) {
  return (
    <header className={cn('mb-6 flex flex-wrap items-start justify-between gap-4', className)}>
      <div>
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green-700">{eyebrow}</p> : null}
        <h1 className="mt-1 section-heading-lg text-nelna-dark dark:text-nelna-white">{title}</h1>
        {subtitle ? (
          <p className="mt-2 max-w-read text-body leading-relaxed text-nelna-dark/90 dark:text-nelna-white/80">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  )
}

export default PageHeader
