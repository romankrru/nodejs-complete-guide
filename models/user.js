const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
	email: Sequelize.STRING,

	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},

	name: Sequelize.STRING,
});

module.exports = User;
