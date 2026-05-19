import { useMemo, useState } from 'react'
import {
  Compass,
  Loader2,
  MapPin,
  Navigation,
  Search,
  Sparkles,
  Store,
} from 'lucide-react'
import SEO from '../components/SEO.jsx'
import { Button, EmptyState, ErrorState, Input, Select } from '../components/ui/index.js'
import { searchProducts } from '../services/searchService.js'

const recentSearchKey = 'nelna_finder_recent_searches'

function readRecentSearches() {
  try {
    const raw = localStorage.getItem(recentSearchKey)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.warn('Failed to parse recent searches', error)
    return []
  }
}

function ProductFinder() {
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [distanceKm, setDistanceKm] = useState(10)
  const [useCase, setUseCase] = useState('')
  const [locationLabel, setLocationLabel] = useState('')
  const [openNowOnly, setOpenNowOnly] = useState(false)
  const [location, setLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('')

  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [recentSearches, setRecentSearches] = useState(readRecentSearches())

  const captureLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Location services are not available in this browser.')
      return
    }

    setLocationStatus('Requesting location permission...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next = { lat: position.coords.latitude, lng: position.coords.longitude }
        setLocation(next)
        setLocationStatus('Location captured. Search now for nearby stores.')
      },
      () => {
        setLocationStatus('Location access denied. You can still search manually by city or district.')
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const persistRecentSearch = (term) => {
    const normalized = term.trim()
    if (!normalized) return

    const next = [normalized, ...recentSearches.filter((item) => item !== normalized)].slice(0, 6)
    setRecentSearches(next)
    localStorage.setItem(recentSearchKey, JSON.stringify(next))
  }

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Enter a product name, use-case, or area to start searching.')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const response = await searchProducts(query, location || undefined, {
        category,
        maxDistanceKm: distanceKm,
        useCase,
        locationLabel,
      })
      setResults(response)
      persistRecentSearch(query)
    } catch (requestError) {
      console.error(requestError)
      setError('Unable to complete search right now. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const stores = useMemo(() => {
    const source = Array.isArray(results?.stores) ? results.stores : []
    if (!openNowOnly) {
      return source
    }
    return source.filter((store) => store.openNow === true)
  }, [results, openNowOnly])

  const mapStore = stores[0]

  return (
    <>
      <SEO
        title="Product Finder | Nelna Farm"
        description="Find nearby stores and distributors for Nelna products using AI-assisted search, location filters, and directions."
      />

      <div className="bg-slate-50">
        <section className="bg-gradient-to-br from-brand-green-950 via-brand-green-900 to-brand-green-800 py-16 text-white">
          <div className="page-shell">
            <span className="inline-flex items-center gap-2 rounded-pill border border-brand-yellow-300/60 bg-brand-yellow-500/28 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow-50">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI-Assisted Product Finder
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight !text-white md:text-5xl">
              Find Nelna Products Near You
            </h1>
            <p className="mt-4 max-w-3xl text-base text-white md:text-lg">
              Search by product name, use-case, category, and location to discover nearby stores and
              distributor points with direction shortcuts.
            </p>
          </div>
        </section>

        <section className="page-shell -mt-10 pb-12">
          <div className="surface-card space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Input
                label="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. Chicken sausages in Colombo"
                required
              />
              <Input
                label="Use Case"
                value={useCase}
                onChange={(event) => setUseCase(event.target.value)}
                placeholder="Hotel, household, quick meal, etc."
              />
              <Select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter category">
                <option value="All">All Categories</option>
                <option value="Frozen">Frozen</option>
                <option value="Processed">Processed</option>
              </Select>
              <Input
                label="Preferred Area"
                value={locationLabel}
                onChange={(event) => setLocationLabel(event.target.value)}
                placeholder="City, district, or landmark"
              />
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
              <Select
                value={String(distanceKm)}
                onChange={(event) => setDistanceKm(Number(event.target.value))}
                aria-label="Distance filter"
              >
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="20">Within 20 km</option>
                <option value="50">Within 50 km</option>
              </Select>

              <label className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-slate-400 px-4 py-2 text-sm font-medium text-slate-800">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-brand-green-600"
                  checked={openNowOnly}
                  onChange={(event) => setOpenNowOnly(event.target.checked)}
                />
                Open now only
              </label>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={captureLocation}>
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  Use Location
                </Button>
                <Button type="button" onClick={handleSearch} loading={isLoading}>
                  {!isLoading ? <Search className="h-4 w-4" aria-hidden="true" /> : null}
                  Search
                </Button>
              </div>
            </div>

            {locationStatus ? <p className="text-xs font-medium text-slate-600">{locationStatus}</p> : null}

            {recentSearches.length ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Recent</span>
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="rounded-pill border border-slate-400 px-3 py-1 text-xs font-medium text-slate-800 transition hover:border-brand-green-400 hover:text-brand-green-800"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {error ? (
            <div className="mt-5">
              <ErrorState title="Search failed" description={error} retryLabel="Retry" onRetry={handleSearch} />
            </div>
          ) : null}

          {isLoading ? (
            <div className="mt-8 flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-slate-700">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Searching products and stores...
            </div>
          ) : null}

          {!isLoading && results ? (
            <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="surface-card">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why these results?</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Results are ranked using your search text, selected category, distance preference,
                    and available matching products in nearby stores.
                  </p>
                </div>

                {Array.isArray(results.products) && results.products.length ? (
                  <div className="surface-card">
                    <h2 className="font-display text-xl font-bold text-slate-900">Recommended Products</h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {results.products.slice(0, 6).map((entry) => (
                        <article key={entry.product.productCode} className="rounded-xl border border-slate-200 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand-green-700">
                            Match {(Number(entry.score || 0) * 100).toFixed(0)}%
                          </p>
                          <h3 className="mt-2 font-semibold text-slate-900">{entry.product.name}</h3>
                          <p className="mt-2 text-xs">
                            <span className="bg-brand-green-50 text-brand-green-800 px-2 py-0.5 font-mono rounded-full">{entry.product.productCode}</span>
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}

                {stores.length ? (
                  <div className="space-y-3">
                    {stores.map((store) => {
                      const hasLocation =
                        store?.location &&
                        typeof store.location.lat === 'number' &&
                        typeof store.location.lng === 'number'

                      return (
                        <article key={store.storeName} className="surface-card">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="font-display text-lg font-bold text-slate-900">{store.storeName}</h3>
                              <p className="mt-1 text-sm text-slate-700">{store.city || 'Sri Lanka'}</p>
                              <p className="mt-1 text-xs text-slate-600">
                                {typeof store.distance === 'number'
                                  ? `${store.distance.toFixed(1)} km away`
                                  : 'Distance not available'}
                              </p>
                            </div>
                            <span className="rounded-pill bg-brand-green-50 px-3 py-1 text-xs font-semibold text-brand-green-700">
                              {store.openNow ? 'Open now' : 'Store hours vary'}
                            </span>
                          </div>

                          {Array.isArray(store.availableProducts) && store.availableProducts.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {store.availableProducts.slice(0, 6).map((item) => (
                                <span key={`${store.storeName}-${item}`} className="rounded-pill bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          <div className="mt-4 flex flex-wrap gap-2">
                            {hasLocation ? (
                              <>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${store.location.lat},${store.location.lng}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex min-h-[40px] items-center gap-2 rounded-pill bg-brand-green-600 px-4 py-2 text-sm font-semibold text-white"
                                >
                                  <MapPin className="h-4 w-4" aria-hidden="true" />
                                  Google Maps
                                </a>

                                <a
                                  href={`https://waze.com/ul?ll=${store.location.lat},${store.location.lng}&navigate=yes`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex min-h-[40px] items-center gap-2 rounded-pill border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-800"
                                >
                                  <Navigation className="h-4 w-4" aria-hidden="true" />
                                  Waze
                                </a>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  disabled
                                  className="inline-flex min-h-[40px] cursor-not-allowed items-center gap-2 rounded-pill bg-slate-300 px-4 py-2 text-sm font-semibold text-slate-600"
                                >
                                  <MapPin className="h-4 w-4" aria-hidden="true" />
                                  Google Maps
                                </button>

                                <button
                                  type="button"
                                  disabled
                                  className="inline-flex min-h-[40px] cursor-not-allowed items-center gap-2 rounded-pill border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-500"
                                >
                                  <Navigation className="h-4 w-4" aria-hidden="true" />
                                  Waze
                                </button>
                              </>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                ) : (
                  <EmptyState
                    title="No stores matched your filters"
                    description="Try a broader distance, remove Open now filter, or search by a nearby city."
                    actionLabel="Search again"
                    onAction={handleSearch}
                  />
                )}
              </div>

              <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
                <div className="surface-card">
                  <h2 className="font-display text-lg font-bold text-slate-900">Map Preview</h2>
                  {mapStore?.location && mapsApiKey ? (
                    <iframe
                      title="Store location map"
                      className="mt-3 h-64 w-full rounded-xl border border-slate-200"
                      loading="lazy"
                      src={`https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${mapStore.location.lat},${mapStore.location.lng}`}
                    />
                  ) : (
                    <div className="mt-3 flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 text-center text-sm text-slate-600">
                      Map placeholder. Add VITE_GOOGLE_MAPS_KEY to enable embedded map.
                    </div>
                  )}
                </div>

                {Array.isArray(results.recommendations) && results.recommendations.length ? (
                  <div className="surface-card">
                    <h2 className="font-display text-lg font-bold text-slate-900">Recommendations</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {results.recommendations.map((item) => (
                        <span key={item} className="rounded-pill bg-brand-yellow-100 px-3 py-1 text-xs font-semibold text-brand-yellow-900">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </aside>
            </section>
          ) : null}

          {!isLoading && !results ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <Store className="mx-auto h-10 w-10 text-brand-green-600" aria-hidden="true" />
              <h2 className="mt-3 font-display text-2xl font-bold text-slate-900">Ready to locate products?</h2>
              <p className="mt-2 text-sm text-slate-700">
                Start with a product name or use-case and we will suggest nearby stores and distributor options.
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </>
  )
}

export default ProductFinder
