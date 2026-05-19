import SectionHeading from '../components/SectionHeading.jsx'

function Privacy() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-12">
      <SectionHeading
        eyebrow="Privacy"
        title="Privacy Policy"
        subtitle="We respect your privacy and protect your data."
      />
      <div className="rounded-3xl border border-slate-100 bg-white p-6 text-sm text-slate-700 space-y-4">
        <p>We only collect the information needed to respond to inquiries, process orders, and improve our services.</p>
        <p>Your contact information is used for communication purposes and is never sold to third parties.</p>
        <p>For questions about this policy, contact our support team.</p>
      </div>
    </div>
  )
}

export default Privacy
