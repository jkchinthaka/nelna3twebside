import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { ChevronRight, ChevronLeft } from 'lucide-react'

import gallery01 from '../assets/nelna-gallery-01.jpg'
import gallery04 from '../assets/nelna-gallery-04.jpg'
import gallery05 from '../assets/nelna-gallery-05.jpg'
import gallery06 from '../assets/nelna-gallery-06.jpg'
import gallery07 from '../assets/nelna-gallery-07.jpg'

const SLIDE_IMAGES = [gallery01, gallery04, gallery05, gallery06, gallery07]

function Hero() {
  const { t } = useTranslation()
  const slides = t('heroSlides', { ns: 'home', returnObjects: true }) || []
  const swiperRef = useRef(null)
 
  return (
    <section className="relative h-[90vh] min-h-[650px] w-full overflow-hidden bg-brand-950">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + ' !bg-nelna-white !w-2 !h-2 !opacity-40 hover:!opacity-100 transition-opacity duration-300"></span>'
          },
        }}
        loop={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        className="h-full w-full group"
      >
        {slides.map((slide, index) => {
          const image = SLIDE_IMAGES[index % SLIDE_IMAGES.length]
          // Basic split logic for dual-tone heading if applicable, else just render content
          const slideLines = slide.title.split('\n');
          
          return (
            <SwiperSlide key={index} className="relative h-full w-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={image}
                  alt={slide.title}
                  className="h-full w-full object-cover scale-105 animate-ken-burns" /* Need ken-burns or similar simple scale anim if possible, else defaults */
                />
                {/* Refined Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                <div className="max-w-3xl space-y-8 animate-fade-in-up pt-16">
                  
                  <div className="overflow-hidden">
                    <h1 className="flex flex-col text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl lg:text-8xl drop-shadow-2xl">
                       {/* First part: White/Light */}
                        <span className="text-nelna-white">
                          {slideLines[0]} {slideLines[1]}
                       </span>
                       {/* Second part: Brand Color/Gold */}
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">
                          {slideLines.slice(2).join(' ')}
                       </span>
                    </h1>
                  </div>

                  {/* Decorative line */}
                  <div className="h-1 w-24 bg-gradient-to-r from-brand-400 to-transparent rounded-full" />

                  <p className="text-lg font-light tracking-wide text-nelna-white md:text-2xl md:leading-relaxed max-w-xl drop-shadow-lg font-display">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-5 pt-8">
                    <Link
                      to="/products"
                      className="group relative inline-flex items-center overflow-hidden rounded-full bg-brand-600 px-10 py-4 text-base font-bold text-nelna-white shadow-float transition duration-300 hover:bg-brand-500 hover:scale-[1.02]"
                    >
                       <span className="z-10 flex items-center gap-2">
                        {slide.button || t('cta.orderNow')}
                        <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                       </span>
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center rounded-full border border-nelna-white/30 bg-nelna-white/5 px-10 py-4 text-base font-bold text-nelna-white backdrop-blur-sm transition duration-300 hover:bg-nelna-white hover:text-brand-900 hover:border-nelna-white"
                    >
                      {t('cta.contactUs')}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}

        {/* Custom Navigation Buttons (Simple & Elegant) */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-nelna-white/10 bg-nelna-dark/20 p-3 text-nelna-white backdrop-blur-md transition hover:bg-nelna-white hover:text-brand-900 focus:outline-none hidden md:block"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-nelna-white/10 bg-nelna-dark/20 p-3 text-nelna-white backdrop-blur-md transition hover:bg-nelna-white hover:text-brand-900 focus:outline-none hidden md:block"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </Swiper>
    </section>
  )
}

export default Hero
