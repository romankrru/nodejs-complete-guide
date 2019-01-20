const React = require('react');

const DefaultLayout = require('../layouts/default');
const ProductForm = require('./ProductForm');

const EditProduct = props => <DefaultLayout
	isLoggedIn={props.isLoggedIn}
	path={props.path}
	pageTitle={props.pageTitle}
>
	<main>
		<h1>Edit product</h1>
		<hr/>

		<ProductForm
			action={`/admin/edit-product/${props.product._id}`}
			buttonTitle="Update product"
			data={props.product}
		/>
	</main>
</DefaultLayout>;

module.exports = EditProduct;
