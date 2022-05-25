const Product = require('../models/product')
const Cart = require('../models/cart')
// const getShopProducts = (req,res,next)=>{
// 	const products = Product.fetchAll();
// 	res.render('shop/shop',{products,path:'/'});
// }

const getCheckout = (req,res,next)=>{
	res.render('shop/checkout',{path:'/checkout'});
}

module.exports = {
	// getCart,
	// addCart,
	// storeProduct,
	getCheckout
	// getShopProducts
}