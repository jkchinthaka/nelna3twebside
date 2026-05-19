import SectionHeading from '../components/SectionHeading.jsx'
import { certifications } from '../data/certifications.js'

function Certifications() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <SectionHeading
        eyebrow="Certifications"
        title="Verified Quality Standards"
        subtitle="Our compliance is independently verified by leading regulatory and certification bodies."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:shadow-float"
          >
            {cert.imageUrl ? (
              <div className="absolute inset-0">
                <img
                  src={cert.imageUrl}
                  alt=""
                  className="h-full w-full object-cover opacity-10 transition-opacity duration-300 group-hover:opacity-15"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-white"></div>
              </div>
            ) : null}

            <div className="relative p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    {cert.icon ? <cert.icon className="h-6 w-6" /> : null}
                  </span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-brand-700">
                      {cert.shortName || 'Certification'}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{cert.name}</h3>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-semibold uppercase text-brand-700">
                  {cert.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600">Issuer: {cert.issuer}</p>

              <div className="mt-4 grid gap-2 text-xs text-slate-500">
                {cert.certificateNo ? <span>Certificate No: {cert.certificateNo}</span> : null}
                {cert.validFrom ? <span>Valid From: {cert.validFrom}</span> : null}
                {cert.validTo ? <span>Valid Until: {cert.validTo}</span> : null}
                {!cert.certificateNo && !cert.validFrom && !cert.validTo ? (
                  <span>Details available on request.</span>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {cert.file ? (
                  <a
                    href={cert.file}
                    className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
                    download
                  >
                    Download Certificate
                  </a>
                ) : (
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    Certificate file not attached
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Certifications
