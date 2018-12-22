const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
	Product.fetchAll(data => {
		res.render('shop/index', {
			prods: data,
			pageTitle: 'Main page',
			path: '/',
		});
	});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(data => {
		res.render('shop/product-list', {
			prods: data,
			pageTitle: 'Products',
			path: '/products',
		});
	});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.findById(productId, p => {
		console.log(p);
	});
	res.redirect('/');
};

exports.getCart = (req, res, next) => {
	Product.fetchAll(data => {
		res.render('shop/cart', {
			prods: data,
			pageTitle: 'Your Cart',
			path: '/cart',
		});
	});
};

exports.getOrders = (req, res, next) => {
	Product.fetchAll(data => {
		res.render('shop/orders', {
			prods: data,
			pageTitle: 'Your Orders',
			path: '/orders',
		});
	});
};

exports.getCheckout = (req, res, next) => {
	Product.fetchAll(data => {
		res.render('shop/checkout', {
			prods: data,
			pageTitle: 'Checkout',
			path: '/checkout',
		});
	});
};

