const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const {it} = require('param.macro');
const fp = require('lodash/fp');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const {validationResult} = require('express-validator/check');

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

exports.getNewPassword = (req, res) => {
	const token = req.params.token;

	User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})

		.then(user => {
			res.render('auth/new-password', {
				errorMessage: req.flash('error'),
				pageTitle: 'New password',
				passwordToken: token,
				path: '/new-password',
				userId: user._id.toString(),
			});
		})

		.catch(console.error);
};

exports.postLogin = (req, res) => {
	const errors = validationResult(req);
	const email = req.body.email;
	const password = req.body.password;

	const showError = errors => res.status(422).render('auth/login', {
		errorMessage: errors ? errors.array()[0].msg : 'Invalid email or password.',

		invalidFields: errors
			? errors
				|> it.array()
				|> fp.map(it.param)

			: ['email', 'password'],

		oldInput: {
			email: email,
			password: password,
		},

		pageTitle: 'Login',
		path: '/login',
	});

	if(!errors.isEmpty())
		return showError(errors);

	User.findOne({email: email})

		.then(user => {
			if(!user)
				return showError();

			bcrypt.compare(password, user.password)

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

					return showError();
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
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(422).render('auth/signup', {
			errorMessage: errors.array()[0].msg,

			invalidFields: errors
				|> it.array()
				|> fp.map(it.param),

			oldInput: {
				confirmPassword: req.body.confirmPassword,
				email: email,
				password: password,
			},

			pageTitle: 'Signup',
			path: '/signup',
		});
	}

	bcrypt
		.hash(password, 12)

		.then(hashedPassword => {
			const user = new User({
				cart: {items: []},
				email: email,
				password: hashedPassword,
			});

			return user.save();
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

exports.postReset = (req, res) => {
	crypto.randomBytes(32, (err, buffer) => {
		if(err) {
			console.error(err);
			return res.redirect('/reset');
		}

		const token = buffer.toString('hex');

		User.findOne({email: req.body.email})

			.then(user => {
				if(!user) {
					req.flash('error', 'No account with that email found.');
					res.redirect('/reset');
				}

				user.resetToken = token;
				user.resetTokenExpiration = Date.now() + (1000 * 60 * 60);
				return user.save();
			})

			.then(() => {
				res.redirect('/');

				transporter.sendMail({
					from: 'shop@node-complete.com',

					html: `
						<p>You requested password reset.</p>

						<p>
							Click this
							<a href="http://localhost:${process.env.PORT}/reset/${token}">link</a>
							to reset password.
						</p>
					`,

					subject: 'Password reset',
					to: req.body.email,
				});
			})

			.catch(console.error);
	});
};

exports.postNewPassword = (req, res) => {
	const newPassword = req.body.password;
	const userId = req.body.userId;
	const passwordToken = req.body.passwordToken;
	let resetUser;

	User.findOne({
		_id: userId,
		resetToken: passwordToken,
		resetTokenExpiration: {$gt: Date.now()},
	})

		.then(user => {
			resetUser = user;
			return bcrypt.hash(newPassword, 12);
		})

		.then(hashedPassword => {
			resetUser.password = hashedPassword;
			resetUser.resetToken = undefined;
			resetUser.resetTokenExpiration = undefined;
			return resetUser.save();
		})

		.then(() => {
			res.redirect('/login');
		})

		.catch(console.error);
};
