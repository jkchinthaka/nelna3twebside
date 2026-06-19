import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'

function TestimonialCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || items.length <= 1) {
      return undefined
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [items.length, prefersReducedMotion])

  if (!items.length) return null

  return (
    <div className="relative overflow-hidden rounded-3xl border border-nelna-green-soft bg-nelna-white p-5 shadow-soft sm:p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-1 text-brand-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="break-words text-base font-medium leading-relaxed text-nelna-dark/90 sm:text-lg">
            “{items[activeIndex].quote}”
          </p>
          {items[activeIndex].name ? (
            <div>
              <p className="text-sm font-semibold text-nelna-dark">{items[activeIndex].name}</p>
              <p className="text-xs text-nelna-dark/70">{items[activeIndex].role}</p>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex flex-col gap-3 text-xs text-nelna-dark/60 sm:flex-row sm:items-center sm:justify-between">
        <span>
          {activeIndex + 1} / {items.length}
        </span>
        <div className="flex flex-wrap gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-2 transition ${
                index === activeIndex ? 'bg-brand-green-500' : 'bg-nelna-gold-soft'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <span className={`block h-2 w-6 rounded-full ${index === activeIndex ? 'bg-nelna-white' : 'bg-nelna-dark-bg opacity-30'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialCarousel
