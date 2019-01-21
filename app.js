const path = require('path');

const {_, it} = require('param.macro');
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

// Setup sessions
new MongoDBStore({
	collection: 'sessions',
	uri: MONGODB_URI,
})

	|> session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET,
		store: _,
	})

	|> app.use;

// Setup template engine
app.set('view engine', 'jsx');

require('express-react-views')
	|> it.createEngine()
	|> app.engine('jsx', _);

path.join(__dirname, '/views') |> app.set('views', _);

// Setup body parser
app.use(bodyParser.urlencoded({extended: false}));

// Setup static server
path.join(__dirname, 'public')
	|> express.static
	|> app.use;

app.use((req, res, next) => {
	if (!req.session.user)
		return next();

	User.findById(req.session.user._id)

		.then(user => {
			req.user = user;
			next();
		})

		.catch(console.error);
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

			return user.save();
		}
	})

	.then(() => {
		const port = process.env.PORT;
		app.listen(port, () => console.log(`Started on http://localhost:${port}`));
	})

	.catch(console.error);
