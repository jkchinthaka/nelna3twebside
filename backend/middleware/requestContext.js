import { randomUUID } from 'node:crypto';

export function requestContext(req, res, next) {
  req.traceId = randomUUID();
  res.setHeader('X-Trace-Id', req.traceId);
  next();
}
