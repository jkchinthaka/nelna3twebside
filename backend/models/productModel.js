import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String },
    category: { type: String },
    weights: [{ type: String }],
    description: { type: String },
    ingredients: { type: String },
    imageUrl: { type: String },
    pdfUrl: { type: String },
    isNew: { type: Boolean, default: false },
    tags: [{ type: String }],
    nutrition: {
        calories: { type: Number },
        protein: { type: String },
        fat: { type: String }
    },
    storage: { type: String },
    certifications: [{ type: String }],
    availability: { type: String },
    temperatureRange: { type: String },
    plant: { type: String },
    batchSample: { type: String },
    bestFor: [{ type: String }]
}, {
    timestamps: true,
    suppressReservedKeysWarning: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
