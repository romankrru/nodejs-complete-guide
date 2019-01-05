const Product = require('../models/product');

exports.postAddProduct = (req, res) => req.user.createProduct({
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
	title: req.body.title,
})

	.then(() => res.redirect('/'))
	.catch(err => console.error(err));

exports.getAddProduct = (req, res) => res.render('admin/add-product', {
	pageTitle: 'Add product',
	path: '/admin/add-product',
});

exports.getEditProduct = (req, res) => Product.findByPk(req.params.productId)

	.then(product => res.render('admin/edit-product', {
		pageTitle: 'Edit product',
		path: '/admin/products',
		product: product,
	}))

	.catch(err => console.error(err));

exports.postEditProduct = (req, res) => Product.findByPk(req.params.productId)

	.then(product => {
		product.description = req.body.description;
		product.imageUrl = req.body.imageUrl;
		product.price = req.body.price;
		product.title = req.body.title;

		return product.save();
	})

	.then(() => res.redirect('/admin/products'))
	.catch(err => console.error(err));

exports.postDeleteProduct = (req, res) => Product.findByPk(req.body.productId)
	.then(product =>  product.destroy())
	.then(() => res.redirect('/admin/products'))
	.catch(err => console.error(err));

exports.getProducts = (req, res) => Product.findAll()

	.then(products => res.render('admin/products', {
		pageTitle: 'Admin Products',
		path: '/admin/products',
		prods: products,
	}))

	.catch(err => console.error(err));
