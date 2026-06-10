import { useEffect, useState } from 'react'
import { ArrowRight, Eye, MessageCircle, Package, Snowflake } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Badge } from './ui/index.js'

const whatsappNumber = '94762718923'

function deriveBadges(product) {
  const badges = []
  const category = String(product.category || '').toLowerCase()
  const tags = Array.isArray(product.tags) ? product.tags.map((tag) => String(tag).toLowerCase()) : []
  const certs = Array.isArray(product.certifications)
    ? product.certifications.map((item) => String(item).toLowerCase())
    : []

  if (product.isNew) badges.push({ label: 'New', tone: 'primary' })
  if (tags.includes('popular') || tags.includes('best-seller')) badges.push({ label: 'Popular', tone: 'accent' })
  if (category.includes('frozen')) badges.push({ label: 'Frozen', tone: 'neutral' })
  if (category.includes('value') || tags.includes('value-added')) badges.push({ label: 'Value-Added', tone: 'accent' })
  if (certs.some((value) => value.includes('halal'))) badges.push({ label: 'Halal', tone: 'primary' })

  return badges.slice(0, 4)
}

function ProductCard({ product, view = 'grid', onQuickView }) {
  const weights = Array.isArray(product.weights) && product.weights.length ? product.weights : ['Available on request']
  const category = product.category || 'Premium Poultry'
  const detailPath = `/products/${product.slug || product.id}`
  const badges = deriveBadges(product)
  const isList = view === 'list'
  const prefersReducedMotion = useReducedMotion()
  const [tiltEnabled, setTiltEnabled] = useState(false)

  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)

  const rotateX = useTransform(pointerY, [0, 1], [6, -6])
  const rotateY = useTransform(pointerX, [0, 1], [-7, 7])

  const smoothRotateX = useSpring(rotateX, { stiffness: 170, damping: 18, mass: 0.45 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 170, damping: 18, mass: 0.45 })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 960px)')
    const update = () => setTiltEnabled(mediaQuery.matches)

    update()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update)
      return () => mediaQuery.removeEventListener('change', update)
    }

    mediaQuery.addListener(update)
    return () => mediaQuery.removeListener(update)
  }, [])

  const enableTilt = tiltEnabled && !prefersReducedMotion && !isList

  const handlePointerMove = (event) => {
    if (!enableTilt) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    pointerX.set(x)
    pointerY.set(y)
  }

  const handlePointerLeave = () => {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  const message = encodeURIComponent(`Hello Nelna team, I need more information about ${product.name}.`)
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${message}`
  const quoteHref = `/contact?product=${encodeURIComponent(product.slug || product.id)}`
  const canQuickView = typeof onQuickView === 'function'
  const hasHalal = badges.some((badge) => badge.label === 'Halal')

  return (
    <motion.article
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      whileHover={enableTilt ? { y: -8 } : { y: -4 }}
      style={
        enableTilt
          ? {
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              transformPerspective: 1200,
            }
          : undefined
      }
      className={`product-card group [transform-style:preserve-3d] ${
        isList ? 'grid gap-4 md:grid-cols-[260px_1fr]' : 'flex h-full flex-col'
      }`}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden ${isList ? 'h-full min-h-[230px] md:aspect-auto' : ''}`}
        style={enableTilt ? { transform: 'translateZ(24px)' } : undefined}
      >
        {hasHalal ? <span className="product-badge">Halal ✓</span> : null}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={`${product.name || 'Nelna product'} — premium poultry Sri Lanka`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            width={400}
            height={300}
            onError={(event) => {
              event.currentTarget.style.opacity = '0.6'
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-green-50 to-brand-green-100 text-brand-green-300">
            <Package className="h-10 w-10 opacity-50" aria-hidden="true" />
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge tone="primary" className="normal-case tracking-normal">{category}</Badge>
          {badges.map((badge) => (
            <Badge key={`${product.id}-${badge.label}`} tone={badge.tone} className="normal-case tracking-normal">
              {badge.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5" style={enableTilt ? { transform: 'translateZ(18px)' } : undefined}>
        <div>
          <h3 className="font-display text-xl font-bold text-slate-950">{product.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-800 line-clamp-3">{product.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {weights.slice(0, 3).map((weight) => (
            <span
              key={`${product.id}-weight-${weight}`}
              className="inline-flex items-center gap-1 rounded-pill bg-brand-green-50 px-3 py-1 text-xs font-semibold text-brand-green-700"
            >
              <Snowflake className="h-3.5 w-3.5" aria-hidden="true" />
              {weight}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-2">
          <Link to={quoteHref} className="btn-primary w-full justify-center">
            Request Quote
          </Link>
          <div className="flex gap-2">
            <Link to={detailPath} className="btn-green flex-1 justify-center gap-2 px-3 text-sm">
              View Details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            {canQuickView ? (
              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="inline-flex min-h-[44px] w-[44px] items-center justify-center rounded-md border border-brand-green-200 bg-white text-brand-green-700 transition hover:border-brand-green-300 hover:bg-brand-green-50"
                aria-label={`Quick view ${product.name}`}
              >
                <Eye className="h-4.5 w-4.5" aria-hidden="true" />
              </button>
            ) : null}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] w-[44px] items-center justify-center rounded-md bg-[#25D366] text-white shadow-sm transition hover:scale-105"
              aria-label={`Ask on WhatsApp about ${product.name}`}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default ProductCard
