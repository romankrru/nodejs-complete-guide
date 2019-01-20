const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	description: {
		required: true,
		type: String,
	},

	imageUrl: {
		required: true,
		type: String,
	},

	price: {
		required: true,
		type: Number,
	},

	title: {
		required: true,
		type: String,
	},

	userId: {
		ref: 'User',
		required: true,
		type: Schema.Types.ObjectId,
	},
});

module.exports = mongoose.model('Product', productSchema);
