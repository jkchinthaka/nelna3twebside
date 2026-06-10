import News from '../models/newsModel.js';
import { isDbReady } from '../utils/dbState.js';
import { sendCollection } from '../utils/pagination.js';

const listNews = async (req, res) => {
  if (!isDbReady()) {
    return res.json([]);
  }

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
    console.error('[news] Failed to load news:', error.message);
    return res.json([]);
  }
};

const getNewsById = async (req, res) => {
  if (!isDbReady()) {
    return res.status(404).json({
      success: false,
      message: 'News not found',
    });
  }

  try {
    const item = await News.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'News not found',
      });
    }
    return res.json({ id: item._id.toString(), ...item.toObject() });
  } catch (error) {
    console.error('[news] Failed to load news item:', error.message);
    return res.status(404).json({
      success: false,
      message: 'News not found',
    });
  }
};

const createNews = async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({
      success: false,
      message: 'Database is unavailable. News cannot be created right now.',
    });
  }

  try {
    const payload = req.body || {};
    if (!payload.title || !payload.summary || !payload.body) {
      return res.status(400).json({
        success: false,
        message: 'Title, summary, and body are required.',
      });
    }

    const created = await News.create({
      ...payload,
      date: payload.date || new Date().toISOString().slice(0, 10),
      category: payload.category || 'Update',
    });

    return res.status(201).json({ id: created._id.toString(), ...created.toObject() });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to create news',
    });
  }
};

const updateNews = async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({
      success: false,
      message: 'Database is unavailable. News cannot be updated right now.',
    });
  }

  try {
    const updated = await News.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'News not found',
      });
    }

    return res.json({ id: updated._id.toString(), ...updated.toObject() });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to update news',
    });
  }
};

const deleteNews = async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({
      success: false,
      message: 'Database is unavailable. News cannot be deleted right now.',
    });
  }

  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'News not found',
      });
    }
    return res.json({ success: true, message: 'News deleted', id: req.params.id });
  } catch (error) {
    console.error('[news] Failed to delete news:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete news',
    });
  }
};

export { listNews, getNewsById, createNews, updateNews, deleteNews };
