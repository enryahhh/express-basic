const path = require('path');
const express = require('express');
const rootDir = require('../util/path')

const productsController = require('../controllers/productsController')

const router = express.Router();

router.get('/products',productsController.indexProduct);

router.get('/add-product',productsController.addProduct);

router.post('/product',productsController.storeProduct);

router.get('/product/:productId',productsController.editProduct);


module.exports = router;