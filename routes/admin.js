const express = require('express');
const path = require('path');

const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product/:productId', adminController.postEditProduct);
router.get('/products', adminController.getProducts);
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
