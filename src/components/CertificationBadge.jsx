import { motion } from 'framer-motion'

function CertificationBadge({ icon: Icon, label }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="flex items-center gap-3 rounded-full border border-nelna-green-soft bg-nelna-white px-5 py-3 shadow-sm transition hover:shadow-float"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nelna-green-soft text-nelna-green">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-sm font-semibold text-nelna-dark">{label}</span>
    </motion.div>
  )
}

export default CertificationBadge
