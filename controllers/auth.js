const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = sendgridTransport({auth: {api_key: process.env.SENDGRID_API_KEY}})
	|> nodemailer.createTransport;

exports.getLogin = (req, res) => {
	res.render('auth/login', {
		errorMessage: req.flash('error'),
		pageTitle: 'Login',
		path: '/login',
	});
};

exports.getSignup = (req, res) => {
	res.render('auth/signup', {
		errorMessage: req.flash('error'),
		pageTitle: 'Signup',
		path: '/signup',
	});
};

exports.getReset = (req, res) => {
	res.render('auth/reset', {
		errorMessage: req.flash('error'),
		pageTitle: 'Reset Password',
		path: '/reset',
	});
};

exports.postLogin = (req, res) => {
	const redirectOnError = () => {
		req.flash('error', 'Invalid email or password.');

		return req.session.save(err => {
			if(err)
				console.error(err);

			return res.redirect('/login');
		});
	};

	User.findOne({email: req.body.email})

		.then(user => {
			if(!user) {
				return redirectOnError();
			}

			bcrypt.compare(req.body.password, user.password)

				.then(isMatch => {
					if(isMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;

						return req.session.save(err => {
							if(err)
								console.error(err);

							res.redirect('/');
						});
					}

					return redirectOnError();
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
			if(userDoc) {
				req.flash('error', 'Email exists already, please pick a different one.');

				req.session.save(err => {
					if(err)
						return console.error(err);

					return res.redirect('/signup');
				});
			}

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

		.then(() => {
			res.redirect('/login');

			return transporter.sendMail({
				from: 'shop@node-complete.com',
				html: '<h1>You successfully signed up!</h1>',
				subject: 'Successful signup',
				to: email,
			});
		})

		.catch(console.error);
};

exports.postLogout = (req, res) => {
	req.session.destroy(err => {
		if (err)
			console.error(err);

		res.redirect('/');
	});
};
