const Product = require('../models/product')

const getShopProducts = (req,res,next)=>{
	const products = Product.fetchAll();
	res.render('shop/shop',{products,path:'/'});
}

const indexProduct = (req,res,next)=>{
	Product.findAll()
	.then(result=>{
		res.render('admin/products',{products:result,path:'admin/products'})
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

	Product.create({
		name:nama,
		img:img,
		price:price,
		stok:stok,
		description:desc
	}).then((result)=>{
		console.log(result);
		
		res.redirect('/admin/products');
	})
	.catch(err=>console.log(err));
}

const editProduct = (req,res,next)=>{
	const prodId = req.params.productId;
	Product.findByPk(prodId).then((result)=>{
		console.log(result);
		res.render('admin/edit-product',{product:result,path:'/edit-product'});
	})
	.catch(err=>console.log(err));
}

const updateProduct = (req,res,next)=>{
	const id = req.body.id;
	const nama = req.body.name;
	const img = req.body.image;
	const price = req.body.price*1;
	const desc = req.body.desc;

	Product.update({
		name:nama,
		img:img,
		price:price,
		description:desc
	},{
		where:{
			id:id
		}
	}).then((result)=>{
		console.log(result);
		res.redirect('/admin/products');
	})
	.catch(err=>console.log(err));
}

const deleteProduct = (req,res,next)=>{
	const prodId = req.body.id;
	Product.destroy({
		where:{id:prodId}
	}).then((result)=>{
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