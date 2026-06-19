const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i;

function normalizePath(value) {
  return String(value || '').trim().replace(/\s+/g, '');
}

import { hasAdminApiBackend, resolveApiBaseUrl } from '../utils/apiBackend.js';

export { hasAdminApiBackend, resolveApiBaseUrl };

export const API_BASE_URL = resolveApiBaseUrl();

function buildUrl(input) {
  const normalizedInput = normalizePath(input);

  if (ABSOLUTE_URL_PATTERN.test(normalizedInput)) {
    return normalizedInput;
  }

  if (normalizedInput.startsWith('/')) {
    return `${API_BASE_URL}${normalizedInput}`;
  }

  return `${API_BASE_URL}/${normalizedInput}`;
}

async function parseBody(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

function buildError(payload, status) {
  const envelope = payload && typeof payload === 'object' ? payload.error : null;
  const fallbackMessage = typeof payload === 'object' && payload ? payload.message : null;
  const error = new Error(
    envelope?.message || fallbackMessage || `Request failed (${status})`,
  );

  error.status = status;
  error.code = envelope?.code || payload?.code;
  error.details = envelope?.details || payload?.details;
  error.traceId = envelope?.traceId;

  return error;
}

export async function requestJson(input, options = {}) {
  const url = buildUrl(input);
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const payload = await parseBody(response);

  if (!response.ok) {
    throw buildError(payload, response.status);
  }

  return payload;
}

export function unwrapPayload(payload) {
  if (
    payload &&
    typeof payload === 'object' &&
    !Array.isArray(payload) &&
    payload.success === true &&
    Object.prototype.hasOwnProperty.call(payload, 'data')
  ) {
    return payload.data;
  }

  return payload;
}

export function unwrapCollection(payload) {
  const unwrapped = unwrapPayload(payload);

  if (Array.isArray(unwrapped)) {
    return unwrapped;
  }

  if (unwrapped && typeof unwrapped === 'object' && Array.isArray(unwrapped.items)) {
    return unwrapped.items;
  }

  return [];
}
