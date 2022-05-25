const Product = require('../models/product')
const Cart = require('../models/cart')
// const getShopProducts = (req,res,next)=>{
// 	const products = Product.fetchAll();
// 	res.render('shop/shop',{products,path:'/'});
// }

const homepage = (req,res,next)=>{
	res.render('shop/shop',{path:'/'});
}

const indexProductShop = (req,res,next)=>{
	Product.fetchAll()
	.then((products)=>{
		res.render('shop/product-list',{products,path:'/products'})
	})
	
}

const showProductShop = (req,res,next)=>{
	const prodId = req.params.productId;
	Product.findById(prodId,(product)=>{
		res.render('shop/product-detail',{product,path:'/product'})
	});
}

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

const removeCart = (req,res,next)=>{
	const prodId = req.body.id;
	Cart.remove(prodId);
	res.redirect('/cart');
}

module.exports = {
	getCart,
	indexProductShop,
	showProductShop,
	addCart,
	removeCart,
	homepage
}