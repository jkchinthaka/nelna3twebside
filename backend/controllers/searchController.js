
import { products as mockProducts, stores as mockStores } from "../services/searchMockData.js";
import { rankProducts, rankStoresByDistance } from "../services/aiSearchService.js";
// import { getQueryEmbedding } from "../services/aiSearchService.js"; // Unused for now as we don't have DB vector search enabled in MVP setup

const cache = new Map();
const cacheTtlMs = 60_000;

function getCacheKey(query, userLocation, filters) {
  return JSON.stringify({
    query: query.toLowerCase(),
    userLocation,
    filters
  });
}

export const aiSearch = async (req, res) => {
  const { query, userLocation, filters, pagination } = req.body;

  const cacheKey = getCacheKey(query, userLocation, { ...filters, ...pagination });
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < cacheTtlMs) {
    res.json(cached.payload);
    return;
  }

  // Use mock data for now, as per original project structure
  let dbProducts = mockProducts;
  let dbStores = mockStores.map((store) => ({
    ...store,
    location: {
      type: "Point",
      coordinates: [store.location.lng, store.location.lat]
    }
  }));

  const filteredProducts = filters?.category && filters.category !== "All"
    ? dbProducts.filter((product) => product.category === filters.category)
    : dbProducts;

  // Rank products using basic keyword overlap (AI fallback)
  const rankedProducts = rankProducts(query, filteredProducts);

  // Filter stores (dummy logic based on available products)
  const relevantProductCodes = new Set(rankedProducts.map((p) => p.product.productCode));
  const relevantStores = dbStores.filter((store) =>
    store.availableProducts.some((code) => relevantProductCodes.has(code))
  );

  // Rank stores by distance
  const rankedStores = rankStoresByDistance(
    relevantStores.map((store) => ({
      ...store,
      location: {
        lat: store.location.coordinates[1],
        lng: store.location.coordinates[0]
      }
    })),
    userLocation
  );

  const payload = {
    products: rankedProducts,
    stores: rankedStores.map(({ store, distance }) => ({
      ...store,
      distance
    })),
    debug: {
      source: "mock-keyword-search",
      query,
      location: userLocation
    }
  };

  cache.set(cacheKey, { createdAt: Date.now(), payload });
  res.json(payload);
};
