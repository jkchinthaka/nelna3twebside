
import React from 'react';

export default function ResultCard({ store }) {
  const hasLocation = Boolean(store?.location && typeof store.location.lat === 'number' && typeof store.location.lng === 'number')
  const distanceLabel = typeof store?.distance === 'number' ? `${store.distance.toFixed(1)} km away` : 'Distance unavailable'

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-brand-green-100 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
           <div className="flex items-center gap-2">
             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-50 text-brand-green">
               <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2m-4 0h14" />
               </svg>
             </div>
             <h3 className="font-heading text-lg font-bold text-slate-900">{store.storeName}</h3>
           </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
             <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
             </svg>
            {store.city}
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center rounded-full bg-brand-green-50 px-2.5 py-0.5 text-xs font-medium text-brand-green">
            {distanceLabel}
          </span>
        </div>
      </div>
      
      <div className="mt-4 border-t border-slate-50 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Available Stock</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {store.availableProducts && store.availableProducts.map((product) => (
            <span
              key={product}
              className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/10"
            >
              {product}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
           </svg>
           {store.contact}
        </div>
        <a
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors md:flex-none ${
            hasLocation ? 'bg-slate-900 hover:bg-slate-700' : 'bg-slate-300 cursor-not-allowed'
          }`}
          href={hasLocation ? `https://www.google.com/maps/search/?api=1&query=${store.location.lat},${store.location.lng}` : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!hasLocation}
        >
          <span>Get Directions</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
