const Product = require('../models/product');

exports.postAddProduct = (req, res) => new Product({
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
	title: req.body.title,
	// userId: req.user._id,
})
	.save()
	.then(() => res.redirect('/'))
	.catch(err => console.error(err));

exports.getAddProduct = (req, res) => res.render('admin/add-product', {
	pageTitle: 'Add product',
	path: '/admin/add-product',
});

exports.getEditProduct = (req, res) => Product.findById(req.params.productId)

	.then(product => res.render('admin/edit-product', {
		pageTitle: 'Edit product',
		path: '/admin/products',
		product: product,
	}))

	.catch(err => console.error(err));

exports.postEditProduct = (req, res) => new Product({
	_id: req.params.productId,
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
	title: req.body.title,
})

	.save()
	.then(() => res.redirect('/admin/products'))
	.catch(err => console.error(err));

exports.postDeleteProduct = (req, res) => Product.deleteById(req.body.productId)
	.then(() => res.redirect('/admin/products'))
	.catch(err => console.error(err));

exports.getProducts = (req, res) => Product.fetchAll()

	.then(products => res.render('admin/products', {
		pageTitle: 'Admin Products',
		path: '/admin/products',
		prods: products,
	}))

	.catch(err => console.error(err));
