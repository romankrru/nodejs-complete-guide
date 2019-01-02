const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
	description: {
		allowNull: false,
		type: Sequelize.STRING,
	},

	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},

	imageUrl: {
		allowNull: false,
		type: Sequelize.STRING,
	},

	price: {
		allowNull: false,
		type: Sequelize.DOUBLE,
	},

	title: Sequelize.STRING,
});

module.exports = Product;
