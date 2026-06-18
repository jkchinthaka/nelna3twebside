import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function CTASection({ title, body }) {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-800 to-brand-900 py-20">
      {/* Decorative background circle */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-700/30 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 text-nelna-white md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h3 className="font-display text-4xl font-bold leading-tight">{title}</h3>
          <p className="mt-4 text-lg text-brand-100">{body}</p>
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-4">
          <Link
            to="/products"
            className="rounded-full bg-nelna-white px-8 py-3 text-base font-bold text-brand-900 shadow-lg transition hover:scale-105 hover:bg-brand-50"
          >
            {t('cta.orderNow')}
          </Link>
          <Link
            to="/contact"
            className="rounded-full border-2 border-nelna-white px-8 py-3 text-base font-bold text-nelna-white transition hover:bg-nelna-white hover:text-brand-900"
          >
            {t('cta.contactUs')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection
