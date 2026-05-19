import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Pause, Play, ChevronRight, ShieldCheck, Snowflake, Award } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import gallery01 from '../assets/nelna-gallery-01.jpg'
import gallery01Webp from '../assets/nelna-gallery-01.jpg?format=webp'
import gallery01Avif from '../assets/nelna-gallery-01.jpg?format=avif'
import gallery02 from '../assets/nelna-gallery-02.jpg'
import gallery02Webp from '../assets/nelna-gallery-02.jpg?format=webp'
import gallery02Avif from '../assets/nelna-gallery-02.jpg?format=avif'
import gallery03 from '../assets/nelna-gallery-03.jpg'
import gallery03Webp from '../assets/nelna-gallery-03.jpg?format=webp'
import gallery03Avif from '../assets/nelna-gallery-03.jpg?format=avif'
import gallery04 from '../assets/nelna-gallery-04.jpg'
import gallery04Webp from '../assets/nelna-gallery-04.jpg?format=webp'
import gallery04Avif from '../assets/nelna-gallery-04.jpg?format=avif'

const slideImages = [
  { fallback: gallery01, webp: gallery01Webp, avif: gallery01Avif },
  { fallback: gallery02, webp: gallery02Webp, avif: gallery02Avif },
  { fallback: gallery03, webp: gallery03Webp, avif: gallery03Avif },
  { fallback: gallery04, webp: gallery04Webp, avif: gallery04Avif },
]

const fallbackSlides = [
  {
    title: 'PREMIUM POULTRY\nAND FRESH PRODUCE\nYOU CAN TRUST',
    subtitle:
      'Nelna Farm supplies premium chicken, eggs, and fresh produce with certified food safety, strict quality control, and dependable island-wide delivery for homes and businesses.',
  },
  {
    title: 'CERTIFIED QUALITY\nFROM FARM\nTO EVERY KITCHEN',
    subtitle:
      'From breeder stock and veterinary supervision to processing and dispatch, every stage is managed with measurable standards and traceability.',
  },
  {
    title: 'RELIABLE COLD-CHAIN\nDELIVERY FOR\nHOMES AND BUSINESS',
    subtitle:
      'Our integrated distribution network protects freshness and keeps supply consistent for retailers, restaurants, and institutional buyers.',
  },
  {
    title: 'GROW WITH NELNA\nAS A DISTRIBUTOR\nPARTNER',
    subtitle:
      'Expand your business with stable product availability, operational support, and a trusted Sri Lankan brand built for long-term partnerships.',
  },
]

const qualityHighlights = [
  {
    icon: ShieldCheck,
    title: 'Certified Safety',
    detail: 'ISO 22000, HACCP, GMP and Halal-compliant controls.',
  },
  {
    icon: Snowflake,
    title: 'Cold-Chain Integrity',
    detail: 'Temperature protected handling from processing to delivery.',
  },
  {
    icon: Award,
    title: 'Trusted Since 1998',
    detail: 'A respected Sri Lankan poultry brand for homes and HORECA.',
  },
]

function splitHeroTitle(title) {
  const lines = String(title || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length === 0) {
    return { leading: fallbackSlides[0].title, accent: '' }
  }

  if (lines.length === 1) {
    return { leading: lines[0], accent: '' }
  }

  return {
    leading: lines.slice(0, -1).join(' '),
    accent: lines[lines.length - 1],
  }
}

