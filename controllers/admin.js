const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;

	const product = new Product(req.body.title, imageUrl, description, price);
	product.save();
	res.redirect('/');
};

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
	});
};

exports.getEditProduct = (req, res, next) => {
	Product.findById(req.params.productId, product => {
		res.render('admin/edit-product', {
			pageTitle: 'Edit product',
			product: product,
			path: '/admin/products',
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const productId = req.params.productId

	Product.update(productId, {
		title: req.body.title,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		description: req.body.description,
	});

	res.redirect('/admin/products')
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(data => {
		res.render('admin/products', {
			prods: data,
			pageTitle: 'Admin Products',
			path: '/admin/products',
		});
	});
}
