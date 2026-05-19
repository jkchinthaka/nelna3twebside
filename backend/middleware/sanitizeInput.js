const UNSAFE_KEY_PATTERN = /^\$|\./;

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && value.constructor === Object;
}

function sanitizeValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (isPlainObject(value)) {
    const sanitized = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      if (UNSAFE_KEY_PATTERN.test(key)) {
        continue;
      }
      sanitized[key] = sanitizeValue(nestedValue);
    }
    return sanitized;
  }

  return value;
}

export function sanitizeInput(req, res, next) {
  req.body = sanitizeValue(req.body);
  req.query = sanitizeValue(req.query);
  req.params = sanitizeValue(req.params);
  next();
}
