import SectionHeading from '../components/SectionHeading.jsx'
import { processTimeline } from '../data/processTimeline.js'

function Process() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <SectionHeading
        eyebrow="Our Process"
        title="From Farm to Distribution"
        subtitle="A transparent, step-by-step journey that ensures quality and safety at every stage."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {processTimeline.map((step, index) => (
          <div key={step.title} className="rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-sm">
            <div className="h-44 bg-slate-100">
              <img src={step.imageUrl} alt={step.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-600">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Process
