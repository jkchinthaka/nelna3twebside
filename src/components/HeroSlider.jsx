import AchievementStatsBar from './AchievementStatsBar.jsx'
import HeroCarousel from './HeroCarousel.jsx'

function HeroSlider() {
  return (
    <section className="hero-section min-h-[100svh]" aria-label="Nelna Farm visual showcase">
      <HeroCarousel />
      <AchievementStatsBar />
    </section>
  )
}

export default HeroSlider
