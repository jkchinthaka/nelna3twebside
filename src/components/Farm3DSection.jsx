import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, Leaf, ShieldCheck, Truck } from 'lucide-react'

import farmVisualFallback from '../assets/nelna-gallery-06.jpg'

const Farm3DSceneCanvas = lazy(() => import('./Farm3DSceneCanvas.jsx'))

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQuery = window.matchMedia(query)
    const update = () => setMatches(mediaQuery.matches)

    update()
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update)
      return () => {
        mediaQuery.removeEventListener('change', update)
      }
    }

    mediaQuery.addListener(update)
    return () => {
      mediaQuery.removeListener(update)
    }
  }, [query])

  return matches
}

function Farm3DSection() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [isNearViewport, setIsNearViewport] = useState(false)

  const canRenderInteractiveScene = isDesktop && canHover && !prefersReducedMotion

  useEffect(() => {
    if (!canRenderInteractiveScene || !sectionRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '180px 0px',
        threshold: 0.12,
      },
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [canRenderInteractiveScene])

  const showInteractiveScene = canRenderInteractiveScene && isNearViewport

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-[#f5fbf6] via-white to-[#f8faf8] py-20 md:py-24">
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-brand-green-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-4 h-64 w-64 rounded-full bg-brand-yellow-100 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)] lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="inline-flex items-center rounded-full border border-brand-green-200 bg-white/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-green-800">
            Premium Farm Visual Story
          </p>

          <h2 className="mt-5 text-3xl font-display font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Sri Lankan Freshness with
            <span className="block bg-gradient-to-r from-brand-green via-brand-yellow-500 to-brand-yellow-600 bg-clip-text text-transparent">
              Modern Food Excellence
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
            Nelna combines bio-secure farming, controlled processing, and cold-chain precision to protect quality from hatchery to household.
            This visual highlights the product journey with selective depth and movement, not heavy visual clutter.
          </p>

          <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: 'Certified Safety',
                detail: 'ISO 22000, HACCP, GMP and Halal aligned operations.',
              },
              {
                icon: Leaf,
                title: 'Fresh & Responsible',
                detail: 'Daily monitored welfare and quality controls.',
              },
              {
                icon: Truck,
                title: 'Cold-Chain Delivery',
                detail: 'Temperature-protected logistics islandwide.',
              },
              {
                icon: BadgeCheck,
                title: 'Trusted Brand',
                detail: 'Serving Sri Lankan homes and businesses since 1998.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white/88 p-4 shadow-[0_18px_35px_-30px_rgba(15,23,42,0.45)]">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">{item.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="relative"
        >
          <div className="absolute inset-6 -z-10 rounded-[2.25rem] bg-gradient-to-br from-brand-green-300/30 via-brand-yellow-100/30 to-brand-red-100/45 blur-xl" />

          <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_28px_56px_-30px_rgba(15,23,42,0.55)] backdrop-blur">
            {showInteractiveScene ? (
              <Suspense
                fallback={
                  <div className="flex h-[300px] items-center justify-center bg-gradient-to-br from-brand-green-50 to-brand-yellow-50 text-sm font-semibold text-slate-700 md:h-[360px]">
                    Loading interactive farm visual...
                  </div>
                }
              >
                <Farm3DSceneCanvas />
              </Suspense>
            ) : (
              <div className="relative h-[300px] md:h-[360px]">
                <img
                  src={farmVisualFallback}
                  alt="Nelna poultry production and freshness process"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/45 via-transparent to-brand-green/10" />
              </div>
            )}

            <div className="flex flex-col gap-2 border-t border-slate-200/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-700">
                {showInteractiveScene ? 'Interactive view enabled' : 'Static optimized preview'}
              </p>
              <p className="text-xs font-medium text-slate-600">
                {showInteractiveScene
                  ? 'Desktop experience with subtle 3D depth'
                  : 'Mobile and reduced-motion friendly fallback'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Farm3DSection
