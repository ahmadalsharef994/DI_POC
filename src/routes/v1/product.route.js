const express = require('express');
const { container } = require('../../../di-setup');

const ProductController = container.resolve('ProductController');

const router = express.Router();

// routes for products
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProductById);
router.delete('/:id', ProductController.deleteProductById);

module.exports = router;
