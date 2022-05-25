const db = require('mysql2');

const pool = db.createPool({
	host:'localhost:3307',
	user:'root',
	password:'',
	database:''
})

module.exports = pool.promise();

