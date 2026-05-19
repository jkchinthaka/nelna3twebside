import mongoose from 'mongoose';

const siteSchema = mongoose.Schema({
  name: { type: String, required: true },
  baseUrl: { type: String, required: true, unique: true },
  country: { type: String, default: 'Sri Lanka' },
  industry: { type: String, default: 'Food & FMCG' },
}, { timestamps: true });

const Site = mongoose.model('Site', siteSchema);

export default Site;
