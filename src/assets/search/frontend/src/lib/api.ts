import type { SearchFilters, SearchResponse, UserLocation } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export async function searchProducts(
  query: string,
  userLocation?: UserLocation,
  filters?: SearchFilters
) {
  const response = await fetch(`${API_BASE}/api/ai-search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      userLocation,
      filters
    })
  });

  if (!response.ok) {
    throw new Error("Search request failed");
  }

  return (await response.json()) as SearchResponse;
}
