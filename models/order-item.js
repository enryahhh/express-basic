const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const OrderItem = sequelize.define('order_item',{
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
    qty:{
        type:Sequelize.INTEGER
    }
});

module.exports = OrderItem;

