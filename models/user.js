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
	const idx = fp.findIndex(
		fp.flow(
			fp.get('productId'),
			fp.concat(product._id),
			fp.map(String),
			fp.apply(fp.eq),
		),

		this.cart.items,
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

module.exports = mongoose.model('User', userSchema);
