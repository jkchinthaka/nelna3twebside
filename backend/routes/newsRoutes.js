import express from 'express';
import { createNews, deleteNews, getNewsById, listNews, updateNews } from '../controllers/newsController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
	createNewsSchema,
	cursorQuerySchema,
	mongoIdParamSchema,
	updateNewsSchema,
} from '../validation/schemas.js';

const router = express.Router();

router
	.route('/')
	.get(validateRequest({ query: cursorQuerySchema }), listNews)
	.post(validateRequest({ body: createNewsSchema }), createNews);

router
	.route('/:id')
	.get(validateRequest({ params: mongoIdParamSchema }), getNewsById)
	.put(validateRequest({ params: mongoIdParamSchema, body: updateNewsSchema }), updateNews)
	.delete(validateRequest({ params: mongoIdParamSchema }), deleteNews);

export default router;
