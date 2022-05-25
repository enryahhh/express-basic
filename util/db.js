const db = require('mysql2');

const pool = db.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'shop_node',
	port:3307
})

module.exports = pool.promise();

