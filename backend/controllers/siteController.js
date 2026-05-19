import Site from '../models/siteModel.js';
import { sendCollection } from '../utils/pagination.js';

const getSites = async (req, res) => {
  try {
    await sendCollection({
      req,
      res,
      model: Site,
      sort: { _id: -1 },
      mapDoc: (site) => site.toObject(),
      defaultLimit: 20,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sites' });
  }
};

const createSite = async (req, res) => {
  try {
    const { name, baseUrl, country, industry } = req.body || {};
    if (!name || !baseUrl) {
      return res.status(400).json({ message: 'Name and baseUrl are required' });
    }

    const normalized = baseUrl.replace(/\/$/, '');
    const created = await Site.create({
      name,
      baseUrl: normalized,
      country: country || 'Sri Lanka',
      industry: industry || 'Food & FMCG',
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create site' });
  }
};

export { getSites, createSite };
