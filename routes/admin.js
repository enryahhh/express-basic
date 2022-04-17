const path = require('path');
const express = require('express');
const rootDir = require('../util/path')

const router = express.Router();
const products = [];
router.get('/add-product',(req,res,next)=>{
	res.render('add-product');
})

router.post('/product',(req,res,next)=>{
	products.push({name:req.body.name});
	res.redirect('/');
})

router.get('/products',(req,res,next)=>{
	res.sendFile(path.join(rootDir,'views','products.html'))
})

module.exports = {
	router,
	products
};