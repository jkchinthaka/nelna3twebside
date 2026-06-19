import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

function CTASection({ title, body }) {
  const { t } = useTranslation()

  return (
    <section className="site-cta-band" aria-labelledby="cta-section-heading">
      <div className="site-cta-band__shell">
        <div className="site-cta-band__content">
          <h2 id="cta-section-heading" className="site-cta-band__title">
            {title}
          </h2>
          <p className="site-cta-band__body">{body}</p>
        </div>
        <div className="site-cta-band__actions">
          <Link to="/products" className="btn-primary w-full justify-center gap-2 sm:w-auto">
            {t('cta.orderNow')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/contact" className="btn-secondary w-full justify-center sm:w-auto">
            {t('cta.contactUs')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection
