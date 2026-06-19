import { Award } from 'lucide-react'

import { certifications } from '../data/certifications.js'

function isRenderableIcon(Icon) {
  return typeof Icon === 'function'
}

function CertificationTrustPanel() {
  const certList = Array.isArray(certifications) ? certifications : []

  if (certList.length === 0) {
    return (
      <p className="cert-trust-section__subtitle cert-trust-panel__empty">
        Certification details are available on request.
      </p>
    )
  }

  return (
    <ul className="cert-trust-panel__grid" aria-label="Certification logos">
      {certList.map((cert) => {
        const CertIcon = isRenderableIcon(cert.icon) ? cert.icon : Award
        const label = cert.shortName ?? 'Certification'

        return (
          <li key={cert.id ?? label} className="cert-trust-panel__card">
            <div className="cert-trust-panel__logo-frame">
              {cert.imageUrl ? (
                <img
                  src={cert.imageUrl}
                  alt={`${label} certification logo`}
                  className="cert-trust-panel__logo-img"
                  loading="lazy"
                  decoding="async"
                  width={160}
                  height={120}
                />
              ) : (
                <span className="cert-trust-panel__logo-fallback" aria-hidden="true">
                  <CertIcon className="h-10 w-10 text-nelna-green" />
                </span>
              )}
            </div>
            <p className="cert-trust-panel__label">{label}</p>
            {cert.status ? <p className="cert-trust-panel__status">{cert.status}</p> : null}
          </li>
        )
      })}
    </ul>
  )
}

export default CertificationTrustPanel
