const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fp = require('lodash/fp');

const userSchema = new Schema({
	cart: {
		items: [{
			productId: {
				ref: 'Product',
				require: true,
				type: Schema.Types.ObjectId,
			},

			quantity: {
				required: true,
				type: Number,
			},
		}],
	},

	email: {
		required: true,
		type: String,
	},

	name: {
		required: true,
		type: String,
	},
});

userSchema.methods.addToCart = function(product) {
	const idx = this.cart.items
		|> fp.findIndex(cartItem => [cartItem.productId, product._id]
			|> fp.map(fp.toString)
			|> fp.apply(fp.eq)
		);

	if (idx > -1) {
		// update qty
		this.cart.items[idx].quantity = this.cart.items[idx].quantity + 1;
	} else {
		// push new product
		this.cart.items.push({
			productId: product._id,
			quantity: 1,
		});
	}

	return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
	this.cart.items = this.cart.items
		|> fp.reject(cartItem => [cartItem.productId, productId]
			|> fp.map(fp.toString)
			|> fp.apply(fp.eq)
		);

	return this.save();
};

userSchema.methods.clearCart = function() {
	this.cart = {items: []};
	return this.save();
};

module.exports = mongoose.model('User', userSchema);
