const {ObjectID} = require('mongodb');

const {getDb} = require('../util/database');

class Product {
	constructor({
		title,
		price,
		description,
		imageUrl,
		_id,
		userId,
	}) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this._id = _id ? new ObjectID(_id) : null;
		this.userId = userId;
	}

	save() {
		if (this._id)
			// update the product
			return getDb().collection('products').updateOne(
				{_id: this._id},
				{$set: this}
			);

		// add new
		return getDb().collection('products').insertOne(this);
	}

	static fetchAll() {
		return getDb().collection('products').find().toArray();
	}

	static findById(prodId) {
		return getDb().collection('products').find({_id: new ObjectID(prodId)}).next();
	}

	static deleteById(prodId) {
		return getDb().collection('products').deleteOne({_id: new ObjectID(prodId)});
	}
}

module.exports = Product;
