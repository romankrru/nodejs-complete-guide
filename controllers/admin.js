const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/');
};

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
	});
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
