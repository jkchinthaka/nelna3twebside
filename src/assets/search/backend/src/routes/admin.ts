import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { getCollections } from "../db";
import type { GeoPoint } from "../types";

const router = Router();

function requireApiKey(req: Request, res: Response, next: () => void) {
  const apiKey = process.env.ADMIN_API_KEY;
  const headerKey = req.header("x-api-key");

  if (!apiKey || !headerKey || headerKey !== apiKey) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
}

const productSchema = z.object({
  productCode: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(["Frozen", "Processed"]),
  description: z.string().min(1),
  embedding: z.array(z.number()).min(1)
});

const storeSchema = z.object({
  storeName: z.string().min(1),
  city: z.string().min(1),
  location: z.object({
    lat: z.number().finite(),
    lng: z.number().finite()
  }),
  availableProducts: z.array(z.string()).min(1),
  embedding: z.array(z.number()).min(1),
  contact: z.string().min(1)
});

router.use(requireApiKey);

router.get("/products", async (_req, res) => {
  const collections = await getCollections();
  if (!collections) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  const products = await collections.products.find({}).toArray();
  res.json(products);
});

router.post("/products", async (req, res) => {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid product", issues: parsed.error.flatten() });
    return;
  }

  const collections = await getCollections();
  if (!collections) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  await collections.products.insertOne(parsed.data);
  res.status(201).json({ message: "Product created" });
});

router.put("/products/:productCode", async (req, res) => {
  const parsed = productSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid product", issues: parsed.error.flatten() });
    return;
  }

  const collections = await getCollections();
  if (!collections) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  const result = await collections.products.updateOne(
    { productCode: req.params.productCode },
    { $set: parsed.data }
  );

  res.json({ updated: result.modifiedCount });
});

router.delete("/products/:productCode", async (req, res) => {
  const collections = await getCollections();
  if (!collections) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  const result = await collections.products.deleteOne({ productCode: req.params.productCode });
  res.json({ deleted: result.deletedCount });
});

router.get("/stores", async (_req, res) => {
  const collections = await getCollections();
  if (!collections) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  const stores = await collections.stores.find({}).toArray();
  res.json(stores);
});

router.post("/stores", async (req, res) => {
  const parsed = storeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid store", issues: parsed.error.flatten() });
    return;
  }

  const collections = await getCollections();
  if (!collections) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  const geoPoint: GeoPoint = {
    type: "Point",
    coordinates: [parsed.data.location.lng, parsed.data.location.lat]
  };

  await collections.stores.insertOne({
    ...parsed.data,
    location: geoPoint
  });

  res.status(201).json({ message: "Store created" });
});

router.put("/stores/:storeName", async (req, res) => {
  const parsed = storeSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid store", issues: parsed.error.flatten() });
    return;
  }

  const collections = await getCollections();
  if (!collections) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  const updateDoc = { ...parsed.data } as Record<string, unknown>;
  if (parsed.data.location) {
    updateDoc.location = {
      type: "Point",
      coordinates: [parsed.data.location.lng, parsed.data.location.lat]
    } satisfies GeoPoint;
  }

  const result = await collections.stores.updateOne(
    { storeName: req.params.storeName },
    { $set: updateDoc }
  );

  res.json({ updated: result.modifiedCount });
});

router.delete("/stores/:storeName", async (req, res) => {
  const collections = await getCollections();
  if (!collections) {
    res.status(503).json({ message: "Database not configured" });
    return;
  }

  const result = await collections.stores.deleteOne({ storeName: req.params.storeName });
  res.json({ deleted: result.deletedCount });
});

export default router;