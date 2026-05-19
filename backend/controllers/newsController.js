import News from '../models/newsModel.js';
import { sendCollection } from '../utils/pagination.js';

const listNews = async (req, res) => {
  try {
    await sendCollection({
      req,
      res,
      model: News,
      sort: { _id: -1 },
      mapDoc: (item) => ({ id: item._id.toString(), ...item.toObject() }),
      defaultLimit: 20,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load news' });
  }
};

const getNewsById = async (req, res) => {
  try {
    const item = await News.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ id: item._id.toString(), ...item.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load news item' });
  }
};

const createNews = async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.title || !payload.summary || !payload.body) {
      return res.status(400).json({ message: 'Title, summary, and body are required.' });
    }

    const created = await News.create({
      ...payload,
      date: payload.date || new Date().toISOString().slice(0, 10),
      category: payload.category || 'Update',
    });

    res.status(201).json({ id: created._id.toString(), ...created.toObject() });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create news' });
  }
};

const updateNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json({ id: updated._id.toString(), ...updated.toObject() });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update news' });
  }
};

const deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ message: 'News deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete news' });
  }
};

export { listNews, getNewsById, createNews, updateNews, deleteNews };
