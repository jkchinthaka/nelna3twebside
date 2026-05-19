import { useState } from "react";
import type { SearchFilters, UserLocation } from "../types";

type SearchBarProps = {
  onSearch: (query: string, location?: UserLocation, filters?: SearchFilters) => void;
  isLoading: boolean;
};

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<UserLocation | undefined>(undefined);
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<SearchFilters["category"]>("All");
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(10);

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
    <div className="relative z-10 mx-auto w-full max-w-2xl transform transition-all">
      <div className="rounded-3xl bg-white/80 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:bg-slate-900/80">
        <div className="mb-4 text-center">
          <h2 className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent font-heading">
            Find Nelna, Anywhere.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Smart location-based product discovery powered by AI.
          </p>
        </div>

        <div className="relative">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Try 'Chicken sausages in Colombo'..."
            className="w-full rounded-2xl border-0 bg-slate-100 py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-500 sm:text-sm sm:leading-6 shadow-inner"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleLocation}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
          >
            <svg className="h-5 w-5 text-brand-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.003.002.001.003.001a.75.75 0 00.014-.003zM10 6a3 3 0 110 6 3 3 0 010-6z" clipRule="evenodd" />
            </svg>
            Current Location
          </button>
          
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as SearchFilters["category"])}
              className="flex-1 rounded-xl border-0 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Categories</option>
              <option value="Frozen">Frozen</option>
              <option value="Processed">Processed</option>
            </select>
            
            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading || query.trim().length === 0}
              className="flex-1 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-500 hover:shadow-brand-500/50 disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
           <div className="flex justify-between items-center text-xs font-medium text-slate-500">
              <span>Search Radius</span>
              <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">{maxDistanceKm} km</span>
           </div>
           <input
            type="range"
            min={2}
            max={50}
            step={1}
            value={maxDistanceKm}
            onChange={(event) => setMaxDistanceKm(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-brand-600"
          />
        </div>

        {status && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
