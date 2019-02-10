const express = require('express');
const {body} = require('express-validator/check');

const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const productValidators = [
	body('title', 'Title should be a string and at least 3 characters long.')
		.isString()
		.isLength({min: 3})
		.trim(),

	body('imageUrl', 'Image url should be a valid url.').isURL(),
	body('price', 'Price should be a floating number.').isFloat(),

	body('description', 'Description should have min length of 5 and max length of 400.')
		.isLength({max: 400, min: 5})
		.trim(),
];

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post(
	'/add-product',
	productValidators,
	isAuth,
	adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
	'/edit-product/:productId',
	productValidators,
	isAuth,
	adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);
router.get('/products', isAuth, adminController.getProducts);

module.exports = router;
