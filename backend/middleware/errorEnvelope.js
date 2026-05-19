function statusCodeToErrorCode(statusCode) {
  if (statusCode === 400) return 'BAD_REQUEST';
  if (statusCode === 401) return 'UNAUTHORIZED';
  if (statusCode === 403) return 'FORBIDDEN';
  if (statusCode === 404) return 'NOT_FOUND';
  if (statusCode === 409) return 'CONFLICT';
  if (statusCode === 429) return 'RATE_LIMITED';
  return 'INTERNAL_ERROR';
}

export function errorEnvelope(req, res, next) {
  const originalJson = res.json.bind(res);

  res.json = (payload) => {
    const isErrorResponse = res.statusCode >= 400;
    if (!isErrorResponse || (payload && payload.error)) {
      return originalJson(payload);
    }

    const isObjectPayload = Boolean(payload) && typeof payload === 'object' && !Array.isArray(payload);
    const message =
      (isObjectPayload && (payload.message || payload.errorMessage)) ||
      (typeof payload === 'string' ? payload : 'Request failed.');

    const details = isObjectPayload ? payload.details || payload.issues : undefined;
    const code = (isObjectPayload && payload.code) || statusCodeToErrorCode(res.statusCode);

    return originalJson({
      error: {
        code,
        message,
        details,
        traceId: req.traceId,
      },
    });
  };

  next();
}
