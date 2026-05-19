import ContactSettings from '../models/contactSettingsModel.js';

const getContactSettings = async (req, res) => {
  try {
    let settings = await ContactSettings.findOne({});
    if (!settings) {
      settings = await ContactSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contact settings' });
  }
};

const updateContactSettings = async (req, res) => {
  try {
    const payload = req.body || {};
    const settings = await ContactSettings.findOneAndUpdate(
      {},
      payload,
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update contact settings' });
  }
};

export { getContactSettings, updateContactSettings };
