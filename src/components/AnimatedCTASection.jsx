import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function AnimatedCTASection({ title, body, primary, secondary }) {
  return (
    <section className="bg-brand-green-700 py-16 text-white md:py-20" aria-labelledby="final-cta-heading">
      <div className="page-shell flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="final-cta-heading" className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-green-50 md:text-lg">{body}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            to={primary?.href || '/products#bulk-order'}
            className="btn-secondary w-full justify-center gap-2 px-6 sm:w-auto"
          >
            {primary?.label || 'Order Now'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to={secondary?.href || '/contact'}
            className="btn-outline w-full justify-center border-white/80 text-white hover:bg-white hover:text-brand-green-800 sm:w-auto"
          >
            {secondary?.label || 'Contact Sales'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AnimatedCTASection
