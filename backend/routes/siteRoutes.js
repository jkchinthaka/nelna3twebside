import express from 'express';
import { getSites, createSite } from '../controllers/siteController.js';
import { listAuditsForSite, getLatestAuditForSite, runAudit } from '../controllers/auditController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
	createSiteSchema,
	cursorQuerySchema,
	runAuditSchema,
	siteIdParamSchema,
} from '../validation/schemas.js';

const router = express.Router();

router
	.route('/')
	.get(validateRequest({ query: cursorQuerySchema }), getSites)
	.post(validateRequest({ body: createSiteSchema }), createSite);

router
	.route('/:siteId/audits')
	.get(validateRequest({ params: siteIdParamSchema }), listAuditsForSite);

router
	.route('/:siteId/audits/latest')
	.get(validateRequest({ params: siteIdParamSchema }), getLatestAuditForSite);

router
	.route('/:siteId/audits/run')
	.post(validateRequest({ params: siteIdParamSchema, body: runAuditSchema }), runAudit);

export default router;
