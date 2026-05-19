import User from '../models/userModel.js';
import { sendCollection } from '../utils/pagination.js';

const listUsers = async (req, res) => {
  try {
    await sendCollection({
      req,
      res,
      model: User,
      sort: { _id: -1 },
      mapDoc: (user) => ({ id: user.uid, name: user.name, role: user.role }),
      defaultLimit: 30,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users' });
  }
};

const upsertUser = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body || {};

    if (!payload.name) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    const updated = await User.findOneAndUpdate(
      { uid: id },
      { uid: id, name: payload.name, role: payload.role || 'distributor' },
      { upsert: true, new: true }
    );

    res.json({ id: updated.uid, name: updated.name, role: updated.role });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to save user' });
  }
};

export { listUsers, upsertUser };
