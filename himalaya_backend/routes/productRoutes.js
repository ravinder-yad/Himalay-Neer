const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getProducts, createProduct, getProductById, deleteProduct } = require('../controllers/productController');

// Multer Config
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
    .post(upload.single('image'), createProduct);

router.route('/:id')
    .get(getProductById)
    .delete(deleteProduct);

module.exports = router;
