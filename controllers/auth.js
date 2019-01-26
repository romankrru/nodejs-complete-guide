const User = require('../models/user');

exports.getLogin = (req, res) => {
	res.render('auth/login', {
		isLoggedIn: req.session.isLoggedIn,
		pageTitle: 'Login',
		path: '/login',
	});
};

exports.getSignup = (req, res) => {
	res.render('auth/signup', {
		isLoggedIn: req.session.isLoggedIn,
		pageTitle: 'Signup',
		path: '/signup',
	});
};

exports.postLogin = (req, res) => {
	// NOTE: create user by hand before starting the app
	User.findById('5c444332351d0a2da7422c8b')

		.then(user => {
			req.session.isLoggedIn = true;
			req.session.user = user;

			req.session.save(err => {
				if (err)
					console.error(err);

				res.redirect('/');
			});
		})

		.catch(err => {
			console.error(err);
		});
};

exports.postSignup = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	// const confirmPassword = req.body.confirmPassword;

	User.findOne({email: email})

		.then(userDoc => {
			if(userDoc)
				return res.redirect('/signup');

			const user = new User({
				cart: {items: []},
				email: email,
				password: password,
			});

			return user.save();
		})

		.then(() => res.redirect('/login'))
		.catch(console.error);
};

exports.postLogout = (req, res) => {
	req.session.destroy(err => {
		if (err)
			console.error(err);

		res.redirect('/');
	});
};
