import { Link } from 'react-router-dom'
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
            alt="Nelna Farm premium poultry and fresh produce in Sri Lanka"
            className="h-full w-full object-cover object-[center_35%]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
          />
        </picture>
        <div className="hero-section__overlay" aria-hidden="true" />
        <div className="hero-section__content page-shell">
          <div className="hero-section__content-inner">
            <h1 id="hero-heading">Farm Fresh. Always.</h1>
            <p>
              Sri Lanka&apos;s trusted source for premium chicken, eggs, and fresh produce — Halal certified, ISO 22000 compliant.
            </p>
            <div className="hero-ctas">
              <Link to="/products" className="btn-primary">
                Explore Products
              </Link>
              <Link to="/contact#distributor-partnership" className="btn-secondary">
                Become a Distributor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSlider
