function parseWithSchema(schema, value) {
  if (!schema) {
    return { success: true, data: value };
  }
  return schema.safeParse(value);
}

export function validateRequest({ body, params, query } = {}) {
  return (req, res, next) => {
    const bodyResult = parseWithSchema(body, req.body);
    const paramsResult = parseWithSchema(params, req.params);
    const queryResult = parseWithSchema(query, req.query);

    const details = {};

    if (!bodyResult.success) {
      details.body = bodyResult.error.flatten();
    }

    if (!paramsResult.success) {
      details.params = paramsResult.error.flatten();
    }

    if (!queryResult.success) {
      details.query = queryResult.error.flatten();
    }

    if (Object.keys(details).length > 0) {
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'One or more request fields are invalid.',
        details,
      });
    }

    req.body = bodyResult.data;
    req.params = paramsResult.data;
    req.query = queryResult.data;

    return next();
  };
}
