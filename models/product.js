const {getDb} = require('../util/database');

class Product {
	constructor({
		title,
		price,
		description,
		imageUrl,
	}) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
	}

	save() {

	}
}

// const Product = sequelize.define('product', {
// 	description: {
// 		allowNull: false,
// 		type: Sequelize.STRING,
// 	},

// 	id: {
// 		allowNull: false,
// 		autoIncrement: true,
// 		primaryKey: true,
// 		type: Sequelize.INTEGER,
// 	},

// 	imageUrl: {
// 		allowNull: false,
// 		type: Sequelize.STRING,
// 	},

// 	price: {
// 		allowNull: false,
// 		type: Sequelize.DOUBLE,
// 	},

// 	title: Sequelize.STRING,
// });

module.exports = Product;
