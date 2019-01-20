const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	cart: {
		items: [{
			productId: {
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

module.exports = mongoose.model('User', userSchema);
