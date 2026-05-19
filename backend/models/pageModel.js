import mongoose from 'mongoose';

const pageSchema = mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  url: { type: String, required: true },
  type: { type: String, default: 'unknown' },
  lastCrawledAt: { type: Date },
}, { timestamps: true });

pageSchema.index({ siteId: 1, url: 1 }, { unique: true });

const Page = mongoose.model('Page', pageSchema);

export default Page;
