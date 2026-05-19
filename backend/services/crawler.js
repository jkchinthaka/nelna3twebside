import crypto from 'crypto';
import * as cheerio from 'cheerio';

const DEFAULT_USER_AGENT = 'NelnaSiteHealthBot/1.0 (+https://nelna.lk)';
const DEFAULT_TIMEOUT = 20000;

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    const normalized = parsed.toString().replace(/\/$/, '');
    return normalized;
  } catch {
    return null;
  }
}

function isHttpUrl(url) {
  return /^https?:/i.test(url);
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || DEFAULT_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'user-agent': DEFAULT_USER_AGENT,
        ...(options.headers || {}),
      },
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

function extractSchemaTypes($) {
  const types = new Set();
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).text());
      const items = Array.isArray(json) ? json : [json];
      items.forEach((item) => {
        if (item && item['@type']) {
          if (Array.isArray(item['@type'])) {
            item['@type'].forEach((t) => types.add(String(t)));
          } else {
            types.add(String(item['@type']));
          }
        }
      });
    } catch {
      // ignore invalid JSON-LD
    }
  });
  return Array.from(types);
}

function extractLinks($, baseUrl, origin) {
  const links = new Set();
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    try {
      const resolved = new URL(href, baseUrl).toString();
      const normalized = normalizeUrl(resolved);
      if (!normalized) return;
      const parsed = new URL(normalized);
      if (parsed.origin === origin && isHttpUrl(parsed.toString())) {
        links.add(normalized);
      }
    } catch {
      // ignore invalid URLs
    }
  });
  return Array.from(links);
}

function extractImageAlts($, baseUrl) {
  const missingAlt = [];
  $('img').each((_, el) => {
    const alt = $(el).attr('alt');
    const src = $(el).attr('src');
    if (!alt || !alt.trim()) {
      if (src) {
        try {
          missingAlt.push(new URL(src, baseUrl).toString());
        } catch {
          missingAlt.push(src);
        }
      } else {
        missingAlt.push('inline-image');
      }
    }
  });
  return missingAlt;
}

function scoreContent({ title, description, h1 }) {
  let score = 100;
  if (!title) score -= 40;
  if (title && (title.length < 20 || title.length > 70)) score -= 10;
  if (!description) score -= 25;
  if (description && (description.length < 50 || description.length > 160)) score -= 10;
  if (!h1) score -= 25;
  return Math.max(0, Math.min(100, score));
}

function scoreTechnical({ canonical, missingAltCount, brokenLinksCount }) {
  let score = 100;
  if (!canonical) score -= 15;
  if (missingAltCount > 0) score -= Math.min(20, missingAltCount * 2);
  if (brokenLinksCount > 0) score -= Math.min(30, brokenLinksCount * 5);
  return Math.max(0, Math.min(100, score));
}

async function checkBrokenLinks(links, limit = 20) {
  const broken = [];
  const subset = links.slice(0, limit);
  for (const link of subset) {
    try {
      const response = await fetchWithTimeout(link, { method: 'HEAD' });
      if (!response.ok) {
        broken.push(`${link} (${response.status})`);
      }
    } catch {
      broken.push(`${link} (unreachable)`);
    }
  }
  return broken;
}

async function checkRobotsAndSitemap(baseUrl) {
  const results = { robotsOk: true, sitemapOk: true };
  const robotsUrl = new URL('/robots.txt', baseUrl).toString();
  const sitemapUrl = new URL('/sitemap.xml', baseUrl).toString();

  try {
    const robotsResponse = await fetchWithTimeout(robotsUrl);
    if (!robotsResponse.ok) results.robotsOk = false;
  } catch {
    results.robotsOk = false;
  }

  try {
    const sitemapResponse = await fetchWithTimeout(sitemapUrl);
    if (!sitemapResponse.ok) results.sitemapOk = false;
  } catch {
    results.sitemapOk = false;
  }

  return results;
}

