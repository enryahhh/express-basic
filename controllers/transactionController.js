const Product = require('../models/product')
const Cart = require('../models/cart')
const Order = require('../models/order')
const OrderItem = require('../models/order-item')

// const getShopProducts = (req,res,next)=>{
// 	const products = Product.fetchAll();
// 	res.render('shop/shop',{products,path:'/'});
// }

const postOrder = (req,res,next)=>{
	let fetchedCart;
	req.user.getCart()
	.then(cart=>{
		fetchedCart = cart;
		return cart.getProducts();
	})
	.then(products => {
		return req.user.createOrder()
				.then(order=>{
					return order.addProducts(products.map(product=>{
						product.order_item = {qty:product.cart_item.qty}
						return product;
					})
					);
				}).catch(err=>console.log(err))
				.then(result =>{
					fetchedCart.setProducts(null);
				}).then(result=>{
					res.redirect('/order');
				})
	}).catch(err=>console.log(err))
}

const getOrder = (req,res,next)=>{
	req.user.getOrders({include:['products']})
	.then(order => {
		console.log(order[0])
		res.render('shop/order',{orders:order,path:'/order'});	
	})
	.catch(err=>console.log(err))
}

module.exports = {
	// getCart,
	// addCart,
	// storeProduct,
	postOrder,
	getOrder
	// getShopProducts
}