import express from 'express';
import { listUsers, upsertUser } from '../controllers/userController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { cursorQuerySchema, upsertUserSchema, userIdParamSchema } from '../validation/schemas.js';

const router = express.Router();

router.route('/').get(validateRequest({ query: cursorQuerySchema }), listUsers);
router.route('/:id').put(validateRequest({ params: userIdParamSchema, body: upsertUserSchema }), upsertUser);

export default router;
