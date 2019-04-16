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
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-22nab.mongodb.net/test?retryWrites=true`;

const app = express();

// Setup sessions
session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.SESSION_SECRET,

	store: new MongoDBStore({
		collection: 'sessions',
		uri: MONGODB_URI,
	}),
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

// Setup multer
multer({
	fileFilter: (req, file, cb) => cb(
		null,
		['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)
	),

	storage: multer.diskStorage({
		destination: (req, file, cb) => cb(null, 'images'),
		filename: (req, file, cb) => cb(null, `${uuidv4()}___${file.originalname}`),
	}),
})

	|> it.single('image')
	|> app.use;

// Setup CSRF protection
csrf() |> app.use;

flash() |> app.use;

// Setup static server
path.join(__dirname, 'public')
	|> express.static
	|> app.use;

path.join(__dirname, 'images')
	|> express.static
	|> app.use('/images', _);

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
			next(new Error(err));
		});
});

// Add locals for views
app.use((req, res, next) => {
	res.locals.isLoggedIn = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
});

// Declare routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.get('/500', errorController.get500);
app.use(errorController.get404);

// Add error handling middleware
app.use((error, req, res, next) => res.status(500).render('500', { // eslint-disable-line no-unused-vars
	pageTitle: 'Error!',
	path: '/500',
}));

mongoose
	.connect(MONGODB_URI, {useNewUrlParser: true})

	.then(() => {
		const port = process.env.PORT;
		app.listen(port, () => console.log(`Started on http://localhost:${port}`));
	})

	.catch(console.error);
