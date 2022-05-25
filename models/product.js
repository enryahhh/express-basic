const conn = require('../util/db')
const Cart = require('../models/cart')

module.exports = class Product {
	

	constructor(nama,imageUrl,price,desc,stok){
		this.name = nama;
		this.imageUrl = imageUrl;
		this.desc = desc;
		this.price = price;
		this.stok = stok;
	}

	save(){
		const sql = `INSERT INTO products VALUES(NULL,'${this.name}','${this.imageUrl}','${this.price}','${this.stok}','${this.desc}')`;
		console.log(sql);
		return conn.execute(sql);
	}

	static fetchAll(){
		const sql = "SELECT * FROM products";
		return conn.execute(sql);
	}

	static findById(id){
		const sql = `SELECT * FROM products WHERE id = ${id}`;
		return conn.execute(sql);
	}

	update(id,product){
		const sql = `UPDATE products SET name = '${product.name}',img = '${product.imageUrl}',price = '${product.price}', description = '${product.desc}' WHERE id = ${id}`;
		console.log(sql);
		return conn.execute(sql);
	}

	static delete(id){
		const sql = `DELETE FROM products WHERE id = ${id}`;
		return conn.execute(sql);
	}
}
