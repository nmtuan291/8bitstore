import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

//Customer
router.get('/get-all-products', productController.getAllProducts);
router.get('/get-filtered-products', productController.getFilteredProduct);

export default router;