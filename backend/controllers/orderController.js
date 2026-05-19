import Order from '../models/orderModel.js';
import { sendCollection } from '../utils/pagination.js';

const listOrders = async (req, res) => {
  try {
    await sendCollection({
      req,
      res,
      model: Order,
      sort: { _id: -1 },
      mapDoc: (order) => ({ id: order._id.toString(), ...order.toObject() }),
      defaultLimit: 30,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load orders' });
  }
};

const createOrder = async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.name || !payload.phone) {
      return res.status(400).json({ message: 'Name and phone are required.' });
    }

    const created = await Order.create({
      ...payload,
      status: payload.status || 'new',
    });

    res.status(201).json({ id: created._id.toString(), ...created.toObject() });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create order' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ id: updated._id.toString(), ...updated.toObject() });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update order' });
  }
};

export { listOrders, createOrder, updateOrder };
