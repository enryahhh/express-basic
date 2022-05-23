const path = require('path');
const express = require('express');
const rootDir = require('../util/path')

const productsController = require('../controllers/productsController')

const router = express.Router();

router.get('/products',productsController.indexProduct);

router.get('/add-product',productsController.addProduct);

router.post('/product',productsController.storeProduct);

router.post('/product/update',productsController.updateProduct);

router.get('/product/:productId',productsController.editProduct);

router.post('/product/delete',productsController.deleteProduct);

module.exports = router;