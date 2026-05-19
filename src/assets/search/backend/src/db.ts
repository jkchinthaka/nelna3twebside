import { MongoClient, type Collection, type Db } from "mongodb";
import type { ProductDocument, StoreDocument } from "./types";

let client: MongoClient | null = null;
let database: Db | null = null;

const dbName = process.env.MONGODB_DB ?? "nelna";

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    database = client.db(dbName);
  }

  return database;
}

export async function getCollections() {
  const db = await connectToDatabase();
  if (!db) {
    return null;
  }

  return {
    products: db.collection<ProductDocument>("products"),
    stores: db.collection<StoreDocument>("stores")
  };
}

export async function ensureIndexes() {
  const collections = await getCollections();
  if (!collections) {
    return;
  }

  await collections.stores.createIndex({ location: "2dsphere" });

  try {
    await collections.products.createSearchIndex({
      name: "products_vector_index",
      definition: {
        fields: [
          {
            type: "vector",
            path: "embedding",
            numDimensions: 1536,
            similarity: "cosine"
          }
        ]
      }
    });
  } catch (error) {
    console.warn("Vector index creation skipped or failed:", (error as Error).message);
  }
}