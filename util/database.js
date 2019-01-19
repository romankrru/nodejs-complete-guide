const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
	return MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-22nab.mongodb.net/test?retryWrites=true`)

		.then(client => {
			console.log('connected to mongoDb');
			_db = client.db();
		})

		.catch(err => {
			console.error(err);
			throw(err);
		});
};

const getDb = () => {
	if(_db)
		return _db;

	throw 'No db found!';
};

exports = mongoConnect;
exports.getDb = getDb;
