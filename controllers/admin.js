const mongoose = require('mongoose');

const {validationResult} = require('express-validator/check');

const Product = require('../models/product');

exports.postAddProduct = (req, res) => {
	const description = req.body.description;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const title = req.body.title;
	const userId = req.user._id;
	const errors = validationResult(req);

	if(!errors.isEmpty())
		return res.render('admin/add-product', {
			errorMessage: errors.array()[0].msg,
			hasError: true,
			pageTitle: 'Add product',
			path: '/admin/add-product',

			product: {
				description: description,
				imageUrl: imageUrl,
				price: price,
				title: title,
				userId: userId,
			},
		});

	new Product({
		_id: new mongoose.Types.ObjectId('5c444462babc522eb101a89c'),
		description: description,
		imageUrl: imageUrl,
		price: price,
		title: title,
		userId: userId,
	})

		.save()
		.then(() => res.redirect('/'))

		.catch(err => {
			console.error(err);
			res.redirect('/500');

			// return res.render('admin/add-product', {
			// 	errorMessage: 'Database operation failed. Please try again.',
			// 	hasError: true,
			// 	pageTitle: 'Add product',
			// 	path: '/admin/add-product',

			// 	product: {
			// 		description: description,
			// 		imageUrl: imageUrl,
			// 		price: price,
			// 		title: title,
			// 		userId: userId,
			// 	},
			// });
		});
};

exports.getAddProduct = (req, res) => res.render('admin/add-product', {
	errorMessage: null,
	hasError: false,
	pageTitle: 'Add product',
	path: '/admin/add-product',
});

exports.getEditProduct = (req, res) => Product.findById(req.params.productId)

	.then(product => res.render('admin/edit-product', {
		hasError: false,
		pageTitle: 'Edit product',
		path: '/admin/products',
		product: product,
	}))

	.catch(console.error);

exports.postEditProduct = (req, res) => {
	const productId = req.params.productId;
	const description = req.body.description;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const title = req.body.title;
	const errors = validationResult(req);

	if(!errors.isEmpty())
		return res.render('admin/edit-product', {
			errorMessage: errors.array()[0].msg,
			hasError: true,
			pageTitle: 'Edit product',
			path: '/admin/products',

			product: {
				_id: productId,
				description: description,
				imageUrl: imageUrl,
				price: price,
				title: title,
			},
		});

	Product.findById(productId)

		.then(product => {
			if(product.userId.toString() !== req.user._id.toString())
				return res.redirect('/');

			product.description = description;
			product.imageUrl = imageUrl;
			product.price = price;
			product.title = title;

			return product.save().then(() => res.redirect('/admin/products'));
		})

		.catch(console.error);
};

exports.postDeleteProduct = (req, res) => Product.deleteOne({_id: req.body.productId, userId: req.user._id})
	.then(() => res.redirect('/admin/products'))
	.catch(console.error);

exports.getProducts = (req, res) => Product.find({userId: req.user._id})

	.then(products => res.render('admin/products', {
		pageTitle: 'Admin Products',
		path: '/admin/products',
		prods: products,
	}))

	.catch(console.error);
