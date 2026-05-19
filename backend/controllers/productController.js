import Product from '../models/productModel.js';
import { sendCollection } from '../utils/pagination.js';

function slugify(value) {
    return String(value || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function generateProductId() {
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `P${Date.now()}${rand}`;
}

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        await sendCollection({
            req,
            res,
            model: Product,
            sort: { _id: -1 },
            mapDoc: (product) => product.toObject(),
            defaultLimit: 24,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id }); 
        // Note: Using 'id' field from schema, not internal MongoDB '_id'. 
        // If you want MongoDB _id, use findById(req.params.id)
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public (lock down later)
const createProduct = async (req, res) => {
    try {
        const payload = req.body || {};
        const id = payload.id || generateProductId();
        const slug = payload.slug || slugify(payload.name) || id;

        const created = await Product.create({
            ...payload,
            id,
            slug
        });

        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Invalid product payload' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public (lock down later)
const updateProductById = async (req, res) => {
    try {
        const payload = req.body || {};

        const updated = await Product.findOneAndUpdate(
            { id: req.params.id },
            {
                ...payload,
                ...(payload.name && !payload.slug ? { slug: slugify(payload.name) || req.params.id } : {})
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Invalid update payload' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public (lock down later)
const deleteProductById = async (req, res) => {
    try {
        const deleted = await Product.findOneAndDelete({ id: req.params.id });

        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product removed', id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { getProducts, getProductById, createProduct, updateProductById, deleteProductById };
