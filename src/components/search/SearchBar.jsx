
import { useState } from "react";
import { Search, MapPin, Navigation, Filter, ChevronDown, Crosshair } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(undefined);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("All");
  const [maxDistanceKm, setMaxDistanceKm] = useState(10);

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser.");
      return;
    }

    setStatus("Fetching your location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setLocation(next);
        setStatus("Location captured.");
      },
      () => {
        setStatus("Unable to retrieve your location.");
      }
    );
  };

  const handleSearch = () => {
    if (!location && navigator.geolocation) {
      setStatus("Fetching your location...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const next = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocation(next);
          setStatus("Location captured.");
          onSearch(query, next, { category, maxDistanceKm });
        },
        () => {
          setStatus("Unable to retrieve your location. Searching without location.");
          onSearch(query, undefined, { category, maxDistanceKm });
        }
      );
      return;
    }

    onSearch(query, location, { category, maxDistanceKm });
  };

  return (
    <div className="relative z-30 mx-auto w-full max-w-3xl">
      <div className="rounded-[2rem] bg-white p-6 md:p-8 shadow-2xl shadow-slate-200/50 border border-white/50 ring-1 ring-slate-100">
        
        {/* Search Input Group */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400 group-focus-within:text-brand-green-600 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Try 'Chicken sausages in Colombo'..."
            className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 py-4 pl-14 pr-4 text-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-green-500 focus:ring-4 focus:ring-brand-green-500/10 transition-all outline-none shadow-inner"
          />
        </div>

        {/* Filters & Location Row */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Location Button */}
          <button
            type="button"
            onClick={handleLocation}
            className={`col-span-1 md:col-span-4 flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                status === "Location captured." 
                ? "bg-brand-green-50 border-brand-green-200 text-brand-green-700" 
                : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:border-slate-200"
            }`}
          >
            {status === "Location captured." ? (
                <Navigation className="w-4 h-4 text-brand-green-600" />
            ) : (
                <Crosshair className="w-4 h-4 text-slate-500" />
            )}
            <span>{status === "Location captured." ? "Location Set" : "Use Current Location"}</span>
          </button>
          
          {/* Filters */}
          <div className="col-span-1 md:col-span-5 flex gap-2">
            <div className="relative flex-1">
                <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full appearance-none rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 focus:border-brand-green-500 focus:ring-0 outline-none"
                >
                <option value="All">All Categories</option>
                <option value="Frozen">Frozen</option>
                <option value="Processed">Processed</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            
            <div className="relative w-28">
                <select
                value={maxDistanceKm}
                onChange={(event) => setMaxDistanceKm(Number(event.target.value))}
                className="w-full appearance-none rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 focus:border-brand-green-500 focus:ring-0 outline-none"
                >
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={20}>20 km</option>
                <option value={50}>50 km</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Search Action */}
          <div className="col-span-1 md:col-span-3">
             <button
                onClick={() => handleSearch()} 
                disabled={isLoading}
                className="w-full h-full min-h-[48px] rounded-xl bg-brand-green-500 text-sm font-bold text-white shadow-lg shadow-brand-green-900/20 hover:bg-brand-green-500 hover:brightness-95 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Search...</span>
                    </>
                ) : (
                    <>
                    <span>Find</span>
                    <Search className="w-4 h-4" />
                    </>
                )}
            </button>
          </div>

        </div>
        
        {status && status !== "Location captured." && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-400 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                {status}
            </div>
        )}
      </div>
    </div>
  );
}
