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
    tone: 'achievement-bar__number',
  },
  {
    id: 'farmers',
    icon: Wheat,
    value: 200,
    suffix: '+',
    label: 'Contract Farmers',
    tone: 'achievement-bar__number achievement-bar__number--accent',
    animate: true,
  },
  {
    id: 'employees',
    icon: Users,
    value: 1500,
    suffix: '+',
    label: 'Employees',
    tone: 'achievement-bar__number',
    animate: true,
  },
  {
    id: 'delivery',
    icon: Truck,
    text: 'Island-wide',
    label: 'Delivery Network',
    tone: 'achievement-bar__number achievement-bar__number--red',
  },
  {
    id: 'quality',
    icon: ShieldCheck,
    text: 'Certified',
    label: 'Food Safety',
    tone: 'achievement-bar__number',
  },
]

function AchievementStatsBar() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      role="region"
      aria-labelledby="achievement-stats-heading"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="achievement-bar"
    >
      <h2 id="achievement-stats-heading" className="sr-only">
        Nelna Farm achievements and credibility
      </h2>
      <dl className="achievement-bar__grid">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.id} className="achievement-bar__item">
              <dt className="achievement-bar__label">
                <span className="achievement-bar__icon" aria-hidden="true">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {stat.label}
              </dt>
              <dd className={stat.tone}>
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
  )
}

export default AchievementStatsBar
