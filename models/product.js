const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');


const getProductsFromFile = (cb) => {
	const p = path.join(rootDir, 'data', 'products.json');

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
		this.id = Date.now();
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		const p = path.join(rootDir, 'data', 'products.json');

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
};
