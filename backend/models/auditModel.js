import mongoose from 'mongoose';

const auditSchema = mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  runId: { type: String, required: true },
  status: { type: String, default: 'running' },
  startedAt: { type: Date, default: Date.now },
  finishedAt: { type: Date },
  overallScore: { type: Number, default: 0 },
  technicalScore: { type: Number, default: 0 },
  performanceScore: { type: Number, default: 0 },
  contentScore: { type: Number, default: 0 },
  notes: { type: String },
}, { timestamps: true });

const Audit = mongoose.model('Audit', auditSchema);

export default Audit;
