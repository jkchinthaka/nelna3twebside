import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    phone: { type: String, required: true },
    product: { type: String },
    quantity: { type: String },
    message: { type: String },
    status: { type: String, default: 'new' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
