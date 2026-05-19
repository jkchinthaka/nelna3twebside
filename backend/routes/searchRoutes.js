
import express from "express";
import { aiSearch } from "../controllers/searchController.js";
import { validateRequest } from '../middleware/validateRequest.js';
import { aiSearchBodySchema } from '../validation/schemas.js';

const router = express.Router();

router.post('/ai-search', validateRequest({ body: aiSearchBodySchema }), aiSearch);

export default router;
