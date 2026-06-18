import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";
import MapPanel from "./components/MapPanel";
import Recommendations from "./components/Recommendations";
import { searchProducts } from "./lib/api";
import type { SearchFilters, SearchResponse, StoreMatch, UserLocation } from "./types";

export default function App() {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [stores, setStores] = useState<StoreMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapView, setMapView] = useState<"map" | "list">("map");
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY as string | undefined;

  const handleSearch = async (
    query: string,
    location?: UserLocation,
    filters?: SearchFilters
  ) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await searchProducts(query, location, filters);
      setResults(response);
      setStores(response.stores);
    } catch (err) {
      setError("Unable to complete search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nelna-white">
      <div className="hero-pattern absolute inset-0 z-0 h-[500px] w-full opacity-30" />
      
      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-nelna-white font-bold text-xl shadow-lg shadow-brand-200">N</span>
            <div>
               <h1 className="font-heading text-xl font-bold tracking-tight text-nelna-dark">Nelna</h1>
               <p className="text-xs text-nelna-dark/70 font-medium tracking-wider uppercase">Product Finder</p>
            </div>
          </div>
          <div className="rounded-full bg-nelna-white px-4 py-1.5 text-xs font-bold text-brand-700 shadow-sm ring-1 ring-nelna-dark/100">
            MVP 1.0
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6">
        <div className={`transition-all duration-500 ease-in-out ${results ? 'translate-y-0' : 'translate-y-[10vh]'}`}>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-nelna-green-dark100 bg-nelna-green-soft50 p-4 text-center text-sm text-nelna-green-dark600 shadow-sm">
            {error}
          </div>
        )}

        {results && (
          <section className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="flex items-baseline justify-between mb-6">
                <h2 className="font-heading text-2xl font-bold text-nelna-dark">Search Results</h2>
                <span className="text-sm text-nelna-dark/70">{stores.length} stores found found nearby</span>
             </div>

            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-6">
                <div className="rounded-3xl bg-nelna-green-soft p-8">
                  <h3 className="mb-4 text-lg font-bold text-nelna-dark flex items-center gap-2">
                     <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                     Best Product Matches
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {results.products.map((product) => (
                      <div
                        key={product.productCode}
                        className="group relative overflow-hidden rounded-2xl bg-nelna-white p-5 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                           <svg className="w-12 h-12 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{product.productCode}</p>
                        <p className="mt-1 font-heading font-bold text-nelna-dark">{product.name}</p>
                        <div className="mt-3 flex items-center gap-2">
                           <div className="h-1.5 flex-1 rounded-full bg-nelna-green-soft overflow-hidden">
                              <div className="h-full bg-brand-500 rounded-full" style={{ width: `${product.score * 100}%` }} />
                           </div>
                           <span className="text-xs font-medium text-nelna-dark/70">{(product.score * 100).toFixed(0)}% Match</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {stores.length > 0 ? (
                     stores.map((store) => (
                        <ResultCard key={store.storeName} store={store} />
                      ))
                  ) : (
                     <div className="text-center py-12 rounded-3xl border-2 border-dashed border-nelna-dark-soft">
                        <p className="text-nelna-dark/60">No stores found with these items nearby.</p>
                     </div>
                  )}
                </div>
              </div>

              <div className="space-y-6 lg:sticky lg:top-8 lg:h-fit">
                <MapPanel
                  stores={stores}
                  view={mapView}
                  onViewChange={setMapView}
                  apiKey={mapsApiKey}
                />
                <Recommendations items={results.recommendations} />
              </div>
            </div>
          </section>
        )}

        {!results && (
          <div className="mt-20 text-center">
             <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm text-orange-700 ring-1 ring-inset ring-orange-600/20 mb-8">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
               </span>
               MVP Database & AI Active
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="aspect-video client-logo bg-nelna-green-soft rounded-xl" />
                <div className="aspect-video client-logo bg-nelna-green-soft rounded-xl" />
                <div className="aspect-video client-logo bg-nelna-green-soft rounded-xl" />
                <div className="aspect-video client-logo bg-nelna-green-soft rounded-xl" />
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
