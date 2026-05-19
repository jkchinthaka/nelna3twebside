import Audit from '../models/auditModel.js';
import Page from '../models/pageModel.js';
import PageAudit from '../models/pageAuditModel.js';
import Issue from '../models/issueModel.js';
import Site from '../models/siteModel.js';
import { crawlSite } from '../services/crawler.js';

function summarizeIssues(issues = []) {
  return issues.reduce(
    (acc, issue) => {
      acc.total += 1;
      acc[issue.severity] = (acc[issue.severity] || 0) + 1;
      return acc;
    },
    { total: 0, red: 0, yellow: 0, green: 0 }
  );
}

const runAudit = async (req, res) => {
  try {
    const { siteId } = req.params;
    const { maxPages, maxDepth } = req.body || {};
    const site = await Site.findById(siteId);

    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const audit = await Audit.create({
      siteId: site._id,
      runId,
      status: 'running',
      startedAt: new Date(),
    });

    const { pages, siteChecks } = await crawlSite({
      baseUrl: site.baseUrl,
      maxPages: Number(maxPages) || 50,
      maxDepth: Number(maxDepth) || 2,
      apiKey: process.env.PAGESPEED_API_KEY,
    });

    const pageAudits = [];
    const allIssues = [];

    for (const page of pages) {
      const pageDoc = await Page.findOneAndUpdate(
        { siteId: site._id, url: page.url },
        { siteId: site._id, url: page.url, lastCrawledAt: new Date() },
        { upsert: true, new: true }
      );

      const pageAudit = await PageAudit.create({
        auditId: audit._id,
        pageId: pageDoc._id,
        url: page.url,
        scores: page.scores || { technical: 0, performance: 0, content: 0 },
        metrics: page.metrics || {},
        htmlMeta: page.htmlMeta || {},
        images: page.images || { missingAlt: [], oversized: [] },
        links: page.links || { broken: [] },
        schemaTypes: page.schemaTypes || [],
        contentHash: page.contentHash || null,
      });

      pageAudits.push(pageAudit);

      if (page.issues && page.issues.length > 0) {
        page.issues.forEach((issue) => {
          allIssues.push({
            auditId: audit._id,
            pageId: pageDoc._id,
            type: issue.type,
            severity: issue.severity || 'yellow',
            message: issue.message,
            evidence: issue.evidence,
          });
        });
      }
    }

    if (!siteChecks.robotsOk) {
      allIssues.push({
        auditId: audit._id,
        type: 'robots_missing',
        severity: 'yellow',
        message: 'robots.txt not found or unreachable',
      });
    }

    if (!siteChecks.sitemapOk) {
      allIssues.push({
        auditId: audit._id,
        type: 'sitemap_missing',
        severity: 'yellow',
        message: 'sitemap.xml not found or unreachable',
      });
    }

    if (allIssues.length > 0) {
      await Issue.insertMany(allIssues);
    }

    const scores = pageAudits.reduce(
      (acc, item) => {
        acc.technical += item.scores?.technical || 0;
        acc.performance += item.scores?.performance || 0;
        acc.content += item.scores?.content || 0;
        return acc;
      },
      { technical: 0, performance: 0, content: 0 }
    );

    const divisor = pageAudits.length || 1;
    const technicalScore = Math.round(scores.technical / divisor);
    const performanceScore = Math.round(scores.performance / divisor);
    const contentScore = Math.round(scores.content / divisor);
    const overallScore = Math.round((technicalScore + performanceScore + contentScore) / 3);

    audit.status = 'completed';
    audit.finishedAt = new Date();
    audit.overallScore = overallScore;
    audit.technicalScore = technicalScore;
    audit.performanceScore = performanceScore;
    audit.contentScore = contentScore;
    audit.notes = siteChecks.robotsOk && siteChecks.sitemapOk ? '' : 'Robots or sitemap missing';
    await audit.save();

    const issues = await Issue.find({ auditId: audit._id }).sort({ createdAt: -1 }).limit(25);
    const summary = summarizeIssues(issues);

    res.json({
      audit,
      stats: {
        pagesAudited: pageAudits.length,
        issues: summary,
      },
      latestIssues: issues,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Audit failed' });
  }
};

const listAuditsForSite = async (req, res) => {
  try {
    const { siteId } = req.params;
    const audits = await Audit.find({ siteId }).sort({ createdAt: -1 }).limit(50);
    res.json(audits);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch audits' });
  }
};

const getLatestAuditForSite = async (req, res) => {
  try {
    const { siteId } = req.params;
    const audit = await Audit.findOne({ siteId }).sort({ createdAt: -1 });

    if (!audit) {
      return res.json({ audit: null, stats: null, latestIssues: [] });
    }

    const issues = await Issue.find({ auditId: audit._id }).sort({ createdAt: -1 }).limit(25);
    const pages = await PageAudit.find({ auditId: audit._id }).sort({ 'scores.performance': 1 }).limit(10);
    const summary = summarizeIssues(issues);

    res.json({
      audit,
      stats: {
        pagesAudited: pages.length,
        issues: summary,
      },
      latestIssues: issues,
      pages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch latest audit' });
  }
};

const getAudit = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.auditId);
    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }
    res.json(audit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch audit' });
  }
};

const listAuditPages = async (req, res) => {
  try {
    const { auditId } = req.params;
    const pages = await PageAudit.find({ auditId }).sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch audit pages' });
  }
};

const listAuditIssues = async (req, res) => {
  try {
    const { auditId } = req.params;
    const issues = await Issue.find({ auditId }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch audit issues' });
  }
};

export {
  runAudit,
  listAuditsForSite,
  getLatestAuditForSite,
  getAudit,
  listAuditPages,
  listAuditIssues,
};
