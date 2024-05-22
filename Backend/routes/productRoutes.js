const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/', productController.createProduct);

// Get all products in a category
router.get('/category/:categoryId', productController.getProductsByCategory);

// Get a particular product
router.get('/:productId', productController.getProductById);

// Update a product
router.put('/:productId', productController.updateProduct);

// Delete a product
router.delete('/:productId', productController.deleteProduct);

// Update product count
router.patch('/:productId/count', productController.updateProductCount);

module.exports = router;
