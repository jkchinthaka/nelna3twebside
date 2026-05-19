import SectionHeading from '../components/SectionHeading.jsx'

function Terms() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-12">
      <SectionHeading
        eyebrow="Terms"
        title="Terms & Conditions"
        subtitle="Guidelines for using Nelna Farm services and content."
      />
      <div className="rounded-3xl border border-slate-100 bg-white p-6 text-sm text-slate-700 space-y-4">
        <p>All content provided on this site is for informational purposes only.</p>
        <p>Orders and supply availability are subject to confirmation by our team.</p>
        <p>By using this website, you agree to comply with applicable laws and our policies.</p>
      </div>
    </div>
  )
}

export default Terms
