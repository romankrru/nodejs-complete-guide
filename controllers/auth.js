const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
	res.render('auth/login', {
		pageTitle: 'Login',
		path: '/login',
	});
};

exports.getSignup = (req, res) => {
	res.render('auth/signup', {
		pageTitle: 'Signup',
		path: '/signup',
	});
};

exports.postLogin = (req, res) => {
	User.findOne({email: req.body.email})

		.then(user => {
			if(!user)
				return res.redirect('/login');

			bcrypt.compare(req.body.password, user.password)

				.then(isMatch => {
					if(isMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;

						return req.session.save(err => {
							if (err)
								console.error(err);

							res.redirect('/');
						});
					}

					res.redirect('/login');
				})

				.catch(err => {
					console.error(err);
					res.redirect('/login');
				});
		})

		.catch(console.error);
};

exports.postSignup = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	// const confirmPassword = req.body.confirmPassword;

	User.findOne({email: email})

		.then(userDoc => {
			if(userDoc)
				return res.redirect('/signup');

			return bcrypt.hash(password, 12)
				.then(hashedPassword => {
					const user = new User({
						cart: {items: []},
						email: email,
						password: hashedPassword,
					});

					return user.save();
				});
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
