import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BrandChickenMascot from './BrandChickenMascot.jsx'
import ScrollReveal from './ScrollReveal.jsx'
import QualityBadgeIcon from './QualityBadgeIcon.jsx'

const pillars = [
  {
    title: 'ISO 22000',
    description: 'Food safety management systems applied across production and distribution.',
    badge: 'iso22000',
  },
  {
    title: 'HACCP',
    description: 'Critical control points monitored to prevent hazards in every process stage.',
    badge: 'haccp',
  },
  {
    title: 'GMP Standards',
    description: 'Good manufacturing practices maintained in facilities, equipment, and handling.',
    badge: 'gmp',
  },
  {
    title: 'Halal-Compliant',
    description: 'Processes aligned with Halal requirements for trusted market supply.',
    badge: 'halal',
  },
  {
    title: 'Cold-Chain Integrity',
    description: 'Temperature-controlled logistics preserve freshness from plant to shelf.',
    badge: 'cold-chain',
  },
  {
    title: 'Veterinary Oversight',
    description: 'Farm health programs supervised by qualified veterinary professionals.',
    badge: 'veterinary',
  },
  {
    title: 'Batch Traceability',
    description: 'Clear visibility from farm inputs through processing to final delivery.',
    badge: 'traceability',
  },
  {
    title: 'Quality Control',
    description: 'Consistent checks for taste, safety compliance, and product integrity.',
    badge: 'quality-control',
  },
]

function QualitySafetyCards() {
  return (
    <section
      className="quality-safety-section section-spacing"
      aria-labelledby="quality-safety-section-heading"
    >
      <BrandChickenMascot
        size="lg"
        variant="watermark"
        className="pointer-events-none absolute -bottom-6 right-0 z-0 hidden translate-x-1/4 sm:block md:right-8 lg:right-12"
      />
      <div className="page-shell relative z-10">
        <ScrollReveal className="quality-safety-header max-w-3xl">
          <p className="quality-safety-eyebrow">Quality &amp; Safety</p>
          <h2
            id="quality-safety-section-heading"
            className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-nelna-dark md:text-3xl lg:text-[2rem]"
          >
            Certified Standards You Can Trust
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-nelna-dark/80 md:text-base md:leading-relaxed">
            Nelna Farm operates with internationally recognized food safety systems, veterinary oversight,
            and disciplined cold-chain controls.
          </p>
          <div className="quality-safety-accent-line mt-5" aria-hidden="true">
            <span />
            <span />
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {pillars.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 60} className="h-full">
              <article
                className={`quality-safety-card group h-full${index % 2 === 1 ? ' quality-safety-card--alt' : ''}`}
              >
                <div className="quality-safety-icon">
                  <QualityBadgeIcon variant={item.badge} />
                </div>
                <h3 className="mt-5 font-display text-[1.0625rem] font-extrabold leading-snug tracking-tight text-nelna-dark">
                  {item.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-nelna-dark/70">
                  {item.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="quality-safety-cta-wrap mt-12" delay={120}>
          <p className="mb-4 max-w-xl text-sm leading-relaxed text-nelna-dark/80">
            Learn how Nelna Farm applies certified food safety systems across every stage of production and distribution.
          </p>
          <Link
            to="/quality-safety"
            className="quality-safety-cta btn-primary group inline-flex gap-2 px-6"
          >
            Explore Quality &amp; Safety
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default QualitySafetyCards
