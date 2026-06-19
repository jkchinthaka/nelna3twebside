import { Link } from 'react-router-dom'
import { ArrowRight, BellRing, Leaf, ShieldCheck, Sparkles } from 'lucide-react'

const UPDATE_TOPICS = [
  {
    icon: Sparkles,
    title: 'Product Launches',
    description: 'New offerings, recipes, and value-added poultry products from Nelna Farm.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Milestones',
    description: 'Certifications, food safety achievements, and operational excellence updates.',
  },
  {
    icon: Leaf,
    title: 'Sustainability Initiatives',
    description: 'Community programs, responsible farming, and environmental progress.',
  },
]

function News() {
  return (
    <div className="bg-nelna-white">
      <section className="surface-brand-green py-14 md:py-16">
        <div className="page-shell mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-pill border border-brand-yellow-300/60 bg-brand-yellow-500/28 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-50">
            Newsroom
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[0.01em] text-nelna-white md:text-5xl">
            Latest News and Updates
          </h1>
          <p className="mt-4 text-base font-medium leading-relaxed text-nelna-white/90 md:text-lg">
            Stay connected with our latest initiatives and updates.
          </p>
        </div>
      </section>

      <section className="page-shell section-spacing">
        <div className="news-hub-panel mx-auto max-w-4xl">
          <div className="news-hub-panel__intro text-center">
            <span className="news-hub-panel__icon" aria-hidden="true">
              <BellRing className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-nelna-white md:text-3xl">
              Fresh stories are on the way
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-nelna-white/88 md:text-base">
              We are preparing announcements on product launches, quality milestones, sustainability
              initiatives, and corporate updates. Check back soon for the latest from Nelna Farm.
            </p>
          </div>

          <ul className="news-hub-panel__topics mt-10 grid gap-4 md:grid-cols-3">
            {UPDATE_TOPICS.map((topic) => (
              <li key={topic.title} className="news-hub-panel__topic">
                <span className="news-hub-panel__topic-icon" aria-hidden="true">
                  <topic.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-nelna-dark">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-nelna-dark/85">{topic.description}</p>
              </li>
            ))}
          </ul>

          <div className="news-hub-panel__cta mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary w-full justify-center gap-2 sm:w-auto">
              Contact Our Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/about" className="btn-outline w-full justify-center sm:w-auto">
              Learn About Nelna
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default News
