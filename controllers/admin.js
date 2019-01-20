const Product = require('../models/product');

exports.postAddProduct = (req, res) => new Product({
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
	title: req.body.title,
	userId: req.session.user._id,
})

	.save()
	.then(() => res.redirect('/'))
	.catch(err => console.error(err));

exports.getAddProduct = (req, res) => res.render('admin/add-product', {
	isLoggedIn: req.session.isLoggedIn,
	pageTitle: 'Add product',
	path: '/admin/add-product',
});

exports.getEditProduct = (req, res) => Product.findById(req.params.productId)

	.then(product => res.render('admin/edit-product', {
		isLoggedIn: req.session.isLoggedIn,
		pageTitle: 'Edit product',
		path: '/admin/products',
		product: product,
	}))

	.catch(err => console.error(err));

exports.postEditProduct = (req, res) => {
	Product.findById(req.params.productId)

		.then(product => {
			product.description = req.body.description;
			product.imageUrl = req.body.imageUrl;
			product.price = req.body.price;
			product.title = req.body.title;

			return product.save();
		})

		.then(() => res.redirect('/admin/products'))
		.catch(err => console.error(err));
};

exports.postDeleteProduct = (req, res) => Product.findByIdAndRemove(req.body.productId)
	.then(() => res.redirect('/admin/products'))
	.catch(err => console.error(err));

exports.getProducts = (req, res) => Product.find()

	.then(products => res.render('admin/products', {
		isLoggedIn: req.session.isLoggedIn,
		pageTitle: 'Admin Products',
		path: '/admin/products',
		prods: products,
	}))

	.catch(err => console.error(err));
