import express from 'express';
import { createOrder, listOrders, updateOrder } from '../controllers/orderController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
	createOrderSchema,
	cursorQuerySchema,
	mongoIdParamSchema,
	updateOrderSchema,
} from '../validation/schemas.js';

const router = express.Router();

router
	.route('/')
	.get(validateRequest({ query: cursorQuerySchema }), listOrders)
	.post(validateRequest({ body: createOrderSchema }), createOrder);

router
	.route('/:id')
	.put(validateRequest({ params: mongoIdParamSchema, body: updateOrderSchema }), updateOrder);

export default router;
