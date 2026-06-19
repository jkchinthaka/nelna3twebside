import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function AnimatedCTASection({ title, body, primary, secondary }) {
  return (
    <section className="site-cta-band" aria-labelledby="final-cta-heading">
      <div className="site-cta-band__shell">
        <div className="site-cta-band__content">
          <h2 id="final-cta-heading" className="site-cta-band__title">
            {title}
          </h2>
          <p className="site-cta-band__body">{body}</p>
        </div>
        <div className="site-cta-band__actions">
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
