import mongoose from 'mongoose';

const alertSchema = mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  auditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audit' },
  type: { type: String, required: true },
  threshold: { type: String },
  status: { type: String, default: 'triggered' },
  triggeredAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
