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
	.then(([rows,fieldData])=>{
		console.log(rows);
		res.render('admin/products',{products:rows,path:'admin/products'})
	})
	.catch(err=>console.log(err));
	
}

const addProduct = (req,res,next)=>{
	res.render('admin/add-product',{path:'/add-product'});
}


const storeProduct = (req,res,next)=>{
	const nama = req.body.name;
	const img = req.body.image;
	const price = req.body.price*1;
	const desc = req.body.desc;
	const stok = req.body.stok*1;

	const product = new Product(nama,img,price,desc,stok);
	product.save().then((result)=>{
		console.log(result);
		
		res.redirect('/admin/products');
	})
	.catch(err=>console.log(err));
}

const editProduct = (req,res,next)=>{
	const prodId = req.params.productId;
	Product.findById(prodId).then(([rows,fieldData])=>{
		console.log(rows);
		res.render('admin/edit-product',{product:rows[0],path:'/edit-product'});
	})
	.catch(err=>console.log(err));
}

const updateProduct = (req,res,next)=>{
	const id = req.body.id;
	const nama = req.body.name;
	const img = req.body.image;
	const price = req.body.price*1;
	const desc = req.body.desc;
	const stok = req.body.stok*1;

	const product = new Product(nama,img,price,desc);
	product.update(id,product).then((result)=>{
		console.log(result);
		res.redirect('/admin/products');
	})
	.catch(err=>console.log(err));
}

const deleteProduct = (req,res,next)=>{
	const prodId = req.body.id;
	Product.delete(prodId).then((result)=>{
		console.log(result);
		res.redirect('/admin/products');
	})
	.catch(err=>console.log(err));
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