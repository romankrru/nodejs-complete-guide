const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const {mongoConnect} = require('./util/database');
const User = require('./models/user');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

const app = express();

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.use((req, res, next) => {
	// NOTE: create user by hand before starting the app

	User.findById('5c431434b34688310bfb21d6')

		.then(user => {
			req.user = user;
			next();
		})

		.catch(err => {
			console.error(err);
		});
});

mongoConnect()

	.then(() => {
		const port = process.env.PORT;

		app.listen(port, () => console.log(`Started on http://localhost:${port}`));
	})

	.catch(err => console.error(err));
