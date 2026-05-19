import { cn } from '../lib/cn.js'
import SectionTitle from './ui/SectionTitle.jsx'

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  center = false,
  tone = 'dark',
  className,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
}) {
  const resolvedAlign = center ? 'center' : align

  return (
    <div
      className={cn(
        'space-y-3',
        className,
        tone === 'light'
          ? 'text-white [&_h2]:text-white [&_p]:text-slate-100 [&_.eyebrow]:text-brand-yellow-300'
          : 'text-slate-900 [&_h2]:text-slate-900 [&_p]:text-slate-700 [&_.eyebrow]:text-brand-green-700',
      )}
    >
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        align={resolvedAlign}
        tone={tone}
        eyebrowClassName={eyebrowClassName}
        titleClassName={titleClassName}
        subtitleClassName={subtitleClassName}
        className={cn(tone === 'light' ? '[&_p]:text-slate-100 [&_h2]:text-white' : '')}
      />
      {resolvedAlign === 'left' ? <div className="h-1.5 w-20 rounded-full bg-brand-green-500" /> : null}
    </div>
  )
}

export default SectionHeading
