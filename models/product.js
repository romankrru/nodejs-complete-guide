const db = require('../util/database');

module.exports = class Product {
	constructor(title, imageUrl, description, price) {
		this.id = String(Date.now());
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
	}

	static delete() {
	}

	static fetchAll() {
		return db.execute('SELECT * FROM products');
	}

	static update() {
	}

	static findById() {
	}
};
