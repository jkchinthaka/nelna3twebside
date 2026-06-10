import { Link } from 'react-router-dom'
import { ArrowRight, Building2, ChefHat, Store, Truck, UtensilsCrossed } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const segments = [
  {
    title: 'Hotels',
    description: 'Reliable poultry supply for banquets, room service, and high-volume kitchens.',
    icon: Building2,
  },
  {
    title: 'Restaurants',
    description: 'Consistent cuts and portions that help chefs deliver quality every service.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Caterers',
    description: 'Scalable supply with dependable dispatch for events and institutional catering.',
    icon: ChefHat,
  },
  {
    title: 'Retailers',
    description: 'Shelf-ready products with strong brand recognition and repeat demand.',
    icon: Store,
  },
  {
    title: 'Distributors',
    description: 'Partnership programs with category support and island-wide reach.',
    icon: Truck,
  },
  {
    title: 'Institutions',
    description: 'Structured supply for schools, hospitals, and large food service operations.',
    icon: Building2,
  },
]

function BusinessSupplySection() {
  return (
    <section className="section-spacing bg-white" aria-labelledby="business-supply-heading">
      <div className="page-shell">
        <SectionHeading
          eyebrow="For Business"
          title="Supply Solutions for HORECA and Distribution"
          subtitle="Whether you run a hotel kitchen, retail chain, or distribution network, Nelna Farm provides dependable poultry and food products with professional support."
          align="left"
          eyebrowClassName="text-brand-green-800"
          titleClassName="text-slate-950"
          subtitleClassName="text-slate-700 md:text-[1.03rem] leading-relaxed"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((item) => (
            <article key={item.title} className="surface-card p-5">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to="/contact" className="btn-primary gap-2 px-6">
            Contact Sales
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/contact#distributor-partnership" className="btn-yellow gap-2 px-6">
            Become a Distributor
          </Link>
          <Link to="/contact" className="btn-outline gap-2 px-6">
            Discuss Partnership
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BusinessSupplySection
