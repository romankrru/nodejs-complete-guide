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
		return db.execute(
			'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
			[this.title, this.price, this.imageUrl, this.description],
		);
	}

	static delete() {
	}

	static fetchAll() {
		return db.execute('SELECT * FROM products');
	}

	static update() {
	}

	static findById(id) {
		return db.execute(
			'SELECT * FROM products WHERE products.id = ?',
			[id],
		);
	}
};
