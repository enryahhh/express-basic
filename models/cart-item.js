const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const CartItem = sequelize.define('cart_item',{
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

module.exports = CartItem;

