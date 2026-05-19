import { describe, expect, it } from "vitest";
import { rankProducts } from "./ai";
import type { Product } from "../types";

const sampleProducts: Product[] = [
  {
    productCode: "P1",
    name: "Chicken Sausages",
    category: "Processed",
    description: "Spicy sausages",
    embedding: []
  },
  {
    productCode: "P2",
    name: "Frozen Nuggets",
    category: "Frozen",
    description: "Crispy nuggets",
    embedding: []
  }
];

describe("rankProducts", () => {
  it("ranks more relevant items higher", () => {
    const results = rankProducts("chicken sausages", sampleProducts);
    expect(results[0].product.productCode).toBe("P1");
    expect(results[0].score).toBeGreaterThan(0);
  });
});