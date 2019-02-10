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
		description: description,
		imageUrl: imageUrl,
		price: price,
		title: title,
		userId: userId,
	})

		.save()
		.then(() => res.redirect('/'))
		.catch(err => console.error(err));
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

	.catch(err => console.error(err));

exports.postEditProduct = (req, res) => {
	Product.findById(req.params.productId)

		.then(product => {
			if (product.userId.toString() !== req.user._id.toString())
				return res.redirect('/');

			product.description = req.body.description;
			product.imageUrl = req.body.imageUrl;
			product.price = req.body.price;
			product.title = req.body.title;

			return product.save().then(() => res.redirect('/admin/products'));
		})

		.catch(err => console.error(err));
};

exports.postDeleteProduct = (req, res) => Product.deleteOne({_id: req.body.productId, userId: req.user._id})
	.then(() => res.redirect('/admin/products'))
	.catch(err => console.error(err));

exports.getProducts = (req, res) => Product.find({userId: req.user._id})

	.then(products => res.render('admin/products', {
		pageTitle: 'Admin Products',
		path: '/admin/products',
		prods: products,
	}))

	.catch(err => console.error(err));
