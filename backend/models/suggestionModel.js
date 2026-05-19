import mongoose from 'mongoose';

const suggestionSchema = mongoose.Schema({
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
  auditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audit' },
  type: { type: String, required: true },
  aiPrompt: { type: String },
  aiResponse: { type: String },
}, { timestamps: true });

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

export default Suggestion;
