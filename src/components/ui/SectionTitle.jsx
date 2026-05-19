import { cn } from '../../lib/cn.js'

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'dark',
  className,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
}) {
  const centered = align === 'center'

  return (
    <div className={cn('space-y-2.5', centered ? 'text-center' : 'text-left', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'text-xs font-bold uppercase tracking-[0.2em]',
            tone === 'light' ? 'text-brand-yellow-300' : 'text-brand-green-700',
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'text-2xl font-bold leading-tight md:text-3xl',
          tone === 'light' ? 'text-white' : 'text-slate-900',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'text-sm leading-relaxed md:text-base',
            tone === 'light' ? 'text-slate-100' : 'text-slate-700',
            centered ? 'mx-auto max-w-3xl' : 'max-w-3xl',
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

export default SectionTitle
