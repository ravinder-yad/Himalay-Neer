import express from 'express';
import multer from 'multer';
import path from 'path';
import { getProducts, createProduct, getProductById, deleteProduct } from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.route('/')
    .get(getProducts)
    .post(protect, authorize('admin'), upload.single('image'), createProduct);

router.route('/:id')
    .get(getProductById)
    .delete(protect, authorize('admin'), deleteProduct);

export default router;
