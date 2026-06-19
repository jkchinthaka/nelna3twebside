import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { MAP_LINK } from '../data/companyContact.js'

function ContactMapEmbed({ embedUrl, mapLink = MAP_LINK, title = 'Nelna Farm location' }) {
  const [showInteractiveMap, setShowInteractiveMap] = useState(false)

  if (!showInteractiveMap) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center gap-4 bg-nelna-green-soft px-6 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-nelna-white text-nelna-green shadow-soft">
          <MapPin className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-nelna-dark-bg">View Nelna Farm on the map</p>
          <p className="text-xs font-medium text-nelna-dark-bg/75">
            Open directions in Google Maps or load the embedded map below.
          </p>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:justify-center">
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-pill border border-nelna-gold-soft bg-nelna-white px-4 text-sm font-semibold text-nelna-dark-bg transition hover:bg-nelna-green-soft"
          >
            <Navigation className="h-4 w-4 shrink-0 text-nelna-green" aria-hidden="true" />
            Open in Google Maps
          </a>
          {embedUrl ? (
            <button
              type="button"
              onClick={() => setShowInteractiveMap(true)}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-pill border border-nelna-green bg-nelna-green px-4 text-sm font-semibold text-nelna-white transition hover:bg-nelna-green-dark"
            >
              Load Map
            </button>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <iframe
      title={title}
      src={embedUrl}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-72 w-full border-0"
    />
  )
}

export default ContactMapEmbed
