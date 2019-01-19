const Product = require('../models/product');

exports.getIndex = (req, res) => {
	Product.fetchAll()

		.then(products => {
			res.render('shop/index', {
				pageTitle: 'Main page',
				path: '/',
				prods: products,
			});
		})

		.catch(err => console.error(err));
};

exports.getProducts = (req, res) => {
	Product.fetchAll()

		.then(products => {
			res.render('shop/product-list', {
				pageTitle: 'Products',
				path: '/products',
				prods: products,
			});
		})

		.catch(err => console.error(err));
};

exports.getProduct = (req, res) => {
	Product.findById(req.params.productId)

		.then(product => {
			res.render('shop/product-detail', {
				pageTitle: product.title,
				path: '/products',
				product: product,
			});
		})

		.catch(err => console.error(err));
};

exports.getCart = (req, res) => {
	req.user.getCart()
		.then(products => {
			res.render('shop/cart', {
				pageTitle: 'Your Cart',
				path: '/cart',
				products: products,
			});
		})

		.catch(err => console.err(err));
};

exports.postCart = (req, res) => {
	const productId = req.body.productId;

	Product.findById(productId)

		.then(product => {
			return req.user.addToCart(product);
		})

		.then(() => {
			res.redirect('/cart');
		})

		.catch(console.error);
};

exports.postCartDeleteProduct = (req, res) => {
	const productId = req.body.productId;

	req.user.deleteItemFromCart(productId)
		.then(() => res.redirect('/cart'))
		.catch(err => console.error(err));
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

