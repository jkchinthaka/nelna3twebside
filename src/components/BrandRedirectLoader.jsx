import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function BrandRedirectLoader({
  fromLogo,
  fromAlt = 'Nelna Farm',
  toLogo,
  toAlt = 'Nelna Mango',
  eyebrow = 'Welcome',
  title = 'Nelna Family',
  message = 'Redirecting you to Nelna Mango...',
  redirectUrl,
  redirectDelayMs = 2800,
}) {
  const prefersReducedMotion = useReducedMotion()
  const durationSec = redirectDelayMs / 1000

  useEffect(() => {
    if (!redirectUrl) return undefined

    const timer = window.setTimeout(() => {
      window.location.replace(redirectUrl)
    }, redirectDelayMs)

    return () => window.clearTimeout(timer)
  }, [redirectUrl, redirectDelayMs])

  const cardMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <main className="brand-redirect-loader" aria-live="polite" aria-busy="true">
      <div className="brand-redirect-loader__bg" aria-hidden="true">
        <span className="brand-redirect-loader__orb brand-redirect-loader__orb--one" />
        <span className="brand-redirect-loader__orb brand-redirect-loader__orb--two" />
        <span className="brand-redirect-loader__orb brand-redirect-loader__orb--three" />
      </div>

      <motion.section className="brand-redirect-loader__card" {...cardMotion}>
        <p className="brand-redirect-loader__eyebrow">{eyebrow}</p>
        <h1 className="brand-redirect-loader__title">{title}</h1>

        <div className="brand-redirect-loader__brands" aria-hidden="true">
          <motion.div
            className="brand-redirect-loader__logo-wrap"
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={fromLogo} alt={fromAlt} className="brand-redirect-loader__logo" />
            <span className="brand-redirect-loader__logo-label">Nelna Farm</span>
          </motion.div>

          <div className="brand-redirect-loader__connector">
            <span className="brand-redirect-loader__connector-track" />
            {!prefersReducedMotion ? (
              <motion.span
                className="brand-redirect-loader__connector-flow"
                animate={{ x: ['-120%', '220%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            ) : null}
            <span className="brand-redirect-loader__connector-icon">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </div>

          <motion.div
            className="brand-redirect-loader__logo-wrap brand-redirect-loader__logo-wrap--target"
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <img src={toLogo} alt={toAlt} className="brand-redirect-loader__logo" />
            <span className="brand-redirect-loader__logo-label">Nelna Mango</span>
          </motion.div>
        </div>

        <p className="brand-redirect-loader__message">{message}</p>

        <div
          className="brand-redirect-loader__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Redirect progress"
        >
          <motion.span
            className="brand-redirect-loader__progress-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: durationSec, ease: [0.4, 0, 0.2, 1] }
            }
          />
          {!prefersReducedMotion ? <span className="brand-redirect-loader__progress-shimmer" /> : null}
        </div>
      </motion.section>
    </main>
  )
}

export default BrandRedirectLoader
