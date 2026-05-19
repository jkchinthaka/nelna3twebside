import type { Product } from "../types";

const stopWords = new Set(["the", "a", "an", "and", "near", "in", "of"]);

function tokenize(text: string) {
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter((token) => token && !stopWords.has(token));
}

function scoreOverlap(queryTokens: string[], product: Product) {
  const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
  let score = 0;
  for (const token of queryTokens) {
    if (haystack.includes(token)) {
      score += 1;
    }
  }
  return score / Math.max(queryTokens.length, 1);
}

export function rankProducts(query: string, products: Product[]) {
  const tokens = tokenize(query);
  return products
    .map((product) => ({
      product,
      score: scoreOverlap(tokens, product)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
