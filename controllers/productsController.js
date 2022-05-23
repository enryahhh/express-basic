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


const storeProduct = (req,res,next)=>{
	const id = +new Date();
	const nama = req.body.name;
	const img = req.body.image;
	const price = req.body.price;
	const desc = req.body.desc;

	const product = new Product(id.toString(),nama,img,price,desc);
	product.save();
	res.redirect('/');
}

const editProduct = (req,res,next)=>{
	const prodId = req.params.productId;
	Product.findById(prodId,(product)=>{
		res.render('admin/edit-product',{product,path:'/edit-product'})
	});
}

const updateProduct = (req,res,next)=>{
	const id = req.body.id;
	const nama = req.body.name;
	const img = req.body.image;
	const price = req.body.price;
	const desc = req.body.desc;

	const product = new Product(id,nama,img,price,desc);
	product.update(id,product);

	res.redirect('/');
}

const deleteProduct = (req,res,next)=>{
	const prodId = req.body.id;
	Product.delete(prodId);
	res.redirect('/');
}

module.exports = {
	indexProduct,
	addProduct,
	storeProduct,
	editProduct,
	getShopProducts,
	updateProduct,
	deleteProduct
}