const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			console.error(err);
			return cb([]);
		}

		return cb(JSON.parse(fileContent));
	});
}

module.exports = class Product {
	constructor(title, imageUrl, description, price) {
		this.id = String(Date.now());
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile(data => {
			data.push(this)

			fs.writeFile(p, JSON.stringify(data), (err) => {
				if (err)
					console.error(err);
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static update(productId, newProductData) {
		getProductsFromFile(products => {
			const idx = products.findIndex(product => product.id === productId);
			const newProducts = [...products];

			newProducts[idx] = {
				...products[idx],
				...newProductData,
			};

			fs.writeFile(p, JSON.stringify(newProducts), err => {
				if (err)
					console.error(err);
			});
		});
	}

	static findById(id, cb) {
		getProductsFromFile(products => {
			const product = products.find(p => p.id === id);
			cb(product);
		});
	}
};
