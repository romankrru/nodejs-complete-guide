const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = () => {
	return MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-22nab.mongodb.net/test?retryWrites=true`)

		.then(client => {
			console.log('connected to mongoDb');
			return client;
		})

		.catch(err => console.error(err));
};

module.exports = mongoConnect;
