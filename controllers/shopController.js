const Product = require('../models/product')

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

const addCart = (req,res,next)=>{
	// res.render('shop/cart',{path:'/add-product'});
}

const storeProduct = (req,res,next)=>{
	// const product = new Product(req.body.name);
	// product.save();
	// res.redirect('/');
}

module.exports = {
	indexProductShop,
	addCart,
	storeProduct,
	homepage
}