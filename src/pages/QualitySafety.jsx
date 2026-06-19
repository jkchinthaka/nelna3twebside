import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ShieldCheck,
  ThermometerSnowflake,
  Stethoscope,
  ScanBarcode,
  CheckCircle2,
  Microscope,
  Truck,
  Leaf,
  ArrowRight,
} from 'lucide-react'

import SectionHeading from '../components/SectionHeading.jsx'
import OptimizedPicture from '../components/OptimizedPicture.jsx'
import { certifications } from '../data/certifications.js'

import qualityHeroPicture from '../assets/nelna-gallery-17.jpg?w=1920&format=webp;jpg&quality=78&as=picture'
import qualityLabPicture from '../assets/nelna-gallery-18.jpg?w=1200&format=webp;jpg&quality=78&as=picture'

const standards = [
  {
    icon: ShieldCheck,
    title: 'Stringent Biosecurity',
    body: 'Our facilities operate under controlled-entry protocols. Vehicles and personnel follow disinfection procedures to reduce contamination risk.',
  },
  {
    icon: Stethoscope,
    title: 'Veterinary Oversight',
    body: 'On-site veterinary teams monitor flock health and support responsible production practices across our supply network.',
  },
  {
    icon: ThermometerSnowflake,
    title: 'Unbroken Cold Chain',
    body: 'From processing to delivery, temperature-controlled logistics help maintain product freshness through the cold chain.',
  },
  {
    icon: ScanBarcode,
    title: 'Full Traceability',
    body: 'Products can be traced back to farm batch records, supporting transparency and accountability across the supply chain.',
  },
]

const technologies = [
  { name: 'Automated Feeding', icon: Leaf },
  { name: 'Water Purification', icon: CheckCircle2 },
  { name: 'Lab Testing', icon: Microscope },
  { name: 'GPS Tracking', icon: Truck },
]

function QualitySafety() {
  const prefersReducedMotion = useReducedMotion()
  const motionInitial = prefersReducedMotion ? false : { opacity: 0, x: -30 }
  const motionAnimate = { opacity: 1, x: 0 }
  const cardInitial = prefersReducedMotion ? false : { opacity: 0, y: 30 }
  const cardAnimate = { opacity: 1, y: 0 }

  return (
    <div className="w-full bg-nelna-green-soft">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-nelna-green-dark">
        <div className="absolute inset-0">
          <OptimizedPicture
            picture={qualityHeroPicture}
            alt="Nelna Farm quality and food safety operations"
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover object-center opacity-60"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nelna-green-dark via-nelna-green-dark/85 to-nelna-green-dark/45" />
        </div>

        <div className="relative flex h-full max-w-7xl flex-col justify-center px-6 mx-auto">
          <motion.div
            initial={motionInitial}
            animate={motionAnimate}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-nelna-gold-soft bg-nelna-gold-soft px-4 py-1.5 text-sm font-bold text-nelna-gold backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>World-Class Standards</span>
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight !text-nelna-white drop-shadow-xl md:text-6xl">
              Safety is not just a protocol.
              <br />
              It is our <span className="text-nelna-gold">commitment</span>.
            </h1>
            <p className="mb-8 max-w-2xl text-lg font-medium leading-relaxed !text-nelna-white/95 md:text-xl">
              We apply certified food safety systems, veterinary oversight, and disciplined cold-chain controls
              to support safe, dependable poultry supply.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="btn-green rounded-full px-8 py-4 text-base font-bold shadow-lg transition hover:brightness-95 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nelna-gold"
              >
                Contact Our Team
              </Link>
              <Link
                to="/traceability"
                className="btn-secondary rounded-full px-8 py-4 text-base font-bold"
              >
                View Traceability
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Standards pillars */}
      <section className="relative z-10 -mt-20 max-w-7xl px-6 py-24 mx-auto" aria-labelledby="qs-standards-heading">
        <h2 id="qs-standards-heading" className="sr-only">
          Our quality and safety standards
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {standards.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={cardInitial}
              whileInView={cardAnimate}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : idx * 0.1 }}
              className="flex h-full flex-col rounded-3xl border border-nelna-green-soft bg-nelna-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-nelna-green-soft text-nelna-green">
                <item.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-nelna-dark">{item.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-nelna-dark/85">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="max-w-7xl px-6 py-16 mx-auto" aria-labelledby="qs-technology-heading">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Modern Technology"
              title="Science Meets Agriculture"
              subtitle="We invest in systems and monitoring to support consistent quality across production and distribution."
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {technologies.map((tech) => (
                <li
                  key={tech.name}
                  className="flex items-center gap-4 rounded-xl border border-nelna-green-soft bg-nelna-white p-4 shadow-sm"
                >
                  <span className="rounded-lg bg-nelna-green-soft p-2 text-nelna-green">
                    <tech.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-nelna-dark">{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              className="absolute inset-0 scale-105 -rotate-3 rounded-[3rem] bg-nelna-gold-soft opacity-50"
              aria-hidden="true"
            />
            <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-2xl">
              <OptimizedPicture
                picture={qualityLabPicture}
                alt="Nelna Farm laboratory quality testing"
                className="block aspect-[4/3] w-full"
                imgClassName="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-8 left-8 right-8 z-20 rounded-2xl border border-nelna-green-soft bg-nelna-white/95 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-nelna-green-light" aria-hidden="true" />
                <span className="text-sm font-bold uppercase tracking-wider text-nelna-dark/75">
                  Quality Monitoring
                </span>
              </div>
              <p className="font-display text-lg font-bold text-nelna-dark">
                Our quality teams apply routine laboratory and process checks before products are released for distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification trust panel */}
      <section className="cert-trust-section" aria-labelledby="qs-cert-heading">
        <div className="page-shell">
          <div className="cert-trust-section__header">
            <p className="quality-safety-eyebrow">Compliance &amp; Certification</p>
            <h2 id="qs-cert-heading" className="cert-trust-section__title">
              Our Seals of Assurance
            </h2>
            <p className="cert-trust-section__subtitle">
              Recognized food safety, quality management, environmental, and Halal compliance standards that support
              trusted poultry supply across Sri Lanka.
            </p>
          </div>

          <div className="cert-trust-panel">
            <ul className="cert-trust-panel__grid">
              {certifications.map((cert) => (
                <li key={cert.id} className="cert-trust-panel__item">
                  <div className="cert-trust-panel__logo">
                    <img
                      src={cert.imageUrl}
                      alt={`${cert.shortName} certification logo`}
                      className="cert-trust-panel__logo-img"
                      loading="lazy"
                      decoding="async"
                      width={72}
                      height={72}
                    />
                  </div>
                  <span className="cert-trust-panel__label">{cert.shortName}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/certifications" className="btn-primary gap-2 px-6">
              View Certifications
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-secondary px-6">
              Request Certificate Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default QualitySafety
