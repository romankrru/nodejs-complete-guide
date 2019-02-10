const express = require('express');
const {check, body} = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post(
	'/login',

	[
		body('email', 'Please enter a valid email.').isEmail(),

		body('password', 'Please enter a password with only numbers and text and at least 3 characters.')
			.isLength({min: 3})
			.isAlphanumeric(),
	],

	authController.postLogin
);

router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);

router.post(
	'/signup',

	[
		check('email')
			.isEmail()
			.withMessage('Please enter a valid email.')

			.custom(value => {
				return User.findOne({email: value})

					.then(userDoc => {
						if(userDoc)
							return Promise.reject('Email exists already, please pick a different one.');
					});
			}),

		body('password', 'Please enter a password with only numbers and text and at least 3 characters.')
			.isLength({min: 3})
			.isAlphanumeric(),

		body('confirmPassword').custom((value, {req}) => {
			if(value !== req.body.password)
				throw new Error('Passwords have to match.');

			return true;
		}),
	],

	authController.postSignup
);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
