import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ctaLandscape from '../assets/Group 1.png'

function AnimatedCTASection({ title, body, primary, secondary }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-700 via-brand-600 to-brand-green-500 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute -right-16 top-10 h-80 w-80 rounded-full bg-white/32 blur-3xl"
      />
      <img
        src={ctaLandscape}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full object-cover object-bottom opacity-80 md:h-56"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 text-white md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h3 className="font-display text-4xl font-extrabold leading-tight !text-white md:text-5xl">{title}</h3>
          <p className="mt-4 text-lg !text-white">{body}</p>
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-4">
          <Link
            to={primary?.href || '/portal'}
            className="rounded-full bg-white px-8 py-3 text-base font-extrabold text-brand-700 shadow-float transition hover:scale-105 active:scale-95"
          >
            {primary?.label || 'Apply as Distributor'}
          </Link>
          <Link
            to={secondary?.href || '/contact'}
            className="rounded-full border-2 border-white/85 bg-white/10 px-8 py-3 text-base font-bold text-white transition hover:bg-white hover:text-brand-700 active:scale-95"
          >
            {secondary?.label || 'Contact Sales'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AnimatedCTASection
