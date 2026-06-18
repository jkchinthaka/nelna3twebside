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
          'section-heading',
          tone === 'light' ? 'text-nelna-white' : 'text-nelna-dark',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'text-body max-w-read leading-relaxed',
            tone === 'light' ? 'text-nelna-white' : 'text-nelna-dark/90',
            centered ? 'mx-auto' : '',
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
