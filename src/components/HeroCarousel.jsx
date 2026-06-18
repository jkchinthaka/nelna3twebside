import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import gallery01 from '../assets/nelna-gallery-01.jpg'
import gallery02 from '../assets/nelna-gallery-02.jpg'
import gallery03 from '../assets/nelna-gallery-03.jpg'
import gallery04 from '../assets/nelna-gallery-04.jpg'
import gallery05 from '../assets/nelna-gallery-05.jpg'
import gallery06 from '../assets/nelna-gallery-06.jpg'
import gallery07 from '../assets/nelna-gallery-07.jpg'
import gallery08 from '../assets/nelna-gallery-08.jpg'

const AUTOPLAY_DELAY_MS = 5500
const RESUME_AFTER_INTERACTION_MS = 4500
const FADE_SPEED_MS = 1200

const HERO_SLIDES = [
  { src: gallery01, alt: 'Nelna Farm premium poultry facility' },
  { src: gallery02, alt: 'Nelna Farm fresh produce operations' },
  { src: gallery03, alt: 'Nelna Farm quality-controlled processing' },
  { src: gallery04, alt: 'Nelna Farm distribution and logistics' },
  { src: gallery05, alt: 'Nelna Farm agricultural operations' },
  { src: gallery06, alt: 'Nelna Farm farm-to-table supply chain' },
  { src: gallery07, alt: 'Nelna Farm certified food production' },
  { src: gallery08, alt: 'Nelna Farm premium brand showcase' },
]

function HeroCarousel() {
  const swiperRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }, [])

  const pauseAutoplay = useCallback(() => {
    clearResumeTimeout()
    swiperRef.current?.autoplay?.stop()
  }, [clearResumeTimeout])

  const scheduleAutoplayResume = useCallback(() => {
    clearResumeTimeout()
    resumeTimeoutRef.current = setTimeout(() => {
      swiperRef.current?.autoplay?.start()
      resumeTimeoutRef.current = null
    }, RESUME_AFTER_INTERACTION_MS)
  }, [clearResumeTimeout])

  useEffect(() => () => clearResumeTimeout(), [clearResumeTimeout])

  return (
    <div className="hero-carousel">
      <Swiper
        className="hero-carousel__swiper"
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={FADE_SPEED_MS}
        loop
        grabCursor
        simulateTouch
        allowTouchMove
        resistanceRatio={0.85}
        longSwipesRatio={0.2}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        autoplay={{
          delay: AUTOPLAY_DELAY_MS,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true,
        }}
        pagination={{
          clickable: true,
          el: '.hero-carousel__pagination',
          bulletClass: 'hero-carousel__bullet',
          bulletActiveClass: 'hero-carousel__bullet--active',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          setTimeout(() => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            }
          })
          swiper.autoplay?.start()
        }}
        onTouchStart={pauseAutoplay}
        onSliderFirstMove={pauseAutoplay}
        onTouchEnd={scheduleAutoplayResume}
        onPaginationClick={scheduleAutoplayResume}
      >
        {HERO_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.src} className="hero-carousel__slide">
            <img
              src={slide.src}
              alt={slide.alt}
              className="hero-carousel__image"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
              width={1920}
              height={1080}
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-carousel__overlay" aria-hidden="true" />

      <button
        ref={prevRef}
        type="button"
        className="hero-carousel__nav hero-carousel__nav--prev"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        ref={nextRef}
        type="button"
        className="hero-carousel__nav hero-carousel__nav--next"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="hero-carousel__pagination" aria-hidden="true" />
    </div>
  )
}

export default HeroCarousel
