import mongoose from 'mongoose';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function isV2Request(req) {
  return String(req.originalUrl || '').startsWith('/api/v2');
}

function parseLimit(rawLimit, defaultLimit) {
  const parsed = Number(rawLimit);
  if (!Number.isFinite(parsed)) {
    return defaultLimit;
  }
  const normalized = Math.trunc(parsed);
  if (normalized < 1) {
    return 1;
  }
  if (normalized > MAX_LIMIT) {
    return MAX_LIMIT;
  }
  return normalized;
}

function parseCursor(rawCursor) {
  if (!rawCursor) {
    return null;
  }
  if (!mongoose.Types.ObjectId.isValid(rawCursor)) {
    const error = new Error('Invalid cursor value.');
    error.statusCode = 400;
    error.code = 'INVALID_CURSOR';
    throw error;
  }
  return new mongoose.Types.ObjectId(rawCursor);
}

function shouldUseCursor(req) {
  return isV2Request(req) || Boolean(req.query?.cursor) || Boolean(req.query?.limit);
}

export async function sendCollection({
  req,
  res,
  model,
  filter = {},
  sort = { _id: -1 },
  mapDoc = (doc) => doc,
  defaultLimit = DEFAULT_LIMIT,
}) {
  if (!shouldUseCursor(req)) {
    const docs = await model.find(filter).sort(sort);
    return res.json(docs.map(mapDoc));
  }

  const limit = parseLimit(req.query?.limit, defaultLimit);
  const cursor = parseCursor(req.query?.cursor);
  const query = { ...filter };
  const direction = sort._id === 1 ? 1 : -1;

  if (cursor) {
    query._id = direction === 1 ? { $gt: cursor } : { $lt: cursor };
  }

  const docs = await model
    .find(query)
    .sort(sort)
    .limit(limit + 1);

  const hasMore = docs.length > limit;
  const items = hasMore ? docs.slice(0, limit) : docs;
  const nextCursor = hasMore && items.length > 0
    ? items[items.length - 1]._id.toString()
    : null;

  return res.json({
    items: items.map(mapDoc),
    pageInfo: {
      limit,
      hasMore,
      nextCursor,
    },
    meta: {
      apiVersion: isV2Request(req) ? 'v2' : 'v1',
    },
  });
}
