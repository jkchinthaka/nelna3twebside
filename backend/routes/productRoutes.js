import express from 'express';
import { getProducts, getProductById, createProduct, updateProductById, deleteProductById } from '../controllers/productController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
	cursorQuerySchema,
	productCreateSchema,
	productIdParamSchema,
	productUpdateSchema,
} from '../validation/schemas.js';

const router = express.Router();

router
	.route('/')
	.get(validateRequest({ query: cursorQuerySchema }), getProducts)
	.post(validateRequest({ body: productCreateSchema }), createProduct);

router
	.route('/:id')
	.get(validateRequest({ params: productIdParamSchema }), getProductById)
	.put(
		validateRequest({
			params: productIdParamSchema,
			body: productUpdateSchema,
		}),
		updateProductById,
	)
	.delete(validateRequest({ params: productIdParamSchema }), deleteProductById);

export default router;
