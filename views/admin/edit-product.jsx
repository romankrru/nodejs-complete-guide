const React = require('react');

const DefaultLayout = require('../layouts/default');
const ProductForm = require('./ProductForm');

const EditProduct = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<main>
		<h1>Edit product</h1>
		<hr/>
		<ProductForm
			buttonTitle="Update product"
			data={props.product}
		/>
	</main>
</DefaultLayout>;

module.exports = EditProduct;
