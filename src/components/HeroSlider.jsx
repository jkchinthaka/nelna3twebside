import AchievementStatsBar from './AchievementStatsBar.jsx'
import BrandChickenMascot from './BrandChickenMascot.jsx'
import HeroCarousel from './HeroCarousel.jsx'

function HeroSlider() {
  return (
    <section className="hero-section" aria-label="Nelna Farm visual showcase">
      <HeroCarousel />
      <BrandChickenMascot
        size="sm"
        variant="float"
        animate
        className="hero-section__mascot"
      />
      <AchievementStatsBar />
    </section>
  )
}

export default HeroSlider
