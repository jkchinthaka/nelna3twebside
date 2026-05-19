import mongoose from 'mongoose';

const newsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String },
    date: { type: String },
    category: { type: String, default: 'Update' },
  },
  { timestamps: true }
);

const News = mongoose.model('News', newsSchema);

export default News;
