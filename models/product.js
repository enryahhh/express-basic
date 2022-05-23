const path = require('path');
const fs = require('fs');

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
	

	constructor(nama,imageUrl,price,desc){
		this.id = +new Date();
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
}
