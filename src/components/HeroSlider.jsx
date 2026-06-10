import heroImageJpg from '../assets/nelna-gallery-01.jpg'
import heroImageWebp from '../assets/nelna-gallery-01.jpg?format=webp'
import heroImageAvif from '../assets/nelna-gallery-01.jpg?format=avif'

function HeroSlider() {
  return (
    <section
      className="relative w-full overflow-hidden bg-brand-green-950 pt-0"
      aria-label="Nelna Farm hero banner"
    >
      <div className="relative h-[52vh] min-h-[300px] w-full sm:h-[58vh] sm:min-h-[360px] lg:h-[64vh] lg:min-h-[460px]">
        <picture>
          <source srcSet={heroImageAvif} type="image/avif" />
          <source srcSet={heroImageWebp} type="image/webp" />
          <img
            src={heroImageJpg}
            alt="Nelna Farm poultry operations"
            className="h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-green-950/12 via-transparent to-transparent" />
      </div>
    </section>
  )
}

export default HeroSlider
