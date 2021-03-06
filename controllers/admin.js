const {validationResult} = require('express-validator/check');

const handleError = require('../util/handleError');
const Product = require('../models/product');
const fileHelper = require('../util/file');

exports.postAddProduct = (req, res, next) => {
	const description = req.body.description;
	const image = req.file;
	const price = req.body.price;
	const title = req.body.title;
	const userId = req.user._id;
	const errors = validationResult(req);

	if(!image)
		return res.render('admin/add-product', {
			errorMessage: 'Attached file is not an image.',
			hasError: true,
			pageTitle: 'Add product',
			path: '/admin/add-product',

			product: {
				description: description,
				image: image,
				price: price,
				title: title,
				userId: userId,
			},
		});

	if(!errors.isEmpty())
		return res.render('admin/add-product', {
			errorMessage: errors.array()[0].msg,
			hasError: true,
			pageTitle: 'Add product',
			path: '/admin/add-product',

			product: {
				description: description,
				price: price,
				title: title,
				userId: userId,
			},
		});

	new Product({
		description: description,
		imageUrl: image.path,
		price: price,
		title: title,
		userId: userId,
	})

		.save()
		.then(() => res.redirect('/admin/products'))
		.catch(handleError(next));
};

exports.getAddProduct = (req, res) => res.render('admin/add-product', {
	errorMessage: null,
	hasError: false,
	pageTitle: 'Add product',
	path: '/admin/add-product',
});

exports.getEditProduct = (req, res, next) => Product.findById(req.params.productId)

	.then(product => res.render('admin/edit-product', {
		hasError: false,
		pageTitle: 'Edit product',
		path: '/admin/products',
		product: product,
	}))

	.catch(handleError(next));

exports.postEditProduct = (req, res, next) => {
	const productId = req.params.productId;
	const description = req.body.description;
	const image = req.file;
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
				price: price,
				title: title,
			},
		});

	Product.findById(productId)

		.then(product => {
			if(product.userId.toString() !== req.user._id.toString())
				return res.redirect('/');

			product.description = description;

			if(image) {
				fileHelper.deleteFile(product.imageUrl);
				product.imageUrl = image.path;
			}

			product.price = price;
			product.title = title;

			return product.save().then(() => res.redirect('/admin/products'));
		})

		.catch(handleError(next));
};

exports.deleteProduct = (req, res, next) => {
	const prodId = req.params.productId;

	Product.findById(prodId)

		.then(product => {
			if(!product)
				return next(new Error('Product not found.'));

			fileHelper.deleteFile(product.imageUrl);
			return Product.deleteOne({_id: prodId, userId: req.user._id});
		})

		.then(() => res.status(200).json({message: 'Success'}))
		.catch(() => res.status(500).json({message: 'Deleting product failed!'}));
};

exports.getProducts = (req, res, next) => Product.find({userId: req.user._id})

	.then(products => res.render('admin/products', {
		pageTitle: 'Admin Products',
		path: '/admin/products',
		prods: products,
	}))

	.catch(handleError(next));
