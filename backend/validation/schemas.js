import { z } from 'zod';

const mongoIdRegex = /^[a-f\d]{24}$/i;

const nonEmptyString = (max = 500) => z.string().trim().min(1).max(max);
const optionalString = (max = 500) => z.string().trim().max(max).optional();
const optionalStringArray = (maxItems = 20, maxLength = 120) =>
  z.array(nonEmptyString(maxLength)).max(maxItems).optional();

export const cursorQuerySchema = z
  .object({
    cursor: z.string().regex(mongoIdRegex, 'Invalid cursor value.').optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
  })
  .passthrough();

export const productIdParamSchema = z.object({
  id: nonEmptyString(120),
});

export const mongoIdParamSchema = z.object({
  id: z.string().regex(mongoIdRegex, 'Invalid resource id.'),
});

export const siteIdParamSchema = z.object({
  siteId: z.string().regex(mongoIdRegex, 'Invalid site id.'),
});

export const auditIdParamSchema = z.object({
  auditId: z.string().regex(mongoIdRegex, 'Invalid audit id.'),
});

export const userIdParamSchema = z.object({
  id: nonEmptyString(128),
});

const productBaseSchema = z
  .object({
    id: optionalString(120),
    name: nonEmptyString(160),
    slug: optionalString(180),
    category: optionalString(120),
    description: optionalString(6000),
    ingredients: optionalString(4000),
    imageUrl: optionalString(2048),
    pdfUrl: optionalString(2048),
    isNew: z.boolean().optional(),
    tags: optionalStringArray(20, 60),
    nutrition: z
      .object({
        calories: z.number().min(0).max(3500).optional(),
        protein: optionalString(60),
        fat: optionalString(60),
      })
      .optional(),
    storage: optionalString(1000),
    certifications: optionalStringArray(20, 120),
    availability: optionalString(120),
    temperatureRange: optionalString(80),
    plant: optionalString(160),
    batchSample: optionalString(160),
    weights: optionalStringArray(30, 40),
    bestFor: optionalStringArray(20, 80),
  })
  .passthrough();

export const productCreateSchema = productBaseSchema;
export const productUpdateSchema = productBaseSchema.partial();

export const orderStatusValues = [
  'new',
  'confirmed',
  'packed',
  'dispatched',
  'delivered',
  'closed',
  'cancelled',
  'returned',
];

const orderStatusSchema = z.enum(orderStatusValues);

const orderBaseSchema = z
  .object({
    name: nonEmptyString(160),
    company: optionalString(160),
    phone: nonEmptyString(50),
    product: optionalString(180),
    quantity: optionalString(80),
    message: optionalString(2000),
    status: orderStatusSchema.optional(),
  })
  .passthrough();

export const createOrderSchema = orderBaseSchema;
export const updateOrderSchema = orderBaseSchema.partial();

export const inquiryStatusValues = ['new', 'pending', 'contacted', 'resolved', 'closed'];
const inquiryStatusSchema = z.enum(inquiryStatusValues);

const inquiryBaseSchema = z
  .object({
    name: nonEmptyString(160),
    company: optionalString(160),
    phone: optionalString(50),
    email: z.string().trim().email().max(320).optional(),
    message: nonEmptyString(2000),
    status: inquiryStatusSchema.optional(),
  })
  .passthrough();

export const createInquirySchema = inquiryBaseSchema;
export const updateInquirySchema = inquiryBaseSchema.partial();

const newsBaseSchema = z
  .object({
    title: nonEmptyString(220),
    summary: nonEmptyString(1200),
    body: nonEmptyString(12000),
    imageUrl: optionalString(2048),
    date: optionalString(40),
    category: optionalString(120),
  })
  .passthrough();

export const createNewsSchema = newsBaseSchema;
export const updateNewsSchema = newsBaseSchema.partial();

export const roleValues = [
  'super-admin',
  'admin',
  'content-editor',
  'sales-manager',
  'distributor',
  'driver',
  'viewer',
];
const roleSchema = z.enum(roleValues);

export const upsertUserSchema = z
  .object({
    name: nonEmptyString(160),
    role: roleSchema.optional(),
  })
  .passthrough();

export const createSiteSchema = z
  .object({
    name: nonEmptyString(180),
    baseUrl: z.string().trim().url().max(2048),
    country: optionalString(120),
    industry: optionalString(120),
  })
  .passthrough();

export const runAuditSchema = z
  .object({
    maxPages: z.coerce.number().int().min(1).max(200).optional(),
    maxDepth: z.coerce.number().int().min(1).max(6).optional(),
  })
  .passthrough();

export const updateContactSettingsSchema = z
  .object({
    locationTitle: optionalString(120),
    addressLines: optionalStringArray(10, 160),
    mapEmbedUrl: optionalString(2048),
    mapLink: optionalString(2048),
    phoneTitle: optionalString(120),
    phoneNumbers: optionalStringArray(10, 60),
    emailTitle: optionalString(120),
    emails: z.array(z.string().trim().email().max(320)).max(10).optional(),
    hoursTitle: optionalString(120),
    workingHours: optionalStringArray(10, 120),
    directionsLabel: optionalString(120),
  })
  .partial()
  .passthrough();

export const aiSearchBodySchema = z
  .object({
    query: nonEmptyString(220),
    userLocation: z
      .object({
        lat: z.number().finite(),
        lng: z.number().finite(),
      })
      .optional(),
    filters: z
      .object({
        category: z.enum(['Frozen', 'Processed', 'All']).optional(),
        maxDistanceKm: z.number().positive().max(200).optional(),
      })
      .optional(),
    pagination: z
      .object({
        productsLimit: z.number().int().min(1).max(50).optional(),
        storesLimit: z.number().int().min(1).max(50).optional(),
        productsOffset: z.number().int().min(0).optional(),
        storesOffset: z.number().int().min(0).optional(),
      })
      .optional(),
  })
  .passthrough();
