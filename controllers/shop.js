const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res) => {
	Product.fetchAll()

		.then(([rows]) => {
			res.render('shop/index', {
				pageTitle: 'Main page',
				path: '/',
				prods: rows,
			});
		})

		.catch(err => {
			console.error(err);
		});
};

exports.getProducts = (req, res) => {
	Product.fetchAll()

		.then(([rows]) => {
			res.render('shop/product-list', {
				pageTitle: 'Products',
				path: '/products',
				prods: rows,
			});
		})

		.catch(err => {
			console.error(err);
		});
};

exports.getProduct = (req, res) => {
	Product.findById(req.params.productId)

		.then(([product]) => {
			res.render('shop/product-detail', {
				pageTitle: product[0].title,
				path: '/products',
				product: product[0],
			});
		})

		.catch(err => console.error(err));
};

exports.getCart = (req, res) => {
	Cart.getCart(cart => {
		Product.fetchAll(products => {
			const cartProducts = [];

			if (cart)
				for (let product of products) {
					const cartProductData = cart.products.find(prod => prod.id === product.id);

					if (cartProductData)
						cartProducts.push({...product, qty: cartProductData.qty});
				}

			res.render('shop/cart', {
				pageTitle: 'Your Cart',
				path: '/cart',
				products: cartProducts,
				totalPrice: cart.totalPrice,
			});
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

exports.postCartDeleteProduct = (req, res) => {
	const productId = req.body.productId;

	Product.findById(productId, product => {
		Cart.delete(productId, product.price);
		res.redirect('/cart');
	});
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

