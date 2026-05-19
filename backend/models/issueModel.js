import mongoose from 'mongoose';

const issueSchema = mongoose.Schema({
  auditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audit', required: true },
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
  type: { type: String, required: true },
  severity: { type: String, enum: ['red', 'yellow', 'green'], default: 'yellow' },
  message: { type: String, required: true },
  evidence: { type: String },
  recommendation: { type: String },
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
