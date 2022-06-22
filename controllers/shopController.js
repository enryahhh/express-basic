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
	Product.findAll()
	.then(result=>{
		res.render('shop/product-list',{products:result,path:'/products'})
	})
	
}

const showProductShop = (req,res,next)=>{
	const prodId = req.params.productId;
	Product.findByPk(prodId).then((result)=>{
		console.log(result);
		res.render('shop/product-detail',{product:result,path:'/product'});
	});
}

const getCart = (req,res,next)=>{
	req.user.getCart()
	.then((cart)=>{
		console.log(cart);
		if(cart === null){
			res.render('shop/cart',{cart:[],path:'/cart'});
		}else{
			cart.getProducts()
			.then(products=>{
			// console.log(products[0]['dataValues'])
			res.render('shop/cart',{cart:products,path:'/cart'});
			}).catch(err=>console.log(err))	
		}
		
		// res.render('shop/cart',{cart:newCart,path:'/cart'});
	})
	.catch(err=>console.log(err));
}

const addCart = (req,res,next)=>{
	const prodId = req.body.id;
	let fetchedCart;
	let newQty = 1;
	// Product.findByPk(prodId).then((product)=>{
	// 	Cart.addProduct(product['dataValues']);
	// 	console.log(product)
	// 	res.redirect('/cart');
	// });
	req.user.getCart()
	.then(cart => {
		if(cart === null){
			cart = req.user.createCart();
		}
			fetchedCart = cart;
		return cart.getProducts({where:{ id: prodId}})
	})
	.then(products=>{
		let product;

		if(products.length > 0){
			product = products[0]
		}
		// console.log(products)
		if(product){
			console.log(product)
			const oldQty = product.cart_item.qty;
			newQty = oldQty + 1;
			return product;
		}
		return Product.findByPk(prodId)
	})
	.then(product => {
			return fetchedCart.addProduct(product,{ through: { qty:newQty } })
	})
	.then(result=>{
		res.redirect('/cart');
	})
	.catch(err=>{
		console.log(err)
	})
}

const removeCart = (req,res,next)=>{
	const prodId = req.body.id;
	req.user.getCart()
	.then(cart=>{
		return cart.getProducts({where:{id:prodId}})
	})
	.then(products=>{
		const product = products[0];
		return product.cart_item.destroy();
	}).then(result=>{
		res.redirect('/cart');
	})
}

module.exports = {
	getCart,
	indexProductShop,
	showProductShop,
	addCart,
	removeCart,
	homepage
}