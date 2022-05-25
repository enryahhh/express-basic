const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Product = sequelize.define('product',{
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	name: Sequelize.STRING,
	img: {
		allowNull:false,
		type:Sequelize.STRING
	},
	price:{
		type: Sequelize.DOUBLE,
		allowNull:false,
	},
	stok:{
		type: Sequelize.INTEGER,
		allowNull:false,
	},
	description:{
		type: Sequelize.STRING,
		allowNull:false,
	}
},{
	timestamps: false
});

module.exports = Product;

