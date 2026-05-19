import mongoose from 'mongoose';

const pageAuditSchema = mongoose.Schema({
  auditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audit', required: true },
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
  url: { type: String, required: true },
  scores: {
    technical: { type: Number, default: 0 },
    performance: { type: Number, default: 0 },
    content: { type: Number, default: 0 },
  },
  metrics: {
    lcp: { type: Number, default: null },
    cls: { type: Number, default: null },
    inp: { type: Number, default: null },
    ttfb: { type: Number, default: null },
    speedIndex: { type: Number, default: null },
  },
  htmlMeta: {
    title: { type: String },
    description: { type: String },
    h1: { type: String },
    h2: [{ type: String }],
    canonical: { type: String },
  },
  images: {
    missingAlt: [{ type: String }],
    oversized: [{ type: String }],
  },
  links: {
    broken: [{ type: String }],
  },
  schemaTypes: [{ type: String }],
  contentHash: { type: String },
}, { timestamps: true });

const PageAudit = mongoose.model('PageAudit', pageAuditSchema);

export default PageAudit;
