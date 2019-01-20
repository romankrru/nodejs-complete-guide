const User = require('../models/user');

exports.getLogin = (req, res) => {
	res.render('auth/login', {
		isLoggedIn: req.session.isLoggedIn,
		pageTitle: 'Login',
		path: '/login',
	});
};

exports.postLogin = (req, res) => {
	// NOTE: create user by hand before starting the app
	User.findById('5c444332351d0a2da7422c8b')

		.then(user => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			res.redirect('/');
		})

		.catch(err => {
			console.error(err);
		});
};
