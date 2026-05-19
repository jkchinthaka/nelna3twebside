import express from 'express';
import { getAudit, listAuditPages, listAuditIssues } from '../controllers/auditController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { auditIdParamSchema } from '../validation/schemas.js';

const router = express.Router();

router.route('/:auditId').get(validateRequest({ params: auditIdParamSchema }), getAudit);
router.route('/:auditId/pages').get(validateRequest({ params: auditIdParamSchema }), listAuditPages);
router.route('/:auditId/issues').get(validateRequest({ params: auditIdParamSchema }), listAuditIssues);

export default router;
