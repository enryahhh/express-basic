const path = require('path');
const fs = require('fs');
const conn = require('./util/db')
const Cart = require('../models/cart')
const products = [];


const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');	
const prodProm = new Promise((resolve,reject)=>{
				fs.readFile(p,(err,fileContent)=>{
				if(err){
					resolve([]);
				}
				// console.log(JSON.parse(fileContent));
				resolve(JSON.parse(fileContent));
			})
		});

module.exports = class Product {
	

	constructor(id,nama,imageUrl,price,desc){
		this.id = id;
		this.name = nama;
		this.imageUrl = imageUrl;
		this.desc = desc;
		this.price = price;
	}

	save(){
		fs.readFile(p,(err,fileContent)=>{
			console.log(fileContent);
			prodProm.then(value=>{
				console.log(this);
				value.push(this);
				console.log(value);
				fs.writeFile(p,JSON.stringify(value),(err,fileContent)=>{
					console.log(err);
				});
			})
			
		})
	}

	static fetchAll(){
		const sql = "SELECT * FROM product";
		
		let products;
		console.log(prodProm.then((products)=>products));
		return prodProm;
	}

	static findById(id,cb){
		let product;
		prodProm.then((products)=>{
			product = products.find(prod=>prod.id == id);
			cb(product);
		});
	}

	update(id,product){
		prodProm.then((products)=>{
			const productInd = products.findIndex(prod=>prod.id == id);
			const updatedProd = [...products];
			console.log(updatedProd);
			updatedProd[productInd] = product;
			fs.writeFile(p,JSON.stringify(updatedProd),(err,fileContent)=>{
					console.log(err);
				});
		});	
	}

	static delete(id){
		prodProm.then((products)=>{
			const productInd = products.findIndex(prod=>prod.id == id);
			const updatedProd = [...products];
			Cart.remove(id);
			updatedProd.splice(productInd,1);
			fs.writeFile(p,JSON.stringify(updatedProd),(err,fileContent)=>{
					console.log(err);
				});
		});		
	}
}
