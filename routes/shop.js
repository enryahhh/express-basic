const path = require('path');

const express = require('express');
const routeAdmin = require('./admin');

const router = express.Router();
const rootDir = require('../util/path')

router.get('/profile',(req,res,next)=>{
	console.log('route profile');
	res.send('<h1>User Data</h1>');
});

router.get('/',(req,res,next)=>{
	const products = routeAdmin.products;
	res.render('shop',{products});
})

module.exports = router;