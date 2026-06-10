import ContactSettings from '../models/contactSettingsModel.js';
import {
  getDefaultContactSettings,
  mapContactSettingsDoc,
} from '../data/defaultContactSettings.js';
import { isDbReady } from '../utils/dbState.js';

function sendContactSettings(res, data) {
  return res.json({
    success: true,
    data,
  });
}

const getContactSettings = async (req, res) => {
  const defaults = getDefaultContactSettings();

  if (!isDbReady()) {
    return sendContactSettings(res, defaults);
  }

  try {
    let settings = await ContactSettings.findOne({});
    if (!settings) {
      settings = await ContactSettings.create({});
    }
    return sendContactSettings(res, mapContactSettingsDoc(settings));
  } catch (error) {
    console.error('[contact-settings] Failed to load settings:', error.message);
    return sendContactSettings(res, defaults);
  }
};

const updateContactSettings = async (req, res) => {
  const defaults = getDefaultContactSettings();

  if (!isDbReady()) {
    return res.status(503).json({
      success: false,
      message: 'Database is unavailable. Contact settings cannot be updated right now.',
    });
  }

  try {
    const payload = req.body || {};
    const settings = await ContactSettings.findOneAndUpdate(
      {},
      payload,
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
    );
    return sendContactSettings(res, mapContactSettingsDoc(settings));
  } catch (error) {
    console.error('[contact-settings] Failed to update settings:', error.message);
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to update contact settings',
    });
  }
};

export { getContactSettings, updateContactSettings };
