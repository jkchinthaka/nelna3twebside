import { Activity, CheckCircle, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Daily supply capacity', value: '12K+', icon: Activity },
  { label: 'Quality checks per batch', value: '30+', icon: CheckCircle },
  { label: 'Partner distributors', value: '150+', icon: Users },
]

function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <motion.div
          whileHover={{ y: -6 }}
          key={stat.label}
          className="group relative overflow-hidden rounded-3xl border border-nelna-green-soft bg-nelna-white p-6 shadow-sm transition duration-300 hover:shadow-float"
        >
          <div className="absolute right-0 top-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-brand-50 transition-transform duration-300 group-hover:scale-110" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-brand-100 p-3 text-brand-600">
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="font-display text-4xl font-bold text-nelna-dark">{stat.value}</p>
            <p className="mt-1 text-sm font-medium text-nelna-dark/70 uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsGrid
