const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res) => {
	Product.findAll()

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
	Product.findAll()

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
	Product.findByPk(req.params.productId)

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
		.then(cart => {
			return cart.getProducts();
		})

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
	let fetchedCart;
	let newQuantity = 1;

	req.user.getCart()

		.then(cart => {
			fetchedCart = cart;
			return cart.getProducts({where: {id: productId}});
		})

		.then(products => {
			let product;

			if(products.length > 0)
				product = products[0];


			if(product) {
				const oldQuantity = product.cartItem.quantity;
				newQuantity = oldQuantity + 1;
				return product;
			}

			return Product.findByPk(productId);
		})

		.then(product => {
			return fetchedCart.addProduct(product, {through: {
				quantity: newQuantity,
			}});
		})

		.then(() => res.redirect('/cart'))

		.catch(err => console.error(err));
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

