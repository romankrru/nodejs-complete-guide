const {ObjectId} = require('mongodb');

const {getDb} = require('../util/database');

class User {
	constructor({
		username,
		email,
		cart,
		_id,
	}) {
		this.name = username;
		this.email = email;
		this.cart = cart; // {items: []}
		this._id = _id;
	}

	save() {
		return getDb().collection('users').insertOne(this);
	}

	addToCart(product) {
		const cartProductIndex = this.cart.items.findIndex(cp => {
			return cp.productId.toString() === product._id.toString();
		});

		let newQuantity = 1;
		const updatedCartItems = [...this.cart.items];

		if (cartProductIndex > -1) {
			newQuantity = this.cart.items[cartProductIndex].quantity + 1;
			updatedCartItems[cartProductIndex].quantity = newQuantity;
		} else {
			updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity});
		}

		const updatedCart = {
			items: updatedCartItems,
		};

		return getDb().collection('users').updateOne({_id: new ObjectId(this._id)}, {
			$set: {
				cart: updatedCart,
			},
		});
	}

	static findById(userId) {
		return getDb().collection('users').findOne({_id: new ObjectId(userId)});
	}
}

module.exports = User;
