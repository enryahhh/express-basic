const Product = require('../models/product')

const getShopProducts = (req,res,next)=>{
	const products = Product.fetchAll();
	res.render('shop/shop',{products,path:'/'});
}

const indexProduct = (req,res,next)=>{
	// const products = Product.fetchAll();
	// console.log(products);
	// res.render('products',{products,path:'/products'})
	// console.log(Product.fetchAll().then(val=>console.log(val)).catch(err=>console.log(err)));
	Product.fetchAll()
	.then((products)=>{
		res.render('admin/products',{products,path:'admin/products'})
	})
	// .catch(err=>console.log(err))
	
}


const addProduct = (req,res,next)=>{
	res.render('admin/add-product',{path:'/add-product'});
}

const editProduct = (req,res,next)=>{
	const prodId = req.params.productId;
	Product.findById(prodId,(product)=>{
		res.render('admin/edit-product',{product,path:'/edit-product'})
	});
}

const storeProduct = (req,res,next)=>{
	const nama = req.body.name;
	const img = req.body.image;
	const price = req.body.price;
	const desc = req.body.desc;

	const product = new Product(nama,img,price,desc);
	product.save();
	res.redirect('/');
}

module.exports = {
	indexProduct,
	addProduct,
	storeProduct,
	editProduct,
	getShopProducts
}