const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res) => {
	Product.find()

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
	Product.find()

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
	req.user
		.populate('cart.items.productId')
		.execPopulate()

		.then(user => {
			res.render('shop/cart', {
				pageTitle: 'Your Cart',
				path: '/cart',
				products: user.cart.items,
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

	req.user.removeFromCart(productId)
		.then(() => res.redirect('/cart'))
		.catch(err => console.error(err));
};

exports.postOrder = (req, res) => {
	req.user
		.populate('cart.items.productId')
		.execPopulate()

		.then(user => {
			const products = user.cart.items.map(i => {
				return {
					product: {...i.productId._doc},
					quantity: i.quantity,
				};
			});

			const order = new Order({
				products: products,

				user: {
					name: req.user.name,
					userId: req.user._id,
				},
			});

			return order.save();
		})

		.then(() => req.user.clearCart())
		.then(() => res.redirect('/orders'))
		.catch(console.error);
};

exports.getOrders = (req, res) => {
	req.user
		.getOrders()

		.then(orders => {
			res.render('shop/orders', {
				orders: orders,
				pageTitle: 'Your Orders',
				path: '/orders',
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

