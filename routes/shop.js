const path = require('path');

const express = require('express');
const routeAdmin = require('./admin');
const productsController = require('../controllers/productsController');
const transactionController = require('../controllers/transactionController');
const shopController = require('../controllers/shopController');

const router = express.Router();
const rootDir = require('../util/path')

router.get('/profile',(req,res,next)=>{
	console.log('route profile');
	res.send('<h1>User Data</h1>');
});

router.get('/cart',shopController.getCart);
router.post('/cart',shopController.addCart);
router.post('/cart-remove',shopController.removeCart);

router.get('/checkout',transactionController.getCheckout);
router.get('/products',shopController.indexProductShop);
router.get('/product/:productId',shopController.showProductShop);
router.get('/',shopController.homepage);


module.exports = router;