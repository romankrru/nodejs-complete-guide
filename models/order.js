const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	products: [{
		product: {
			required: true,
			type: Object,
		},

		quantity: {
			required: true,
			type: Number,
		},
	}],

	user: {
		email: {
			required: true,
			type: String,
		},

		userId: {
			ref: 'User',
			required: true,
			type: Schema.Types.ObjectId,
		},
	},
});

module.exports = mongoose.model('Order', orderSchema);
