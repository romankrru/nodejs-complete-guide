if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

const path = require('path');

const {_, it} = require('param.macro');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const User = require('./models/user');

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

require('express-react-static-markup')
	|> it.createEngine()
	|> app.engine('jsx', _);

path.join(__dirname, '/views') |> app.set('views', _);

// Setup body parser
bodyParser.urlencoded({extended: false}) |> app.use;

// Setup CSRF protection
csrf() |> app.use;

flash() |> app.use;

// Setup static server
path.join(__dirname, 'public')
	|> express.static
	|> app.use;

app.use((req, res, next) => {
	if (!req.session.user)
		return next();

	User.findById(req.session.user._id)

		.then(user => {
			if(!user)
				return next();

			req.user = user;
			next();
		})

		.catch(err => {
			throw new Error(err);
		});
});

// Add locals for views
app.use((req, res, next) => {
	res.locals.isLoggedIn = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
	.connect(MONGODB_URI, {useNewUrlParser: true})

	.then(() => {
		const port = process.env.PORT;
		app.listen(port, () => console.log(`Started on http://localhost:${port}`));
	})

	.catch(console.error);
