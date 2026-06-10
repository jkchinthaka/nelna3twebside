import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BrandChickenMascot from './BrandChickenMascot.jsx'

function AnimatedCTASection({ title, body, primary, secondary }) {
  return (
    <section className="section-green section-spacing relative overflow-hidden" aria-labelledby="final-cta-heading">
      <BrandChickenMascot
        size="md"
        variant="float"
        animate
        className="pointer-events-none absolute -bottom-4 right-4 z-0 hidden opacity-90 sm:block md:right-10 lg:-bottom-2"
      />
      <div className="page-shell relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="final-cta-heading" className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">{body}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            to={primary?.href || '/contact'}
            className="btn-primary w-full justify-center gap-2 sm:w-auto"
          >
            {primary?.label || 'Contact Sales'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to={secondary?.href || '/contact'}
            className="btn-secondary w-full justify-center sm:w-auto"
          >
            {secondary?.label || 'Contact Sales'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AnimatedCTASection
