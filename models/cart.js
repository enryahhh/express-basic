const path = require('path');
const fs = require('fs');
const p = path.join(path.dirname(process.mainModule.filename),'data','cart.json');	
module.exports = class Cart{
	static addProduct(product){
		// fetch cart yang ada
		fs.readFile(p,(err,fileContent)=>{
			let cart = { products : [] , totalPrice:0 }
			if(!err){
				cart = JSON.parse(fileContent);
			}

			// cek jika produk sudah ada di cart
			const existProdInd = cart.products.findIndex(prod=>prod.id === product.id);
			const existProd = cart.products[existProdInd];
			let updatedProd;
			// jika produk yg sama ditambahkan , + qty
			if(existProd){
				console.log("existProd");
				console.log(existProd);
				updatedProd = {...existProd};
				console.log("updatedProd");
				console.log(updatedProd);
				updatedProd.qty = updatedProd.qty + 1;
				cart.products = [...cart.products];
				cart.products[existProdInd] = updatedProd

			}else{
				updatedProd = {...product,qty:1}
				cart.products = [...cart.products,updatedProd]
			}
			cart.totalPrice += product.price*1;
			fs.writeFile(p,JSON.stringify(cart),err=>{
				console.log(err);
			})
		})
	}

	static fetchCart(cb){
		fs.readFile(p,(err,fileContent)=>{
				if(err){
					cb([]);
				}
				console.log('tes');
				console.log(JSON.parse(fileContent));
				cb(JSON.parse(fileContent));
			});
	}

	static remove(id){
		fs.readFile(p,(err,fileContent)=>{
			let cart;
				if(!err){
					cart = JSON.parse(fileContent);
					const existProdInd = cart.products.findIndex(prod=>prod.id === id);
					if(existProdInd == -1){
						return;
					}
						const prodExist = cart.products[existProdInd];
						cart.totalPrice -= prodExist.price*prodExist.qty;
						cart.products.splice(existProdInd,1);
						fs.writeFile(p,JSON.stringify(cart),err=>{
							console.log(err);
						})
				}
				console.log(err);
			});
	}
}