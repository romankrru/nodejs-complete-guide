const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const User = require('./models/user');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-22nab.mongodb.net/test?retryWrites=true`;

const app = express();

const store = new MongoDBStore({
	collection: 'sessions',
	uri: MONGODB_URI,
});

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET,
		store: store,
	}),
);

app.use((req, res, next) => {
	// NOTE: create user by hand before starting the app
	User.findById('5c444332351d0a2da7422c8b')

		.then(user => {
			req.user = user;
			next();
		})

		.catch(err => {
			console.error(err);
		});
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
	.connect(MONGODB_URI, {useNewUrlParser: true})
	.then(() => User.findOne())

	.then(user => {
		if (!user) {
			const user = new User({
				cart: {items: []},
				email: 'test@test.com',
				name: 'Roman',
			});

			user.save();
		}
	})

	.then(() => {
		const port = process.env.PORT;
		app.listen(port, () => console.log(`Started on http://localhost:${port}`));
	})

	.catch(err => console.error(err));
