const Product = require('../models/product')
const Cart = require('../models/cart')
// const getShopProducts = (req,res,next)=>{
// 	const products = Product.fetchAll();
// 	res.render('shop/shop',{products,path:'/'});
// }

const getCart = (req,res,next)=>{
	Cart.fetchCart((cart)=>{
		console.log(cart);
		res.render('shop/cart',{cart,path:'/cart'});
	});
}

const addCart = (req,res,next)=>{
	const prodId = req.body.id;
	Product.findById(prodId,(product)=>{
		Cart.addProduct(product);
		res.redirect('/cart');
	});
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