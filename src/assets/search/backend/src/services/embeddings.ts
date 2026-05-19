const defaultModel = process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";

type EmbeddingResponse = {
  data: Array<{ embedding: number[] }>;
};

export async function getQueryEmbedding(input: string) {
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

  const payload = (await response.json()) as EmbeddingResponse;
  return payload.data[0]?.embedding ?? null;
}