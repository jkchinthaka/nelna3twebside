import Inquiry from '../models/inquiryModel.js';
import { sendCollection } from '../utils/pagination.js';

const listInquiries = async (req, res) => {
  try {
    await sendCollection({
      req,
      res,
      model: Inquiry,
      sort: { _id: -1 },
      mapDoc: (item) => ({ id: item._id.toString(), ...item.toObject() }),
      defaultLimit: 30,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load inquiries' });
  }
};

const createInquiry = async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.name || !payload.message) {
      return res.status(400).json({ message: 'Name and message are required.' });
    }

    const created = await Inquiry.create({
      ...payload,
      status: payload.status || 'new',
    });

    res.status(201).json({ id: created._id.toString(), ...created.toObject() });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create inquiry' });
  }
};

const updateInquiry = async (req, res) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json({ id: updated._id.toString(), ...updated.toObject() });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update inquiry' });
  }
};

export { listInquiries, createInquiry, updateInquiry };
