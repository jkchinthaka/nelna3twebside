import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

function TestimonialCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [items.length])

  if (!items.length) return null

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-1 text-sun-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="text-lg font-medium text-slate-700">“{items[activeIndex].quote}”</p>
          <div>
            <p className="text-sm font-semibold text-slate-900">{items[activeIndex].name}</p>
            <p className="text-xs text-slate-500">{items[activeIndex].role}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
        <span>
          {activeIndex + 1} / {items.length}
        </span>
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-8 rounded-full transition ${
                index === activeIndex ? 'bg-brand-500' : 'bg-slate-200'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialCarousel
