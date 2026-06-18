import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { Button, EmptyState, Input } from '../components/ui/index.js'
import { faqs } from '../data/faqs.js'

const categoryMap = {
  Products: ['stored', 'halal', 'product'],
  Ordering: ['deliver', 'wholesale', 'order', 'pricing'],
  Safety: ['halal', 'stored'],
  Distribution: ['deliver', 'island'],
  Careers: ['career', 'job'],
  Certifications: ['halal', 'certified'],
}

function inferCategory(question) {
  const normalized = String(question || '').toLowerCase()

  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return category
    }
  }

  return 'General'
}

function FAQ() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [openQuestion, setOpenQuestion] = useState('')

  const categorizedFaqs = useMemo(() => {
    return faqs.map((faq) => ({ ...faq, category: inferCategory(faq.question) }))
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(new Set(categorizedFaqs.map((item) => item.category)))
    return ['All', ...unique]
  }, [categorizedFaqs])

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase()

    return categorizedFaqs.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const haystack = `${item.question} ${item.answer}`.toLowerCase()
      const matchesSearch = !query || haystack.includes(query)
      return matchesCategory && matchesSearch
    })
  }, [categorizedFaqs, search, category])

  return (
    <div className="page-shell section-spacing space-y-8">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Quick answers for product storage, ordering, certifications, and distribution support."
        align="left"
        eyebrowClassName="text-brand-green-800"
        titleClassName="text-nelna-dark"
        subtitleClassName="text-nelna-dark md:text-[1.03rem] leading-relaxed font-medium"
      />

      <section className="surface-card space-y-4">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search FAQ"
          label="Search questions"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`inline-flex min-h-[40px] items-center rounded-pill border px-4 text-sm font-semibold transition ${
                category === item
                  ? 'border-brand-green bg-brand-green text-nelna-white'
                  : 'border-nelna-dark/25 text-nelna-dark/90 hover:border-brand-green-300 hover:text-brand-green-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {filteredFaqs.length ? (
        <section className="space-y-3">
          {filteredFaqs.map((item) => {
            const isOpen = openQuestion === item.question
            return (
              <article key={item.question} className="surface-card">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenQuestion(isOpen ? '' : item.question)}
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="rounded-pill bg-brand-yellow-100 px-3 py-1 text-xs font-semibold text-brand-yellow-900">
                      {item.category}
                    </span>
                    <h2 className="mt-2 text-base font-semibold text-nelna-dark">{item.question}</h2>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-nelna-dark/70 transition ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen ? <p className="mt-3 text-sm leading-relaxed text-nelna-dark/80">{item.answer}</p> : null}
              </article>
            )
          })}
        </section>
      ) : (
        <EmptyState
          title="No FAQ items found"
          description="Try a different keyword or reset the category filter."
          actionLabel="Reset"
          onAction={() => {
            setSearch('')
            setCategory('All')
          }}
        />
      )}

      <section className="surface-card surface-brand-green">
        <h2 className="font-display text-2xl font-bold">Need more help?</h2>
        <p className="mt-2 text-sm text-nelna-white/90">
          Contact our support and sales team for product guidance, distributor assistance, or quality documentation.
        </p>
        <div className="mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              window.location.href = '/contact'
            }}
          >
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  )
}

export default FAQ
