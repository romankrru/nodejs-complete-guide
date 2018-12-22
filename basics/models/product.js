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
	constructor(title) {
		this.title = title;
	}

	save() {
		const p = path.join(rootDir, 'data', 'products.json');

		getProductsFromFile(data => {
			data.push(this)

			fs.writeFile(p, JSON.stringify(data), (err) => {
				console.error(err);
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}
};