async function getPageSpeedMetrics(url, apiKey) {
  if (!apiKey) return null;
  const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile`;
  try {
    const response = await fetchWithTimeout(psiUrl, { timeout: 30000 });
    if (!response.ok) return null;
    const data = await response.json();
    const lighthouse = data.lighthouseResult;
    if (!lighthouse) return null;

    const audits = lighthouse.audits || {};
    const perfScore = lighthouse.categories?.performance?.score;

    return {
      performanceScore: typeof perfScore === 'number' ? Math.round(perfScore * 100) : null,
      lcp: audits['largest-contentful-paint']?.numericValue ?? null,
      cls: audits['cumulative-layout-shift']?.numericValue ?? null,
      inp: audits['interaction-to-next-paint']?.numericValue ?? null,
      ttfb: audits['server-response-time']?.numericValue ?? null,
      speedIndex: audits['speed-index']?.numericValue ?? null,
    };
  } catch {
    return null;
  }
}

export async function crawlSite({
  baseUrl,
  maxPages = 50,
  maxDepth = 2,
  apiKey,
}) {
  const normalizedBase = normalizeUrl(baseUrl);
  if (!normalizedBase) {
    throw new Error('Invalid base URL');
  }

  const origin = new URL(normalizedBase).origin;
  const queue = [{ url: normalizedBase, depth: 0 }];
  const visited = new Set();
  const pages = [];

  const siteChecks = await checkRobotsAndSitemap(normalizedBase);

  while (queue.length > 0 && pages.length < maxPages) {
    const { url, depth } = queue.shift();
    const normalized = normalizeUrl(url);
    if (!normalized || visited.has(normalized)) continue;

    visited.add(normalized);

    let html = '';
    let status = 0;
    try {
      const response = await fetchWithTimeout(normalized);
      status = response.status;
      if (!response.ok) {
        pages.push({
          url: normalized,
          status,
          error: `HTTP ${status}`,
          issues: [
            {
              type: 'http_status',
              severity: 'red',
              message: `Page returned HTTP ${status}`,
            },
          ],
        });
        continue;
      }
      html = await response.text();
    } catch (error) {
      pages.push({
        url: normalized,
        status,
        error: error?.message || 'Fetch error',
        issues: [
          {
            type: 'fetch_error',
            severity: 'red',
            message: `Failed to fetch page: ${error?.message || 'Unknown error'}`,
          },
        ],
      });
      continue;
    }

    const $ = cheerio.load(html);
    const title = $('title').first().text().trim();
    const description = $('meta[name="description"]').attr('content')?.trim();
    const canonical = $('link[rel="canonical"]').attr('href')?.trim();
    const h1 = $('h1').first().text().trim();
    const h1Count = $('h1').length;
    const h2 = $('h2').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const missingAlt = extractImageAlts($, normalized);
    const schemaTypes = extractSchemaTypes($);
    const links = extractLinks($, normalized, origin);
    const brokenLinks = await checkBrokenLinks(links);

    const contentHash = crypto.createHash('sha256').update(html).digest('hex');
    const psiMetrics = await getPageSpeedMetrics(normalized, apiKey);

    const issues = [];

    if (!title) {
      issues.push({
        type: 'title_missing',
        severity: 'red',
        message: 'Missing title tag',
      });
    } else if (title.length < 20 || title.length > 70) {
      issues.push({
        type: 'title_length',
        severity: 'yellow',
        message: `Title length is ${title.length} characters`,
        evidence: title,
      });
    }

    if (!description) {
      issues.push({
        type: 'meta_description_missing',
        severity: 'yellow',
        message: 'Missing meta description',
      });
    } else if (description.length < 50 || description.length > 160) {
      issues.push({
        type: 'meta_description_length',
        severity: 'yellow',
        message: `Meta description length is ${description.length} characters`,
        evidence: description,
      });
    }

    if (!h1) {
      issues.push({
        type: 'h1_missing',
        severity: 'red',
        message: 'Missing H1 heading',
      });
    } else if (h1Count > 1) {
      issues.push({
        type: 'multiple_h1',
        severity: 'yellow',
        message: `Page has ${h1Count} H1 headings`,
      });
    }

    if (!canonical) {
      issues.push({
        type: 'canonical_missing',
        severity: 'yellow',
        message: 'Missing canonical link tag',
      });
    }

    if (missingAlt.length > 0) {
      issues.push({
        type: 'image_alt_missing',
        severity: missingAlt.length > 5 ? 'red' : 'yellow',
        message: `${missingAlt.length} images missing alt text`,
      });
    }

    if (brokenLinks.length > 0) {
      issues.push({
        type: 'broken_links',
        severity: 'red',
        message: `${brokenLinks.length} broken internal links detected`,
      });
    }

    const contentScore = scoreContent({ title, description, h1 });
    const technicalScore = scoreTechnical({
      canonical,
      missingAltCount: missingAlt.length,
      brokenLinksCount: brokenLinks.length,
    });

    const performanceScore = psiMetrics?.performanceScore ?? 0;

    pages.push({
      url: normalized,
      status,
      htmlMeta: {
        title,
        description,
        h1,
        h2,
        canonical,
      },
      images: {
        missingAlt,
        oversized: [],
      },
      links: {
        broken: brokenLinks,
      },
      schemaTypes,
      contentHash,
      scores: {
        content: contentScore,
        technical: technicalScore,
        performance: performanceScore,
      },
      metrics: {
        lcp: psiMetrics?.lcp ?? null,
        cls: psiMetrics?.cls ?? null,
        inp: psiMetrics?.inp ?? null,
        ttfb: psiMetrics?.ttfb ?? null,
        speedIndex: psiMetrics?.speedIndex ?? null,
      },
      issues,
    });

    if (depth < maxDepth) {
      links.forEach((link) => {
        const normalizedLink = normalizeUrl(link);
        if (!normalizedLink) return;
        if (!visited.has(normalizedLink)) {
          queue.push({ url: normalizedLink, depth: depth + 1 });
        }
      });
    }
  }

  return { pages, siteChecks };
}
