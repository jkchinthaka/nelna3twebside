import mongoose from 'mongoose';

const inquirySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    phone: { type: String },
    email: { type: String },
    message: { type: String, required: true },
    status: { type: String, default: 'new' },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
