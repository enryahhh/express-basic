const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const User = sequelize.define('user',{
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	name: Sequelize.STRING,
	email: {
		allowNull:false,
		type:Sequelize.STRING
	},
	password:{
		type: Sequelize.STRING,
		allowNull:false,
	},
},{
	timestamps: false
});

module.exports = User;