function HeroSlider() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const swiperRef = useRef(null)
  const [paused, setPaused] = useState(prefersReducedMotion)

  const translatedSlides = t('heroSlides', { ns: 'home', returnObjects: true })
  const slides = useMemo(() => {
    if (Array.isArray(translatedSlides) && translatedSlides.length > 0) {
      return translatedSlides
    }
    return fallbackSlides
  }, [translatedSlides])

  const heroActions = [
    {
      label: 'View Products',
      to: '/products',
      kind: 'primary',
    },
    {
      label: 'Contact Sales',
      to: '/contact',
      kind: 'secondary',
    },
    {
      label: 'Become a Distributor',
      to: '/contact#distributor-partnership',
      kind: 'outline',
    },
    {
      label: 'Order Now',
      to: '/products#bulk-order',
      kind: 'outline',
    },
  ]

  return (
    <section className="relative min-h-[650px] overflow-hidden bg-brand-green-950 pt-16 md:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(248,188,36,0.2),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(218,35,40,0.16),transparent_40%)]" />

      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={prefersReducedMotion ? 0 : 700}
        loop
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span data-index="${index}" class="${className} !h-2 !w-2 !bg-white/80 !opacity-45 transition-opacity duration-300"></span>`,
        }}
        autoplay={
          paused || prefersReducedMotion
            ? false
            : {
                delay: 5500,
                disableOnInteraction: false,
              }
        }
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        className="h-full"
      >
        {slides.map((slide, index) => {
          const image = slideImages[index % slideImages.length]
          const { leading, accent } = splitHeroTitle(slide.title)
          const HeadingTag = index === 0 ? 'h1' : 'h2'

          return (
            <SwiperSlide key={`hero-slide-${index}`} className="relative min-h-[650px]">
              <div className="absolute inset-0">
                <picture>
                  <source srcSet={image.avif} type="image/avif" />
                  <source srcSet={image.webp} type="image/webp" />
                  <img
                    src={image.fallback}
                        alt={index === 0 ? 'Nelna Farm premium poultry and fresh produce' : 'Nelna Farm quality production and distribution operations'}
                    className={`h-full w-full object-cover object-center ${prefersReducedMotion ? '' : 'animate-ken-burns'}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green-950/96 via-brand-green-900/82 to-brand-green-900/46" />
                <div className="absolute inset-y-0 right-0 hidden w-[44%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_68%)] lg:block" />
              </div>

              <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-end px-4 pb-12 pt-12 sm:px-6 lg:px-8">
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10"
                >
                  <div className="max-w-3xl">
                    <p className="inline-flex items-center rounded-full border border-white/45 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-yellow-100">
                      Premium Sri Lankan Poultry Brand
                    </p>

                    <HeadingTag className="mt-5 text-4xl font-display font-extrabold leading-[1.04] text-white sm:text-5xl md:text-[3.6rem]">
                      {leading}
                      {accent ? (
                        <span className="block bg-gradient-to-r from-brand-yellow-300 via-brand-yellow-200 to-brand-yellow-100 bg-clip-text text-transparent">
                          {accent}
                        </span>
                      ) : null}
                    </HeadingTag>

                    <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-100 sm:text-lg md:text-[1.14rem]">
                      {slide.subtitle || fallbackSlides[0].subtitle}
                    </p>

                    <div className="mt-8 grid w-full gap-3 sm:max-w-2xl sm:grid-cols-2">
                      {heroActions.map((action) => (
                        <Link
                          key={action.label}
                          to={action.to}
                          className={
                            action.kind === 'primary'
                              ? 'btn-primary justify-center gap-2 px-6 py-3 text-sm shadow-float md:text-base'
                              : action.kind === 'secondary'
                                ? 'btn-secondary justify-center gap-2 px-6 py-3 text-sm md:text-base'
                                : 'inline-flex min-h-[44px] items-center justify-center rounded-pill border border-white/85 bg-black/24 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-brand-yellow-300 hover:bg-black/40 md:text-base'
                          }
                          aria-label={action.label}
                        >
                          <span>{action.label}</span>
                          <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {['Nationwide Delivery', 'Bio-secure Farms', 'Trusted by Hotels & Retail'].map((item) => (
                        <span
                          key={`${index}-${item}`}
                          className="inline-flex items-center rounded-pill border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.aside
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: [0, -8, 0],
                          }
                    }
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="hidden h-fit rounded-3xl border border-white/35 bg-white/10 p-5 shadow-[0_28px_55px_-32px_rgba(0,0,0,0.88)] backdrop-blur-md lg:block"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-yellow-100">
                      Why Businesses Choose Nelna Farm
                    </p>

                    <div className="mt-4 space-y-3.5">
                      {qualityHighlights.map((item) => (
                        <article key={item.title} className="rounded-2xl border border-white/26 bg-black/15 p-3.5">
                          <div className="flex items-start gap-3">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow-100 text-brand-green-900">
                              <item.icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <div>
                              <h3 className="text-sm font-bold text-white">{item.title}</h3>
                              <p className="mt-1 text-xs font-medium leading-relaxed text-slate-100">{item.detail}</p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    <Link
                      to="/contact#distributor-partnership"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-pill border border-brand-yellow-300 bg-brand-yellow-100/90 px-5 py-2.5 text-sm font-bold text-brand-green-900 transition hover:bg-brand-yellow-100"
                    >
                      Discuss Partnership
                    </Link>
                  </motion.aside>
                </motion.div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <button
        type="button"
        className="absolute bottom-4 right-4 z-20 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/65 bg-black/45 text-white backdrop-blur transition hover:border-brand-yellow-300 hover:text-brand-yellow-200"
        onClick={() => {
          const nextPaused = !paused
          setPaused(nextPaused)
          if (!swiperRef.current) {
            return
          }
          if (nextPaused) {
            swiperRef.current.autoplay?.stop()
          } else {
            swiperRef.current.autoplay?.start()
          }
        }}
        aria-label={paused ? 'Resume hero slider' : 'Pause hero slider'}
      >
        {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
      </button>
    </section>
  )
}

export default HeroSlider
