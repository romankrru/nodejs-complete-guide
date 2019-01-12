const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},

	// userId: {
	// 	type: Sequelize.INTEGER,
	// 	unique: true,
	// },
});

module.exports = Cart;
