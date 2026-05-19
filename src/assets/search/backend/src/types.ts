export type UserLocation = {
  lat: number;
  lng: number;
};

export type Product = {
  productCode: string;
  name: string;
  category: string;
  description: string;
  embedding: number[];
};

export type Store = {
  storeName: string;
  city: string;
  location: UserLocation;
  availableProducts: string[];
  embedding: number[];
  contact: string;
};

export type GeoPoint = {
  type: "Point";
  coordinates: [number, number];
};

export type ProductDocument = {
  productCode: string;
  name: string;
  category: string;
  description: string;
  embedding: number[];
};

export type StoreDocument = {
  storeName: string;
  city: string;
  location: GeoPoint;
  availableProducts: string[];
  embedding: number[];
  contact: string;
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
