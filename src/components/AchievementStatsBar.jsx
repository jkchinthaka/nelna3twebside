import { Award, ShieldCheck, Truck, Users, Wheat } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Counter from './Counter.jsx'

const stats = [
  {
    id: 'heritage',
    icon: Award,
    value: '1998',
    prefix: 'Since ',
    label: 'Trusted Heritage',
    tone: 'text-brand-green-700',
  },
  {
    id: 'farmers',
    icon: Wheat,
    value: 200,
    suffix: '+',
    label: 'Contract Farmers',
    tone: 'text-brand-green-700',
    animate: true,
  },
  {
    id: 'employees',
    icon: Users,
    value: 1500,
    suffix: '+',
    label: 'Employees',
    tone: 'text-brand-yellow-700',
    animate: true,
  },
  {
    id: 'delivery',
    icon: Truck,
    value: null,
    text: 'Island-wide',
    label: 'Delivery Network',
    tone: 'text-brand-red-600',
  },
  {
    id: 'quality',
    icon: ShieldCheck,
    value: null,
    text: 'Certified',
    label: 'Food Safety',
    tone: 'text-brand-green-700',
  },
]

function AchievementStatsBar() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="achievement-bar" aria-labelledby="achievement-stats-heading">
      <h2 id="achievement-stats-heading" className="sr-only">
        Nelna Farm achievements and credibility
      </h2>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="achievement-bar__inner"
      >
        <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.id} className="text-center">
                <dt className="flex flex-col items-center gap-2">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
                    {stat.label}
                  </span>
                </dt>
                <dd className={`mt-1 font-display text-xl font-extrabold sm:text-2xl lg:text-3xl ${stat.tone}`}>
                  {stat.animate ? (
                    <Counter to={stat.value} suffix={stat.suffix} duration={2} />
                  ) : (
                    <>
                      {stat.prefix}
                      {stat.text || stat.value}
                    </>
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      </motion.div>
    </section>
  )
}

export default AchievementStatsBar
