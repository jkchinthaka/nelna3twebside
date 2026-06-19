import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { businessNetworkLogos } from '../data/businessNetworkLogos.js'

function PartnerLogoCard({ logo, className = '' }) {
  return (
    <div
      className={`group relative flex h-28 w-full max-w-[11rem] flex-shrink-0 items-center justify-center rounded-2xl border border-nelna-dark-soft bg-nelna-white p-4 shadow-md transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl sm:h-32 sm:max-w-[12rem] md:h-40 md:max-w-[18rem] md:rounded-3xl md:p-6 ${className}`}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        width={160}
        height={80}
      />
    </div>
  )
}

function PartnerStrip() {
  const prefersReducedMotion = useReducedMotion()
  const duplicatedLogos = [...businessNetworkLogos, ...businessNetworkLogos, ...businessNetworkLogos]

  return (
    <section className="overflow-hidden bg-nelna-white py-12 md:py-20">
      <div className="page-shell mb-8 text-center md:mb-12">
        <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-brand-500">
          Our Business Network
        </span>
        <h3 className="text-2xl font-bold text-nelna-dark sm:text-3xl md:text-4xl">
          Powering Sri Lanka&apos;s Leading Brands
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-nelna-dark/80 md:mt-4 md:text-lg">
          We are the trusted poultry supplier for the island&apos;s largest supermarket chains and top-tier restaurants.
        </p>
      </div>

      <div className="page-shell md:hidden">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {businessNetworkLogos.map((logo) => (
            <div key={logo.id} className="flex justify-center">
              <PartnerLogoCard logo={logo} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-8 hidden w-full overflow-hidden md:mt-10 md:block">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-nelna-white to-transparent md:w-60" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-nelna-white to-transparent md:w-60" />

        <div className="flex">
          <motion.div
            className="flex gap-8 md:gap-16"
            animate={prefersReducedMotion ? false : { x: ['0%', '-33.33%'] }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: 90,
                    ease: 'linear',
                    repeat: Infinity,
                  }
            }
          >
            {duplicatedLogos.map((logo, index) => (
              <PartnerLogoCard key={`${logo.id}-${index}`} logo={logo} className="w-72" />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="page-shell mt-10 text-center md:mt-16">
        <Link
          to="/contact#distributor-partnership"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-nelna-dark-soft bg-nelna-green-soft px-5 py-2 transition-colors hover:bg-nelna-white hover:shadow-sm"
        >
          <span className="text-sm font-semibold text-nelna-dark/80">
            Join 500+ Business Partners
          </span>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default PartnerStrip
