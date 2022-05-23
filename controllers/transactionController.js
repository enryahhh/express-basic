const Product = require('../models/product')

// const getShopProducts = (req,res,next)=>{
// 	const products = Product.fetchAll();
// 	res.render('shop/shop',{products,path:'/'});
// }

const getCart = (req,res,next)=>{
	res.render('shop/cart',{path:'/cart'});
}

const addCart = (req,res,next)=>{
	// res.render('shop/cart',{path:'/add-product'});
}

const getCheckout = (req,res,next)=>{
	res.render('shop/checkout',{path:'/checkout'});
}

module.exports = {
	getCart,
	addCart,
	// storeProduct,
	getCheckout
	// getShopProducts
}