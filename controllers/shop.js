const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

const ITEMS_PER_PAGE = 2;

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
	const page = req.query.page;

	Product
		.find()
		.skip((page - 1) * ITEMS_PER_PAGE)
		.limit(ITEMS_PER_PAGE)

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
					email: req.user.email,
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
	Order.find({'user.userId': req.user._id})

		.then(orders => {
			res.render('shop/orders', {
				orders: orders,
				pageTitle: 'Your Orders',
				path: '/orders',
			});
		})

		.catch(console.error);
};

exports.getInvoice = (req, res, next) => {
	const orderId = req.params.orderId;

	Order.findById(orderId)

		.then(order => {
			if(!order)
				return next(new Error('No order found.'));

			if(order.user.userId.toString() !== req.user._id.toString())
				return next(new Error('You are not allowed to download this invoice.'));

			const invoiceName = `invoice-${orderId}.pdf`;
			const pdfDoc = new PDFDocument();

			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`);

			pdfDoc.pipe(res);

			pdfDoc.fontSize(26).text('Invoice', {
				underline: true,
			});

			let totalPrice = 0;

			order.products.forEach(prod => {
				totalPrice += prod.quantity * prod.product.price;

				pdfDoc
					.fontSize(12)
					.text(`${prod.product.title} - ${prod.quantity} x $${prod.product.price}`);
			});

			pdfDoc.text('--------------------');
			pdfDoc.fontSize(20).text(`Total: $${totalPrice}`);

			pdfDoc.end();
		})

		.catch(next);
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

