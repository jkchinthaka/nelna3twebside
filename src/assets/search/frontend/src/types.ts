export type UserLocation = {
  lat: number;
  lng: number;
};

export type ProductMatch = {
  productCode: string;
  name: string;
  score: number;
};

export type StoreMatch = {
  storeName: string;
  distance: number;
  city: string;
  contact: string;
  availableProducts: string[];
  location: UserLocation;
};

export type SearchResponse = {
  products: ProductMatch[];
  stores: StoreMatch[];
  recommendations: string[];
};

export type SearchFilters = {
  category?: "Frozen" | "Processed" | "All";
  maxDistanceKm?: number;
};
