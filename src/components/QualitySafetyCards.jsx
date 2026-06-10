import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardCheck, FileSearch, ShieldCheck, Snowflake, Stethoscope } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const pillars = [
  {
    title: 'ISO 22000',
    description: 'Food safety management systems applied across production and distribution.',
    icon: ShieldCheck,
  },
  {
    title: 'HACCP',
    description: 'Critical control points monitored to prevent hazards in every process stage.',
    icon: ClipboardCheck,
  },
  {
    title: 'GMP Standards',
    description: 'Good manufacturing practices maintained in facilities, equipment, and handling.',
    icon: FileSearch,
  },
  {
    title: 'Halal-Compliant',
    description: 'Processes aligned with Halal requirements for trusted market supply.',
    icon: ShieldCheck,
  },
  {
    title: 'Cold-Chain Integrity',
    description: 'Temperature-controlled logistics preserve freshness from plant to shelf.',
    icon: Snowflake,
  },
  {
    title: 'Veterinary Oversight',
    description: 'Farm health programs supervised by qualified veterinary professionals.',
    icon: Stethoscope,
  },
  {
    title: 'Batch Traceability',
    description: 'Clear visibility from farm inputs through processing to final delivery.',
    icon: FileSearch,
  },
  {
    title: 'Quality Control',
    description: 'Consistent checks for taste, safety compliance, and product integrity.',
    icon: ClipboardCheck,
  },
]

function QualitySafetyCards() {
  return (
    <section className="section-spacing bg-cream-warm" aria-labelledby="quality-safety-section-heading">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Quality & Safety"
          title="Certified Standards You Can Trust"
          subtitle="Nelna Farm operates with internationally recognized food safety systems, veterinary oversight, and disciplined cold-chain controls."
          align="left"
          eyebrowClassName="text-brand-green-800"
          titleClassName="text-slate-950"
          subtitleClassName="text-slate-700 md:text-[1.03rem] leading-relaxed"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item) => (
            <article
              key={item.title}
              className="surface-card surface-card-hover p-5"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/quality-safety" className="btn-primary gap-2 px-6">
            Explore Quality & Safety
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default QualitySafetyCards
