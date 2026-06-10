import { useReducedMotion } from 'framer-motion'
import { cn } from '../lib/cn.js'
import chickenMascot from '../assets/brand/Asset 1.png'

const SIZE_CLASS = {
  xs: 'brand-chicken--xs',
  sm: 'brand-chicken--sm',
  md: 'brand-chicken--md',
  lg: 'brand-chicken--lg',
  xl: 'brand-chicken--xl',
}

const VARIANT_CLASS = {
  default: '',
  watermark: 'brand-chicken--watermark',
  float: 'brand-chicken--float',
}

function BrandChickenMascot({
  size = 'md',
  variant = 'default',
  decorative = true,
  animate = false,
  alt,
  className,
  width,
  height,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion()
  const resolvedAlt = decorative ? '' : alt || 'Nelna Farm chicken illustration'
  const shouldAnimate = animate && variant === 'float' && !prefersReducedMotion

  return (
    <img
      src={chickenMascot}
      alt={resolvedAlt}
      aria-hidden={decorative || undefined}
      draggable={false}
      loading="lazy"
      decoding="async"
      width={width}
      height={height}
      className={cn(
        'brand-chicken',
        SIZE_CLASS[size] || SIZE_CLASS.md,
        VARIANT_CLASS[variant] || VARIANT_CLASS.default,
        decorative && 'brand-chicken--decorative',
        shouldAnimate && 'brand-chicken--animate',
        className,
      )}
      {...props}
    />
  )
}

export default BrandChickenMascot
