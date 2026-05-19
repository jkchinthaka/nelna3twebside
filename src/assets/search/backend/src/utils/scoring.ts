import type { Store, UserLocation } from "../types";

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

export function haversineDistance(a: UserLocation, b: UserLocation) {
  const earthRadiusKm = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const haversine =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
}

export function rankStoresByDistance(stores: Store[], location?: UserLocation) {
  if (!location) {
    return stores.map((store) => ({ store, distance: 0 }));
  }

  return stores
    .map((store) => ({ store, distance: haversineDistance(location, store.location) }))
    .sort((a, b) => a.distance - b.distance);
}
