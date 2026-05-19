import express from 'express';
import { getContactSettings, updateContactSettings } from '../controllers/contactSettingsController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { updateContactSettingsSchema } from '../validation/schemas.js';

const router = express.Router();

router
	.route('/')
	.get(getContactSettings)
	.put(validateRequest({ body: updateContactSettingsSchema }), updateContactSettings);

export default router;
