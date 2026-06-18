import type { StoreMatch } from "../types";

type MapPanelProps = {
  stores: StoreMatch[];
  view: "map" | "list";
  onViewChange: (view: "map" | "list") => void;
  apiKey?: string;
};

export default function MapPanel({ stores, view, onViewChange, apiKey }: MapPanelProps) {
  if (stores.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border-2 border-dashed border-nelna-dark-soft bg-nelna-white/50 p-6 text-sm text-nelna-dark/60 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
           <svg className="w-8 h-8 text-nelna-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7" /></svg>
           Search to view store locations on the map.
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-nelna-white p-6 shadow-xl shadow-nelna-dark/200/50">
       <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-24 h-24 text-brand-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
       </div>
      <div className="relative z-10 flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-nelna-dark">Map Highlights</h3>
        <div className="flex rounded-full bg-nelna-green-soft p-1 ring-1 ring-nelna-dark/200">
          <button
            type="button"
            onClick={() => onViewChange("map")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              view === "map" ? "bg-nelna-white text-brand-600 shadow-sm" : "text-nelna-dark/70 hover:text-nelna-dark/90"
            }`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              view === "list" ? "bg-nelna-white text-brand-600 shadow-sm" : "text-nelna-dark/70 hover:text-nelna-dark/90"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {view === "map" && apiKey ? (
        <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-nelna-dark/200 shadow-inner">
          <iframe
            title="Store map"
            className="h-64 w-full bg-nelna-green-soft"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${stores[0].location.lat},${stores[0].location.lng}`}
          />
        </div>
      ) : (
        <p className="mt-2 text-sm text-nelna-dark/70">
          Google Maps integration can be enabled by adding your API key. For now, use the quick
          links below to open the locations.
        </p>
      )}
      <ul className="mt-4 space-y-3 text-sm">
        {stores.map((store) => (
          <li key={store.storeName} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{store.storeName}</p>
              <p className="text-xs text-nelna-dark/60">
                {store.location.lat.toFixed(4)}, {store.location.lng.toFixed(4)}
              </p>
            </div>
            <a
              className="text-brand-600 font-semibold"
              href={`https://www.google.com/maps/search/?api=1&query=${store.location.lat},${store.location.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              Open
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
