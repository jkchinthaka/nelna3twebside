import { motion } from 'framer-motion'
import { partners } from '../data/partners.js'

function PartnerStrip() {
  // Create multiple sets for seamless looping
  const duplicatedPartners = [...partners, ...partners, ...partners]

  const categories = [
    "Premium Retail Chains",
    "International QSR",
    "5-Star Hospitality",
    "Catering & Events",
    "Government & Defence"
  ]

  return (
    <section className="bg-nelna-white py-20 overflow-hidden">
      <div className="container mx-auto mb-12 px-6 text-center">
        <span className="block text-sm font-bold uppercase tracking-widest text-brand-500 mb-2">
          Our Business Network
        </span>
        <h3 className="text-3xl font-bold text-nelna-dark md:text-4xl">
          Powering Sri Lanka's Leading Brands
        </h3>
        <p className="mt-4 mx-auto max-w-2xl text-nelna-dark/80 text-lg">
          We are the trusted poultry supplier for the island's largest supermarket chains and top-tier restaurants.
        </p>

        {/* Categories Strip */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat, i) => (
             <span key={i} className="rounded-full bg-nelna-green-soft px-4 py-1.5 text-sm font-medium text-nelna-dark/80">
               {cat}
             </span>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden mt-10">
        {/* Gradient Fades for Smooth Edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-nelna-white to-transparent md:w-60" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-nelna-white to-transparent md:w-60" />

        <div className="flex">
          <motion.div
            className="flex gap-8 md:gap-16"
            animate={{
              x: ['0%', '-33.33%'],
            }}
            transition={{
              duration: 90,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="group relative flex h-40 w-72 flex-shrink-0 items-center justify-center rounded-3xl border border-nelna-dark-soft bg-nelna-white p-6 shadow-md transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-100/40"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Retention/Call to Action Area */}
      <div className="container mx-auto mt-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-nelna-dark-soft bg-nelna-green-soft px-6 py-2 transition-colors hover:bg-nelna-white hover:shadow-sm cursor-pointer group">
          <span className="text-sm font-semibold text-nelna-dark/80 group-hover:text-brand-600">
            Join 500+ Business Partners
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default PartnerStrip
