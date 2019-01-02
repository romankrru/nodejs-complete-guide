const Product = require('../models/product');

exports.postAddProduct = (req, res) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;

	const product = new Product(
		title,
		imageUrl,
		description,
		price,
	);

	product.save()
		.then(() => res.redirect('/'))
		.catch(err => console.error(err));
};

exports.getAddProduct = (req, res) => {
	res.render('admin/add-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
	});
};

exports.getEditProduct = (req, res) => {
	Product.findById(req.params.productId, product => {
		res.render('admin/edit-product', {
			pageTitle: 'Edit product',
			path: '/admin/products',
			product: product,
		});
	});
};

exports.postEditProduct = (req, res) => {
	const productId = req.params.productId;

	Product.update(productId, {
		description: req.body.description,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		title: req.body.title,
	});

	res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res) => {
	const productId = req.body.productId;
	Product.delete(productId);
	res.redirect('/admin/products');
};

exports.getProducts = (req, res) => {
	Product.fetchAll(data => {
		res.render('admin/products', {
			pageTitle: 'Admin Products',
			path: '/admin/products',
			prods: data,
		});
	});
};
