const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res) => {
	Product.fetchAll(data => {
		res.render('shop/index', {
			pageTitle: 'Main page',
			path: '/',
			prods: data,
		});
	});
};

exports.getProducts = (req, res) => {
	Product.fetchAll(data => {
		res.render('shop/product-list', {
			pageTitle: 'Products',
			path: '/products',
			prods: data,
		});
	});
};

exports.getProduct = (req, res) => {
	Product.findById(req.params.productId, p => {
		res.render('shop/product-detail', {
			pageTitle: p.title,
			path: '/products',
			product: p,
		});
	});
};

exports.getCart = (req, res) => {
	Product.fetchAll(data => {
		res.render('shop/cart', {
			pageTitle: 'Your Cart',
			path: '/cart',
			prods: data,
		});
	});
};

exports.postCart = (req, res) => {
	const productId = req.body.productId;

	Product.findById(productId, product => {
		Cart.addProduct(productId, product.price);
	});

	res.redirect('/cart');
};

exports.getOrders = (req, res) => {
	Product.fetchAll(data => {
		res.render('shop/orders', {
			pageTitle: 'Your Orders',
			path: '/orders',
			prods: data,
		});
	});
};

exports.getCheckout = (req, res) => {
	Product.fetchAll(data => {
		res.render('shop/checkout', {
			pageTitle: 'Checkout',
			path: '/checkout',
			prods: data,
		});
	});
};

