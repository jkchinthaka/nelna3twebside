import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import { requestContext } from './middleware/requestContext.js';
import { sanitizeInput } from './middleware/sanitizeInput.js';
import { errorEnvelope } from './middleware/errorEnvelope.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Import Routes
import productRoutes from './routes/productRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import contactSettingsRoutes from './routes/contactSettingsRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowlist = String(process.env.CORS_ORIGIN_ALLOWLIST || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const allowAnyOrigin = allowlist.length === 0 || allowlist.includes('*');

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowAnyOrigin || allowlist.includes(origin)) {
            callback(null, true);
            return;
        }
        const corsError = new Error('Origin not allowed by CORS policy.');
        corsError.statusCode = 403;
        corsError.code = 'CORS_ORIGIN_DENIED';
        callback(corsError);
    },
    credentials: true,
};

const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const rateLimitMax = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 500);

const apiLimiter = rateLimit({
    windowMs: Number.isFinite(rateLimitWindowMs) ? rateLimitWindowMs : 15 * 60 * 1000,
    max: Number.isFinite(rateLimitMax) ? rateLimitMax : 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        code: 'RATE_LIMITED',
        message: 'Too many requests. Please retry later.',
    },
});

const apiRouter = express.Router();

// Middleware
app.set('trust proxy', 1);
app.use(requestContext);
app.use(errorEnvelope);
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        contentSecurityPolicy: false,
    }),
);
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(sanitizeInput);

// Routes
app.get('/', (req, res) => {
        res.json({
                name: 'Nelna API',
                status: 'ok',
                version: 'v1',
                traceId: req.traceId,
        });
});

app.get('/healthz', (req, res) => {
        res.json({
                status: 'healthy',
                uptime: Math.round(process.uptime()),
                traceId: req.traceId,
        });
});

apiRouter.get('/docs', (req, res) => {
        res.json({
                title: 'Nelna API Docs Placeholder',
                openapi: '3.1.0',
                description: 'OpenAPI specification endpoint placeholder. Wire Swagger UI in a future iteration.',
        });
});

apiRouter.get('/system/capabilities', (req, res) => {
        res.json({
                cache: 'Redis placeholder',
                jobs: 'Background jobs placeholder for notifications and audits',
                apiDocs: '/api/docs',
        });
});

apiRouter.use('/products', productRoutes);
apiRouter.use('/sites', siteRoutes);
apiRouter.use('/audits', auditRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/inquiries', inquiryRoutes);
apiRouter.use('/news', newsRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/contact-settings', contactSettingsRoutes);
apiRouter.use('/', searchRoutes);

app.use('/api', apiLimiter, apiRouter);
app.use('/api/v2', apiLimiter, apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
