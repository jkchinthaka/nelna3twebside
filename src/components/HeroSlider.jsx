import heroImageJpg from '../assets/nelna-gallery-01.jpg'
import heroImageWebp from '../assets/nelna-gallery-01.jpg?format=webp'
import heroImageAvif from '../assets/nelna-gallery-01.jpg?format=avif'

function HeroSlider() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-section__media relative">
        <picture>
          <source srcSet={heroImageAvif} type="image/avif" />
          <source srcSet={heroImageWebp} type="image/webp" />
          <img
            src={heroImageJpg}
            alt=""
            role="presentation"
            className="h-full w-full object-cover object-[center_35%]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
          />
        </picture>
        <div className="hero-section__overlay" aria-hidden="true" />
        <div className="hero-section__message">
          <h1
            id="hero-heading"
            className="font-display text-lg font-bold tracking-tight text-white drop-shadow-md sm:text-xl md:text-2xl"
          >
            Premium Poultry &amp; Fresh Produce — Trusted Since 1998
          </h1>
        </div>
      </div>
    </section>
  )
}

export default HeroSlider
