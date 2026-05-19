import { describe, expect, it } from "vitest";
import { haversineDistance, rankStoresByDistance } from "./scoring";
import type { Store, UserLocation } from "../types";

const origin: UserLocation = { lat: 6.9271, lng: 79.8612 };

const stores: Store[] = [
  {
    storeName: "Store A",
    city: "Colombo",
    location: { lat: 6.9271, lng: 79.8612 },
    availableProducts: ["P1"],
    embedding: [],
    contact: "+94 11 000 0000"
  },
  {
    storeName: "Store B",
    city: "Kandy",
    location: { lat: 7.2906, lng: 80.6337 },
    availableProducts: ["P2"],
    embedding: [],
    contact: "+94 81 000 0000"
  }
];

describe("haversineDistance", () => {
  it("returns zero for identical points", () => {
    expect(haversineDistance(origin, origin)).toBeCloseTo(0, 5);
  });
});

describe("rankStoresByDistance", () => {
  it("sorts stores by ascending distance", () => {
    const ranked = rankStoresByDistance(stores, origin);
    expect(ranked[0].store.storeName).toBe("Store A");
    expect(ranked[1].store.storeName).toBe("Store B");
  });
});