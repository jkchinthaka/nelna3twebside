import express from 'express';
import { createInquiry, listInquiries, updateInquiry } from '../controllers/inquiryController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
	createInquirySchema,
	cursorQuerySchema,
	mongoIdParamSchema,
	updateInquirySchema,
} from '../validation/schemas.js';

const router = express.Router();

router
	.route('/')
	.get(validateRequest({ query: cursorQuerySchema }), listInquiries)
	.post(validateRequest({ body: createInquirySchema }), createInquiry);

router
	.route('/:id')
	.put(validateRequest({ params: mongoIdParamSchema, body: updateInquirySchema }), updateInquiry);

export default router;
