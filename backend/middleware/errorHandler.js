const GENERIC_SERVER_ERROR = 'Something went wrong on our side. Please try again later.';

export function notFoundHandler(req, res) {
  res.status(404).json({
    code: 'NOT_FOUND',
    message: 'The requested endpoint was not found.',
  });
}

export function errorHandler(error, req, res, _next) {
  const statusCode = Number(error?.statusCode || error?.status || 500);
  const safeStatusCode = Number.isFinite(statusCode) && statusCode >= 400 && statusCode < 600
    ? statusCode
    : 500;

  if (safeStatusCode >= 500) {
    console.error(`[${req.traceId || 'no-trace-id'}]`, error);
  }

  res.status(safeStatusCode).json({
    code: error?.code || (safeStatusCode >= 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR'),
    message: safeStatusCode >= 500 ? GENERIC_SERVER_ERROR : (error?.message || 'Request failed.'),
    details: safeStatusCode >= 500 ? undefined : error?.details,
  });
}
