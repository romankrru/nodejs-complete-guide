const React = require('react');

const DefaultLayout = require('../layouts/default');
const ProductForm = require('./ProductForm/index.jsx');

const AddProduct = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<main>
		<h1>Add product</h1>
		<hr/>

		<ProductForm
			errorMessage={props.errorMessage}
			hasError={props.hasError}
			action="/admin/add-product"
			buttonTitle="Add product"
			data={props.product || {}}
		/>
	</main>
</DefaultLayout>;

module.exports = AddProduct;
