const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
	});
};

exports.postAddProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(data => {
		res.render('shop/product-list', {
			prods: data,
			pageTitle: 'Shop',
			path: '/',
		});
	});
}
