const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Order = sequelize.define('order',{
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	address:{
		type: Sequelize.STRING
	}
});

module.exports = Order;