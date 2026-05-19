
const stopWords = new Set(["the", "a", "an", "and", "near", "in", "of"]);

function tokenize(text) {
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter((token) => token && !stopWords.has(token));
}

function scoreOverlap(queryTokens, product) {
  const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
  let score = 0;
  for (const token of queryTokens) {
    if (haystack.includes(token)) {
      score += 1;
    }
  }
  return score / Math.max(queryTokens.length, 1);
}

export function rankProducts(query, products) {
  const tokens = tokenize(query);
  return products
    .map((product) => ({
      product,
      score: scoreOverlap(tokens, product)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

export function haversineDistance(a, b) {
  const earthRadiusKm = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const haversine =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
}

export function rankStoresByDistance(stores, location) {
  if (!location) {
    return stores.map((store) => ({ store, distance: 0 }));
  }

  return stores
    .map((store) => ({ store, distance: haversineDistance(location, store.location) }))
    .sort((a, b) => a.distance - b.distance);
}

const defaultModel = process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";

export async function getQueryEmbedding(input) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: defaultModel,
      input
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI embeddings error: ${errorText}`);
  }

  const payload = await response.json();
  return payload.data[0]?.embedding ?? null;
}
