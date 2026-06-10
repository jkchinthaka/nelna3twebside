import AchievementStatsBar from './AchievementStatsBar.jsx'
import HeroCarousel from './HeroCarousel.jsx'

function HeroSlider() {
  return (
    <section className="hero-section" aria-label="Nelna Farm visual showcase">
      <HeroCarousel />
      <AchievementStatsBar />
    </section>
  )
}

export default HeroSlider
