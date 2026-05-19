import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { products as mockProducts, stores as mockStores } from "../services/data";
import { getCollections } from "../db";
import { rankProducts } from "../services/ai";
import { getQueryEmbedding } from "../services/embeddings";
import { rankStoresByDistance } from "../utils/scoring";
import type { ProductDocument, ProductMatch, StoreMatch, StoreDocument, UserLocation } from "../types";

const router = Router();

type SearchFilters = {
  category?: "Frozen" | "Processed" | "All";
  maxDistanceKm?: number;
};

const searchSchema = z.object({
  query: z.string().min(1),
  userLocation: z
    .object({
      lat: z.number().finite(),
      lng: z.number().finite()
    })
    .optional(),
  filters: z
    .object({
      category: z.enum(["Frozen", "Processed", "All"]).optional(),
      maxDistanceKm: z.number().positive().max(200).optional()
    })
    .optional()
  ,
  pagination: z
    .object({
      productsLimit: z.number().int().min(1).max(50).optional(),
      storesLimit: z.number().int().min(1).max(50).optional(),
      productsOffset: z.number().int().min(0).optional(),
      storesOffset: z.number().int().min(0).optional()
    })
    .optional()
});

type CacheEntry = {
  createdAt: number;
  payload: unknown;
};

const cache = new Map<string, CacheEntry>();
const cacheTtlMs = 60_000;

function getCacheKey(query: string, userLocation?: UserLocation, filters?: SearchFilters) {
  return JSON.stringify({
    query: query.toLowerCase(),
    userLocation,
    filters
  });
}

router.post("/ai-search", async (req: Request, res: Response) => {
  const parsed = searchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid request", issues: parsed.error.flatten() });
    return;
  }

  const { query, userLocation, filters, pagination } = parsed.data as {
    query: string;
    userLocation?: UserLocation;
    filters?: SearchFilters;
    pagination?: {
      productsLimit?: number;
      storesLimit?: number;
      productsOffset?: number;
      storesOffset?: number;
    };
  };

  const cacheKey = getCacheKey(query, userLocation, { ...filters, ...pagination });
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < cacheTtlMs) {
    res.json(cached.payload);
    return;
  }

  const collections = await getCollections();
  let dbProducts: ProductDocument[] = collections
    ? await collections.products.find({}).toArray()
    : mockProducts;

  const dbStores: StoreDocument[] = collections
    ? await collections.stores.find({}).toArray()
    : mockStores.map((store) => ({
        ...store,
        location: {
          type: "Point",
          coordinates: [store.location.lng, store.location.lat]
        }
      }));

  const filteredProducts = filters?.category && filters.category !== "All"
    ? dbProducts.filter((product) => product.category === filters.category)
    : dbProducts;

  let productMatches: ProductMatch[] = [];
  const productsLimit = pagination?.productsLimit ?? 5;
  const productsOffset = pagination?.productsOffset ?? 0;

  if (collections) {
    try {
      const embedding = await getQueryEmbedding(query);
      if (embedding) {
        const results = await collections.products
          .aggregate<ProductDocument>([
            {
              $vectorSearch: {
                index: "products_vector_index",
                path: "embedding",
                queryVector: embedding,
                numCandidates: 100,
                limit: Math.max(productsLimit + productsOffset, 5)
              }
            },
            {
              $project: {
                productCode: 1,
                name: 1,
                category: 1,
                description: 1,
                score: { $meta: "vectorSearchScore" }
              }
            }
          ])
          .toArray();

        const filtered = filters?.category && filters.category !== "All"
          ? results.filter((product) => product.category === filters.category)
          : results;

        productMatches = filtered
          .slice(productsOffset, productsOffset + productsLimit)
          .map((product) => ({
          productCode: product.productCode,
          name: product.name,
          score: Number(((product as ProductDocument & { score?: number }).score ?? 0).toFixed(2))
          }));
      }
    } catch (error) {
      console.warn("Vector search failed, falling back to keyword ranking:", error);
    }
  }

  if (productMatches.length === 0) {
    productMatches = rankProducts(query, filteredProducts)
      .slice(productsOffset, productsOffset + productsLimit)
      .map<ProductMatch>(({ product, score }) => ({
          productCode: product.productCode,
          name: product.name,
          score: Number(score.toFixed(2))
        })
      );
  }

  const relevantProductCodes = new Set(productMatches.map((match) => match.productCode));
  const filteredStores = dbStores.filter((store) =>
    store.availableProducts.some((code) => relevantProductCodes.has(code))
  );

  const storesLimit = pagination?.storesLimit ?? 5;
  const storesOffset = pagination?.storesOffset ?? 0;

  const rankedStores = rankStoresByDistance(
    filteredStores.map((store) => ({
      ...store,
      location: {
        lat: store.location.coordinates[1],
        lng: store.location.coordinates[0]
      }
    })),
    userLocation
  )
    .filter(({ distance }) => {
      if (!filters?.maxDistanceKm || !userLocation) {
        return true;
      }
      return distance <= filters.maxDistanceKm;
    })
    .slice(storesOffset, storesOffset + storesLimit)
    .map<StoreMatch>(({ store, distance }) => ({
      storeName: store.storeName,
      distance: Number(distance.toFixed(2)),
      city: store.city,
      contact: store.contact,
      availableProducts: store.availableProducts.filter((code) => relevantProductCodes.has(code)),
      location: store.location
    }));

  const payload = {
    products: productMatches,
    stores: rankedStores,
    recommendations: productMatches.slice(0, 3).map((match) => match.name)
  };

  cache.set(cacheKey, { createdAt: Date.now(), payload });
  res.json(payload);
});

export default router;
